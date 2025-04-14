/*
  Warnings:

  - You are about to drop the column `dueDate` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bundles" ADD COLUMN     "reward" TEXT;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "dueDate";
