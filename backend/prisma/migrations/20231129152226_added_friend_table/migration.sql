/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'ACCEPTED', 'BLOCKED');

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "photo" TEXT,
    "is2faEnabled" BOOLEAN DEFAULT false,
    "twoFactorAuthenticationSecret" TEXT,
    "temp2fa" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friend" (
    "friendId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("friendId")
);

-- CreateTable
CREATE TABLE "_FriendsToUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_FriendsToUsers_AB_unique" ON "_FriendsToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_FriendsToUsers_B_index" ON "_FriendsToUsers"("B");

-- AddForeignKey
ALTER TABLE "_FriendsToUsers" ADD CONSTRAINT "_FriendsToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Friend"("friendId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FriendsToUsers" ADD CONSTRAINT "_FriendsToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
