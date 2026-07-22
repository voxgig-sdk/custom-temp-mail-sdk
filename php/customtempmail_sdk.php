<?php
declare(strict_types=1);

// CustomTempMail SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class CustomTempMailSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new CustomTempMailUtility();
        $this->_utility = $utility;

        $config = CustomTempMailConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = CustomTempMailHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = CustomTempMailHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, CustomTempMailFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return CustomTempMailUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = CustomTempMailHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = CustomTempMailHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = CustomTempMailHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new CustomTempMailSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = CustomTempMailHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = CustomTempMailHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_custom_domain = null;

    // Canonical facade: $client->CustomDomain()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->custom_domain()
    // resolves here too.
    public function CustomDomain($data = null)
    {
        require_once __DIR__ . '/entity/custom_domain_entity.php';
        if ($data === null) {
            if ($this->_custom_domain === null) {
                $this->_custom_domain = new CustomDomainEntity($this, null);
            }
            return $this->_custom_domain;
        }
        return new CustomDomainEntity($this, $data);
    }


    private $_custom_domain_verify = null;

    // Canonical facade: $client->CustomDomainVerify()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->custom_domain_verify()
    // resolves here too.
    public function CustomDomainVerify($data = null)
    {
        require_once __DIR__ . '/entity/custom_domain_verify_entity.php';
        if ($data === null) {
            if ($this->_custom_domain_verify === null) {
                $this->_custom_domain_verify = new CustomDomainVerifyEntity($this, null);
            }
            return $this->_custom_domain_verify;
        }
        return new CustomDomainVerifyEntity($this, $data);
    }


    private $_domain = null;

    // Canonical facade: $client->Domain()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->domain()
    // resolves here too.
    public function Domain($data = null)
    {
        require_once __DIR__ . '/entity/domain_entity.php';
        if ($data === null) {
            if ($this->_domain === null) {
                $this->_domain = new DomainEntity($this, null);
            }
            return $this->_domain;
        }
        return new DomainEntity($this, $data);
    }


    private $_domains_all = null;

    // Canonical facade: $client->DomainsAll()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->domains_all()
    // resolves here too.
    public function DomainsAll($data = null)
    {
        require_once __DIR__ . '/entity/domains_all_entity.php';
        if ($data === null) {
            if ($this->_domains_all === null) {
                $this->_domains_all = new DomainsAllEntity($this, null);
            }
            return $this->_domains_all;
        }
        return new DomainsAllEntity($this, $data);
    }


    private $_inbox = null;

    // Canonical facade: $client->Inbox()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->inbox()
    // resolves here too.
    public function Inbox($data = null)
    {
        require_once __DIR__ . '/entity/inbox_entity.php';
        if ($data === null) {
            if ($this->_inbox === null) {
                $this->_inbox = new InboxEntity($this, null);
            }
            return $this->_inbox;
        }
        return new InboxEntity($this, $data);
    }


    private $_men = null;

    // Canonical facade: $client->Men()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->men()
    // resolves here too.
    public function Men($data = null)
    {
        require_once __DIR__ . '/entity/men_entity.php';
        if ($data === null) {
            if ($this->_men === null) {
                $this->_men = new MenEntity($this, null);
            }
            return $this->_men;
        }
        return new MenEntity($this, $data);
    }


    private $_message = null;

    // Canonical facade: $client->Message()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->message()
    // resolves here too.
    public function Message($data = null)
    {
        require_once __DIR__ . '/entity/message_entity.php';
        if ($data === null) {
            if ($this->_message === null) {
                $this->_message = new MessageEntity($this, null);
            }
            return $this->_message;
        }
        return new MessageEntity($this, $data);
    }


    private $_otp = null;

    // Canonical facade: $client->Otp()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->otp()
    // resolves here too.
    public function Otp($data = null)
    {
        require_once __DIR__ . '/entity/otp_entity.php';
        if ($data === null) {
            if ($this->_otp === null) {
                $this->_otp = new OtpEntity($this, null);
            }
            return $this->_otp;
        }
        return new OtpEntity($this, $data);
    }


    private $_plan = null;

    // Canonical facade: $client->Plan()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->plan()
    // resolves here too.
    public function Plan($data = null)
    {
        require_once __DIR__ . '/entity/plan_entity.php';
        if ($data === null) {
            if ($this->_plan === null) {
                $this->_plan = new PlanEntity($this, null);
            }
            return $this->_plan;
        }
        return new PlanEntity($this, $data);
    }


    private $_public_v1_dashboard_analytics = null;

    // Canonical facade: $client->PublicV1DashboardAnalytics()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->public_v1_dashboard_analytics()
    // resolves here too.
    public function PublicV1DashboardAnalytics($data = null)
    {
        require_once __DIR__ . '/entity/public_v1_dashboard_analytics_entity.php';
        if ($data === null) {
            if ($this->_public_v1_dashboard_analytics === null) {
                $this->_public_v1_dashboard_analytics = new PublicV1DashboardAnalyticsEntity($this, null);
            }
            return $this->_public_v1_dashboard_analytics;
        }
        return new PublicV1DashboardAnalyticsEntity($this, $data);
    }


    private $_public_v1_inbox = null;

    // Canonical facade: $client->PublicV1Inbox()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->public_v1_inbox()
    // resolves here too.
    public function PublicV1Inbox($data = null)
    {
        require_once __DIR__ . '/entity/public_v1_inbox_entity.php';
        if ($data === null) {
            if ($this->_public_v1_inbox === null) {
                $this->_public_v1_inbox = new PublicV1InboxEntity($this, null);
            }
            return $this->_public_v1_inbox;
        }
        return new PublicV1InboxEntity($this, $data);
    }


    private $_public_v1_message = null;

    // Canonical facade: $client->PublicV1Message()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->public_v1_message()
    // resolves here too.
    public function PublicV1Message($data = null)
    {
        require_once __DIR__ . '/entity/public_v1_message_entity.php';
        if ($data === null) {
            if ($this->_public_v1_message === null) {
                $this->_public_v1_message = new PublicV1MessageEntity($this, null);
            }
            return $this->_public_v1_message;
        }
        return new PublicV1MessageEntity($this, $data);
    }


    private $_public_v1_webhook = null;

    // Canonical facade: $client->PublicV1Webhook()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->public_v1_webhook()
    // resolves here too.
    public function PublicV1Webhook($data = null)
    {
        require_once __DIR__ . '/entity/public_v1_webhook_entity.php';
        if ($data === null) {
            if ($this->_public_v1_webhook === null) {
                $this->_public_v1_webhook = new PublicV1WebhookEntity($this, null);
            }
            return $this->_public_v1_webhook;
        }
        return new PublicV1WebhookEntity($this, $data);
    }


    private $_usage = null;

    // Canonical facade: $client->Usage()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->usage()
    // resolves here too.
    public function Usage($data = null)
    {
        require_once __DIR__ . '/entity/usage_entity.php';
        if ($data === null) {
            if ($this->_usage === null) {
                $this->_usage = new UsageEntity($this, null);
            }
            return $this->_usage;
        }
        return new UsageEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new CustomTempMailSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
