<?php
declare(strict_types=1);

// CustomTempMail SDK utility: result_body

class CustomTempMailResultBody
{
    public static function call(CustomTempMailContext $ctx): ?CustomTempMailResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
