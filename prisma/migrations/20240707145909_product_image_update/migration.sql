/*
  Warnings:

  - You are about to drop the column `imagePath` on the `Product` table. All the data in the column will be lost.
  - Added the required column `imageName` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" RENAME COLUMN "imagePath" TO "imageUrl";
ALTER TABLE "Product" ADD COLUMN "imageName" TEXT;

