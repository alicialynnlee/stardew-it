/*
  Warnings:

  - You are about to drop the column `taskId` on the `CalendarEvent` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CalendarEvent" DROP CONSTRAINT "CalendarEvent_taskId_fkey";

-- AlterTable
ALTER TABLE "CalendarEvent" DROP COLUMN "taskId";

-- CreateTable
CREATE TABLE "task_calendar_events" (
    "taskId" TEXT NOT NULL,
    "calendarEventId" TEXT NOT NULL,

    CONSTRAINT "task_calendar_events_pkey" PRIMARY KEY ("taskId","calendarEventId")
);

-- AddForeignKey
ALTER TABLE "task_calendar_events" ADD CONSTRAINT "task_calendar_events_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_calendar_events" ADD CONSTRAINT "task_calendar_events_calendarEventId_fkey" FOREIGN KEY ("calendarEventId") REFERENCES "CalendarEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
