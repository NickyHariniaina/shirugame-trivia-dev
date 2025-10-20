-- DropIndex
DROP INDEX "public"."User_rank_key";

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "rank" DROP NOT NULL,
ALTER COLUMN "highestScore" DROP NOT NULL,
ALTER COLUMN "highestScore" SET DEFAULT 0;
