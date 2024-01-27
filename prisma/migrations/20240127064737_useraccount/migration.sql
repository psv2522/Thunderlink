-- DropForeignKey
ALTER TABLE "Username" DROP CONSTRAINT "Username_id_fkey";

-- AddForeignKey
ALTER TABLE "Username" ADD CONSTRAINT "Username_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
