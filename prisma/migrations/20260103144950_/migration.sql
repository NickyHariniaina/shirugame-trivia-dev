/*
  Warnings:

  - You are about to drop the column `roomId` on the `Question` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Question" DROP CONSTRAINT "Question_roomId_fkey";

-- AlterTable
ALTER TABLE "public"."Question" DROP COLUMN "roomId";

-- CreateTable
CREATE TABLE "public"."_QuestionToRoom" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_QuestionToRoom_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_QuestionToRoom_B_index" ON "public"."_QuestionToRoom"("B");

-- AddForeignKey
ALTER TABLE "public"."_QuestionToRoom" ADD CONSTRAINT "_QuestionToRoom_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_QuestionToRoom" ADD CONSTRAINT "_QuestionToRoom_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
