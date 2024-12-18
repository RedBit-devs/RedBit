/*
  Warnings:

  - The primary key for the `Friend_Connect` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `friend_id` on the `Friend_Connect` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Friend_Connect` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user1_id` to the `Friend_Connect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user2_id` to the `Friend_Connect` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Friend_Connect" DROP CONSTRAINT "Friend_Connect_friend_id_fkey";

-- DropForeignKey
ALTER TABLE "Friend_Connect" DROP CONSTRAINT "Friend_Connect_user_id_fkey";

-- AlterTable
ALTER TABLE "Friend_Connect" DROP CONSTRAINT "Friend_Connect_pkey",
DROP COLUMN "friend_id",
DROP COLUMN "user_id",
ADD COLUMN     "user1_id" TEXT NOT NULL,
ADD COLUMN     "user2_id" TEXT NOT NULL,
ADD CONSTRAINT "Friend_Connect_pkey" PRIMARY KEY ("user1_id", "user2_id");

-- CreateTable
CREATE TABLE "Reply" (
    "repply_id" TEXT NOT NULL,
    "message_id" TEXT NOT NULL,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("repply_id","message_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Friend_Connect" ADD CONSTRAINT "Friend_Connect_user1_id_fkey" FOREIGN KEY ("user1_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend_Connect" ADD CONSTRAINT "Friend_Connect_user2_id_fkey" FOREIGN KEY ("user2_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_repply_id_fkey" FOREIGN KEY ("repply_id") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
