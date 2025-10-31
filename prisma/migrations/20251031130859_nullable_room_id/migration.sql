-- DropForeignKey
ALTER TABLE "public"."Question" DROP CONSTRAINT "Question_roomId_fkey";

-- AlterTable
ALTER TABLE "public"."Question" ALTER COLUMN "roomId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Question" ADD CONSTRAINT "Question_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
