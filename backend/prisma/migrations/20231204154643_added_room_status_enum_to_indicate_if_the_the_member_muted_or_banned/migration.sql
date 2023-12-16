-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('MUTED', 'BANNED');

-- AlterTable
ALTER TABLE "RoomMembership" ADD COLUMN     "status" "RoomStatus";
