-- DropForeignKey
ALTER TABLE "Username" DROP CONSTRAINT "Username_accountId_fkey";

-- AddForeignKey
ALTER TABLE "Username" ADD CONSTRAINT "Username_id_fkey" FOREIGN KEY ("id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
