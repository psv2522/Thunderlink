-- DropForeignKey
ALTER TABLE "userinfo" DROP CONSTRAINT "userinfo_id_fkey";

-- AddForeignKey
ALTER TABLE "userinfo" ADD CONSTRAINT "userinfo_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
