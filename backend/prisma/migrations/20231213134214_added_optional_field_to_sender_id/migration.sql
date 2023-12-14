-- DropForeignKey
ALTER TABLE "FriendShip" DROP CONSTRAINT "FriendShip_senderId_fkey";

-- AlterTable
ALTER TABLE "FriendShip" ALTER COLUMN "senderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "FriendShip" ADD CONSTRAINT "FriendShip_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
