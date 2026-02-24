-- Drop unused columns from tasks
ALTER TABLE "tasks" DROP COLUMN "type";
ALTER TABLE "tasks" DROP COLUMN "seasons";

-- Rename seasonNote to description (preserves existing data)
ALTER TABLE "tasks" RENAME COLUMN "seasonNote" TO "description";

-- Add date column to farms
ALTER TABLE "farms" ADD COLUMN "date" TEXT;
