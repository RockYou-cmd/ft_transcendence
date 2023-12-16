-- DropForeignKey
ALTER TABLE "FriendShip" DROP CONSTRAINT "FriendShip_userId_fkey";

-- CreateTable
CREATE TABLE "_FriendShipToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FriendShipToUser_AB_unique" ON "_FriendShipToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FriendShipToUser_B_index" ON "_FriendShipToUser"("B");

-- AddForeignKey
ALTER TABLE "_FriendShipToUser" ADD CONSTRAINT "_FriendShipToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "FriendShip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FriendShipToUser" ADD CONSTRAINT "_FriendShipToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
