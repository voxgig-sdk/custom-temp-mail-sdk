<?php
declare(strict_types=1);

// CustomTempMail SDK utility: prepare_body

class CustomTempMailPrepareBody
{
    public static function call(CustomTempMailContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
