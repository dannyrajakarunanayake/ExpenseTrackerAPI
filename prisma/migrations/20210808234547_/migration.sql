-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191),

    UNIQUE INDEX `User.username_unique`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191),
    `amount` INTEGER,
    `food` VARCHAR(191),
    `rent` VARCHAR(191),
    `childcare` VARCHAR(191),
    `entertainment` VARCHAR(191),
    `bankchargers` VARCHAR(191),
    `mortgage` VARCHAR(191),
    `phone` VARCHAR(191),
    `utility` VARCHAR(191),
    `beauty` VARCHAR(191),
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaction` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
