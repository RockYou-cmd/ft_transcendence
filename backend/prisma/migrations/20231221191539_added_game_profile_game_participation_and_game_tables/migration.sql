-- CreateTable
CREATE TABLE "GameProfile" (
    "profileId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gamesPlayed" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 0,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "GameProfile_pkey" PRIMARY KEY ("profileId")
);

-- CreateTable
CREATE TABLE "GameParticipation" (
    "gameId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "GameParticipation_pkey" PRIMARY KEY ("gameId","userId")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameProfile_userId_key" ON "GameProfile"("userId");

-- AddForeignKey
ALTER TABLE "GameProfile" ADD CONSTRAINT "GameProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameParticipation" ADD CONSTRAINT "GameParticipation_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameParticipation" ADD CONSTRAINT "GameParticipation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "GameProfile"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;
