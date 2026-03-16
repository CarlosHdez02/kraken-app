-- CreateEnum
CREATE TYPE "TraineePlanType" AS ENUM ('SINGLE_VISIT', 'TWICE_PER_WEEK', 'THREE_PER_WEEK', 'UNLIMITED');

-- CreateEnum
CREATE TYPE "Rank" AS ENUM ('whiteBelt', 'blueBelt', 'purpleBelt', 'brownBelt', 'blackBelt');

-- CreateTable
CREATE TABLE "Trainee" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(30) NOT NULL,
    "lastName" VARCHAR(30) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "age" INTEGER NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "phone" VARCHAR(15) NOT NULL,
    "lastPaymentAt" TIMESTAMP(3),
    "planType" "TraineePlanType" NOT NULL,
    "rank" "Rank" NOT NULL DEFAULT 'whiteBelt',

    CONSTRAINT "Trainee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coach" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(30) NOT NULL,
    "lastName" VARCHAR(30) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "age" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "rank" "Rank" NOT NULL,

    CONSTRAINT "Coach_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trainee_email_key" ON "Trainee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Coach_email_key" ON "Coach"("email");
