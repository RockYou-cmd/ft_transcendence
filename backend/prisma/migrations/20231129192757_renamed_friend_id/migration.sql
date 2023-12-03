/*
  Warnings:

  - You are about to drop the column `firendId` on the `Friend` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Friend" DROP COLUMN "firendId",
ADD COLUMN     "friendId" TEXT;
