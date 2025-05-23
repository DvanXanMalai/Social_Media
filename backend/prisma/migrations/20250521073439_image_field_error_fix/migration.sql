/*
  Warnings:

  - You are about to drop the column `imagge` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "imagge",
ADD COLUMN     "image" TEXT;
