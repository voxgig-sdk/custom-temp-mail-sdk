<?php
declare(strict_types=1);

// CustomTempMail SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class CustomTempMailFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new CustomTempMailBaseFeature();
            case "test":
                return new CustomTempMailTestFeature();
            default:
                return new CustomTempMailBaseFeature();
        }
    }
}
