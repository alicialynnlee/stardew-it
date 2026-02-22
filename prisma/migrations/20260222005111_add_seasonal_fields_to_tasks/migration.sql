-- AlterTable
ALTER TABLE "tasks" ADD COLUMN "seasons" TEXT NOT NULL DEFAULT 'year-round';
ALTER TABLE "tasks" ADD COLUMN "seasonNote" TEXT;
