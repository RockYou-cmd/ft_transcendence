/*
  Warnings:

  - The primary key for the `Friend` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `friendId` on the `Friend` table. All the data in the column will be lost.
  - Changed the type of `A` on the `_FriendsToUsers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_FriendsToUsers" DROP CONSTRAINT "_FriendsToUsers_A_fkey";

-- AlterTable
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_pkey",
DROP COLUMN "friendId",
ADD COLUMN     "firendId" TEXT,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Friend_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_FriendsToUsers" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "_FriendsToUsers_AB_unique" ON "_FriendsToUsers"("A", "B");

-- AddForeignKey
ALTER TABLE "_FriendsToUsers" ADD CONSTRAINT "_FriendsToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Friend"("id") ON DELETE CASCADE ON UPDATE CASCADE;
