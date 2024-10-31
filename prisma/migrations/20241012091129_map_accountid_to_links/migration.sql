/*
  Warnings:

  - You are about to drop the column `userInfoId` on the `links` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `links` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "links" DROP CONSTRAINT "links_userInfoId_fkey";

-- AlterTable
ALTER TABLE "links" DROP COLUMN "userInfoId",
ADD COLUMN     "accountId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "userinfo_accountId_idx" ON "userinfo"("accountId");

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "userinfo"("accountId") ON DELETE CASCADE ON UPDATE CASCADE;
