-- AlterTable
ALTER TABLE "users" ADD COLUMN     "temp2fa" TEXT,
ADD COLUMN     "twoFactorAuthenticationSecret" TEXT;
