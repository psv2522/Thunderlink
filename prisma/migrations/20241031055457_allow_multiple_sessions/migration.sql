-- DropIndex
DROP INDEX "sessions_user_id_key";

-- AlterTable
ALTER TABLE "userinfo" ALTER COLUMN "bio" SET DEFAULT '';
