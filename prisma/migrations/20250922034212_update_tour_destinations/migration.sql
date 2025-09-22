-- CreateTable
CREATE TABLE `TourPackage` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `destination` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `category` ENUM('TOKYO', 'OSAKA', 'HOKKAIDO', 'NAGOYA', 'FUKUOKA', 'SENDAI', 'NIKKO', 'HIROSHIMA', 'OKINAWA', 'NARA', 'KOBE', 'KAMIKOCHI', 'HAKUBA', 'SHIRAKAWAGO', 'UNIVERSAL_STUDIOS', 'DISNEYLAND', 'LEGOLAND', 'SKI_RESORT', 'OTHER') NOT NULL DEFAULT 'TOKYO',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TourPackage_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
