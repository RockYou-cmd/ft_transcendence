/*
  Warnings:

  - Made the column `friendId` on table `Friend` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Friend` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Friend" ALTER COLUMN "friendId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;
