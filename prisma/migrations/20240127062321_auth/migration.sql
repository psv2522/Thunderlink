-- CreateTable
CREATE TABLE "Username" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "insta" TEXT,
    "facebook" TEXT,
    "twitter" TEXT,
    "snapchat" TEXT,
    "linkedin" TEXT,
    "personal" TEXT,

    CONSTRAINT "Username_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Username_accountId_key" ON "Username"("accountId");

-- AddForeignKey
ALTER TABLE "Username" ADD CONSTRAINT "Username_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
