-- DropForeignKey
ALTER TABLE "FriendShip" DROP CONSTRAINT "FriendShip_blockedId_fkey";

-- AlterTable
ALTER TABLE "FriendShip" ALTER COLUMN "blockedId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "FriendShip" ADD CONSTRAINT "FriendShip_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
