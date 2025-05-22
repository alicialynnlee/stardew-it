/*
  Warnings:

  - You are about to drop the `task_calendar_events` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "task_calendar_events" DROP CONSTRAINT "task_calendar_events_calendarEventId_fkey";

-- DropForeignKey
ALTER TABLE "task_calendar_events" DROP CONSTRAINT "task_calendar_events_taskId_fkey";

-- DropTable
DROP TABLE "task_calendar_events";

-- CreateTable
CREATE TABLE "_TaskCalendarEvents" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TaskCalendarEvents_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TaskCalendarEvents_B_index" ON "_TaskCalendarEvents"("B");

-- AddForeignKey
ALTER TABLE "_TaskCalendarEvents" ADD CONSTRAINT "_TaskCalendarEvents_A_fkey" FOREIGN KEY ("A") REFERENCES "CalendarEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskCalendarEvents" ADD CONSTRAINT "_TaskCalendarEvents_B_fkey" FOREIGN KEY ("B") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
