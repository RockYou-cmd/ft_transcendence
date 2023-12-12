/*
  Warnings:

  - Added the required column `blockedId` to the `FriendShip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `FriendShip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FriendShip" ADD COLUMN     "blockedId" TEXT NOT NULL,
ADD COLUMN     "senderId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "FriendShip" ADD CONSTRAINT "FriendShip_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendShip" ADD CONSTRAINT "FriendShip_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
