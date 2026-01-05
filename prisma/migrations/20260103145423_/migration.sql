/*
  Warnings:

  - You are about to drop the `_QuestionToRoom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_QuestionToRoom" DROP CONSTRAINT "_QuestionToRoom_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_QuestionToRoom" DROP CONSTRAINT "_QuestionToRoom_B_fkey";

-- AlterTable
ALTER TABLE "public"."Question" ADD COLUMN     "roomId" TEXT;

-- DropTable
DROP TABLE "public"."_QuestionToRoom";

-- AddForeignKey
ALTER TABLE "public"."Question" ADD CONSTRAINT "Question_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
