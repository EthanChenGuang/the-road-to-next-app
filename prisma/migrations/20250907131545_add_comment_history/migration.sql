/*
  Warnings:

  - Added the required column `userId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Ticket" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Comment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" VARCHAR(2048) NOT NULL,
    "ticketId" TEXT NOT NULL,
    "userId" TEXT,
    "isEdited" BOOLEAN NOT NULL DEFAULT false,
    "editCount" INTEGER NOT NULL DEFAULT 0,
    "lastEditAt" TIMESTAMP(3),

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CommentHistory" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "content" VARCHAR(2048) NOT NULL,
    "version" INTEGER NOT NULL,
    "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedBy" TEXT,
    "changeType" TEXT NOT NULL DEFAULT 'UPDATE',

    CONSTRAINT "CommentHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Comment_ticketId_idx" ON "public"."Comment"("ticketId");

-- CreateIndex
CREATE INDEX "Comment_userId_idx" ON "public"."Comment"("userId");

-- CreateIndex
CREATE INDEX "CommentHistory_commentId_idx" ON "public"."CommentHistory"("commentId");

-- CreateIndex
CREATE INDEX "CommentHistory_editedBy_idx" ON "public"."CommentHistory"("editedBy");

-- CreateIndex
CREATE UNIQUE INDEX "CommentHistory_commentId_version_key" ON "public"."CommentHistory"("commentId", "version");

-- CreateIndex
CREATE INDEX "Ticket_userId_idx" ON "public"."Ticket"("userId");

-- AddForeignKey
ALTER TABLE "public"."Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "public"."Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommentHistory" ADD CONSTRAINT "CommentHistory_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "public"."Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommentHistory" ADD CONSTRAINT "CommentHistory_editedBy_fkey" FOREIGN KEY ("editedBy") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
