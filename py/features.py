# CustomTempMail SDK feature factory

from feature.base_feature import CustomTempMailBaseFeature
from feature.test_feature import CustomTempMailTestFeature


def _make_feature(name):
    features = {
        "base": lambda: CustomTempMailBaseFeature(),
        "test": lambda: CustomTempMailTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
