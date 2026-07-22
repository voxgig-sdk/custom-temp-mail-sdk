<?php
declare(strict_types=1);

// CustomTempMail SDK utility: result_headers

class CustomTempMailResultHeaders
{
    public static function call(CustomTempMailContext $ctx): ?CustomTempMailResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
