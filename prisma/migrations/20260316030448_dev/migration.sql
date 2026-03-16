-- AlterEnum
ALTER TYPE "Rank" ADD VALUE 'whiteBelt';

-- AlterTable
ALTER TABLE "Trainee" ALTER COLUMN "rank" SET DEFAULT 'whiteBelt';
