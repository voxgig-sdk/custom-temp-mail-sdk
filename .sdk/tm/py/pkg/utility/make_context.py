# CustomTempMail SDK utility: make_context

from projectname_sdk.core.context import CustomTempMailContext


def make_context_util(ctxmap, basectx):
    return CustomTempMailContext(ctxmap, basectx)
