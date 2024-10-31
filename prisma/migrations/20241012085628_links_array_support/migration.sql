/*
  Warnings:

  - You are about to drop the column `facebook` on the `userinfo` table. All the data in the column will be lost.
  - You are about to drop the column `insta` on the `userinfo` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `userinfo` table. All the data in the column will be lost.
  - You are about to drop the column `personal` on the `userinfo` table. All the data in the column will be lost.
  - You are about to drop the column `snapchat` on the `userinfo` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `userinfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "userinfo" DROP COLUMN "facebook",
DROP COLUMN "insta",
DROP COLUMN "linkedin",
DROP COLUMN "personal",
DROP COLUMN "snapchat",
DROP COLUMN "twitter",
ADD COLUMN     "links" TEXT[] DEFAULT ARRAY[]::TEXT[];
