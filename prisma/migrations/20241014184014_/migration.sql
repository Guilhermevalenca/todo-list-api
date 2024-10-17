-- DropForeignKey
ALTER TABLE `Todo` DROP FOREIGN KEY `Todo_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `UsersOnGroups` DROP FOREIGN KEY `UsersOnGroups_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `UsersOnGroups` DROP FOREIGN KEY `UsersOnGroups_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UsersOnTodos` DROP FOREIGN KEY `UsersOnTodos_todoId_fkey`;

-- DropForeignKey
ALTER TABLE `UsersOnTodos` DROP FOREIGN KEY `UsersOnTodos_userId_fkey`;

-- AddForeignKey
ALTER TABLE `UsersOnGroups` ADD CONSTRAINT `UsersOnGroups_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnGroups` ADD CONSTRAINT `UsersOnGroups_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnTodos` ADD CONSTRAINT `UsersOnTodos_todoId_fkey` FOREIGN KEY (`todoId`) REFERENCES `Todo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnTodos` ADD CONSTRAINT `UsersOnTodos_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
