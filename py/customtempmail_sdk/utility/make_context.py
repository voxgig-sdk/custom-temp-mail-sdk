# CustomTempMail SDK utility: make_context

from customtempmail_sdk.core.context import CustomTempMailContext


def make_context_util(ctxmap, basectx):
    return CustomTempMailContext(ctxmap, basectx)
