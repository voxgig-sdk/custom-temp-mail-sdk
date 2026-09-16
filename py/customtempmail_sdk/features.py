# CustomTempMail SDK feature factory

from customtempmail_sdk.feature.base_feature import CustomTempMailBaseFeature
from customtempmail_sdk.feature.ratelimit_feature import CustomTempMailRatelimitFeature
from customtempmail_sdk.feature.retry_feature import CustomTempMailRetryFeature
from customtempmail_sdk.feature.test_feature import CustomTempMailTestFeature
from customtempmail_sdk.feature.timeout_feature import CustomTempMailTimeoutFeature


_FEATURES = {
    "base": lambda: CustomTempMailBaseFeature(),
    "ratelimit": lambda: CustomTempMailRatelimitFeature(),
    "retry": lambda: CustomTempMailRetryFeature(),
    "test": lambda: CustomTempMailTestFeature(),
    "timeout": lambda: CustomTempMailTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
