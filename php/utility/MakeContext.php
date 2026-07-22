<?php
declare(strict_types=1);

// CustomTempMail SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class CustomTempMailMakeContext
{
    public static function call(array $ctxmap, ?CustomTempMailContext $basectx): CustomTempMailContext
    {
        return new CustomTempMailContext($ctxmap, $basectx);
    }
}
