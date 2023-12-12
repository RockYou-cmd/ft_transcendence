/*
  Warnings:

  - You are about to drop the `Friend` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FriendsToUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FriendsToUsers" DROP CONSTRAINT "_FriendsToUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_FriendsToUsers" DROP CONSTRAINT "_FriendsToUsers_B_fkey";

-- DropTable
DROP TABLE "Friend";

-- DropTable
DROP TABLE "_FriendsToUsers";

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "FriendShip" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FriendShip_pkey" PRIMARY KEY ("id")
);
