/*
  Warnings:

  - You are about to drop the column `links` on the `userinfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "userinfo" DROP COLUMN "links";

-- CreateTable
CREATE TABLE "links" (
    "id" TEXT NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "userInfoId" TEXT NOT NULL,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_userInfoId_fkey" FOREIGN KEY ("userInfoId") REFERENCES "userinfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
