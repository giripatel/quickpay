/*
  Warnings:

  - You are about to drop the column `nubmer` on the `User` table. All the data in the column will be lost.
  - Added the required column `number` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "nubmer",
ADD COLUMN     "number" TEXT NOT NULL;
