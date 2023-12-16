/*
  Warnings:

  - Made the column `status` on table `RoomMembership` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "RoomStatus" ADD VALUE 'ANGEL';

-- AlterTable
ALTER TABLE "RoomMembership" ALTER COLUMN "status" SET NOT NULL;
