/*
  Warnings:

  - A unique constraint covering the columns `[friendId,userId]` on the table `Friend` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Friend_friendId_key";

-- AlterTable
ALTER TABLE "Friend" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Friend_friendId_userId_key" ON "Friend"("friendId", "userId");
