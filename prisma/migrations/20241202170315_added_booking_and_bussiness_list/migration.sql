-- CreateTable
CREATE TABLE `BusinessList` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `contactPerson` VARCHAR(191) NOT NULL,
    `about` VARCHAR(191) NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `BusinessList_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `userEmail` VARCHAR(191) NOT NULL,
    `dateTime` DATETIME(3) NOT NULL,
    `businessListId` INTEGER NOT NULL,
    `bookingStatus` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BusinessList` ADD CONSTRAINT `BusinessList_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_businessListId_fkey` FOREIGN KEY (`businessListId`) REFERENCES `BusinessList`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
