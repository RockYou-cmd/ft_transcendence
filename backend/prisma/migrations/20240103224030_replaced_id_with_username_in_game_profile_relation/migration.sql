-- DropForeignKey
ALTER TABLE "GameProfile" DROP CONSTRAINT "GameProfile_userId_fkey";

-- AddForeignKey
ALTER TABLE "GameProfile" ADD CONSTRAINT "GameProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
