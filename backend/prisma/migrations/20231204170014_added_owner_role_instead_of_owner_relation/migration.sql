-- AlterEnum
ALTER TYPE "RoomRole" ADD VALUE 'OWNER';

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_ownerUsername_fkey";
