/*
  Warnings:

  - You are about to drop the `Username` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Username" DROP CONSTRAINT "Username_id_fkey";

-- DropTable
DROP TABLE "Username";

-- CreateTable
CREATE TABLE "userinfo" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "insta" TEXT,
    "facebook" TEXT,
    "twitter" TEXT,
    "snapchat" TEXT,
    "linkedin" TEXT,
    "personal" TEXT,

    CONSTRAINT "userinfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userinfo_accountId_key" ON "userinfo"("accountId");

-- AddForeignKey
ALTER TABLE "userinfo" ADD CONSTRAINT "userinfo_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
