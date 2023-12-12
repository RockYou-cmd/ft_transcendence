/*
  Warnings:

  - A unique constraint covering the columns `[userId,senderId]` on the table `FriendShip` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FriendShip_userId_senderId_key" ON "FriendShip"("userId", "senderId");
