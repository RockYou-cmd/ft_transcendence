-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'ACCEPTED', 'BlOCKED');

-- AlterTable
ALTER TABLE "FriendShip" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
