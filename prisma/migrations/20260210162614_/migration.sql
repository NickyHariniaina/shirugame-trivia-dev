-- DropForeignKey
ALTER TABLE "public"."Question" DROP CONSTRAINT "Question_typeId_fkey";

-- AlterTable
ALTER TABLE "public"."Question" ALTER COLUMN "typeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Question" ADD CONSTRAINT "Question_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "public"."Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
