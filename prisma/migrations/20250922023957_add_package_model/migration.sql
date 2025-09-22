/*
  Warnings:

  - You are about to alter the column `duration` on the `package` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `price` on the `package` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.

*/
-- AlterTable
ALTER TABLE `package` MODIFY `duration` INTEGER NOT NULL,
    MODIFY `price` DOUBLE NOT NULL,
    MODIFY `imageUrl` VARCHAR(191) NULL;
