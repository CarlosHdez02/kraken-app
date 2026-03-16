/*
  Warnings:

  - Changed the type of `rank` on the `Coach` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `planType` to the `Trainee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `Trainee` table without a default value. This is not possible if the table is not empty.
  - Made the column `lastPaymentAt` on table `Trainee` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "TraineePlanType" AS ENUM ('SINGLE_VISIT', 'TWICE_PER_WEEK', 'THREE_PER_WEEK', 'UNLIMITED');

-- CreateEnum
CREATE TYPE "Rank" AS ENUM ('blueBelt', 'purpleBelt', 'BrownBelt', 'BlackBelt');

-- AlterTable
ALTER TABLE "Coach" DROP COLUMN "rank",
ADD COLUMN     "rank" "Rank" NOT NULL;

-- AlterTable
ALTER TABLE "Trainee" ADD COLUMN     "planType" "TraineePlanType" NOT NULL,
ADD COLUMN     "rank" "Rank" NOT NULL,
ALTER COLUMN "lastPaymentAt" SET NOT NULL;

-- DropEnum
DROP TYPE "CoachRank";
