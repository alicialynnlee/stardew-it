/*
  Warnings:

  - Added the required column `roomId` to the `bundles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bundles" ADD COLUMN     "roomId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bundles" ADD CONSTRAINT "bundles_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
