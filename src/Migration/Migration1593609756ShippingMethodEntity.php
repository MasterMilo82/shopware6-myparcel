<?php declare(strict_types=1);

namespace Kiener\KienerMyParcel\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1593609756ShippingMethodEntity extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1593609756;
    }

    public function update(Connection $connection): void
    {
        $query = <<<SQL
CREATE TABLE IF NOT EXISTS `kiener_my_parcel_shipping_method` (
    `id` BINARY(16) NOT NULL,
    `carrier_id` INT(11) NOT NULL,
    `carrier_name` VARCHAR(255) NOT NULL,
    `shipping_method_id` BINARY(16) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
SQL;

        $connection->executeUpdate($query);
    }

    public function updateDestructive(Connection $connection): void
    {

    }
}
