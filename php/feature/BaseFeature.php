<?php
declare(strict_types=1);

// CustomTempMail SDK base feature

class CustomTempMailBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(CustomTempMailContext $ctx, array $options): void {}
    public function PostConstruct(CustomTempMailContext $ctx): void {}
    public function PostConstructEntity(CustomTempMailContext $ctx): void {}
    public function SetData(CustomTempMailContext $ctx): void {}
    public function GetData(CustomTempMailContext $ctx): void {}
    public function GetMatch(CustomTempMailContext $ctx): void {}
    public function SetMatch(CustomTempMailContext $ctx): void {}
    public function PrePoint(CustomTempMailContext $ctx): void {}
    public function PreSpec(CustomTempMailContext $ctx): void {}
    public function PreRequest(CustomTempMailContext $ctx): void {}
    public function PreResponse(CustomTempMailContext $ctx): void {}
    public function PreResult(CustomTempMailContext $ctx): void {}
    public function PreDone(CustomTempMailContext $ctx): void {}
    public function PreUnexpected(CustomTempMailContext $ctx): void {}
}
