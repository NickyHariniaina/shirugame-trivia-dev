-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "banExpires" TEXT,
ADD COLUMN     "banReason" TEXT,
ADD COLUMN     "banned" BOOLEAN,
ADD COLUMN     "role" TEXT DEFAULT 'user';

-- AlterTable
ALTER TABLE "public"."session" ADD COLUMN     "impersonatedBy" TEXT;
