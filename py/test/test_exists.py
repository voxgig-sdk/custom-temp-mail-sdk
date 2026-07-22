# ProjectName SDK exists test

import pytest
from customtempmail_sdk import CustomTempMailSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = CustomTempMailSDK.test(None, None)
        assert testsdk is not None
