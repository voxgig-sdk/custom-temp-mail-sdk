<?php
declare(strict_types=1);

// CustomTempMail SDK exists test

require_once __DIR__ . '/../customtempmail_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = CustomTempMailSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
