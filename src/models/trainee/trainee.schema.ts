import { z } from "zod";
import { paginationSchema } from "../pagination/pagination.schema";
import { Rank, TraineePlanType } from "@/generated/prisma/enums";

/** Matches Prisma TraineePlanType enum */
export const traineePlanTypeEnum = z.nativeEnum(TraineePlanType);
export const rankEnum = z.nativeEnum(Rank);

export const traineeSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(1).max(30),
  lastName: z.string().min(1).max(30),
  email: z.string().max(255),
  age: z.number().int(),
  birthDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isActive: z.boolean(),
  phone: z.string().max(15),
  lastPaymentAt: z.date().nullable(),
  planType: traineePlanTypeEnum,
  rank: rankEnum,
});

export const traineeApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(traineeSchema),
  pagination: paginationSchema,
});

export const createTraineeSchema = z.object({
    firstName:z.string().min(1).max(30),
    lastName:z.string().min(1).max(30),
    email:z.string().max(255),
    age:z.number().int(),
    phone:z.string().max(15),
    planType:traineePlanTypeEnum,
    rank: rankEnum,
    birthDate:z.date(),
});

export const updateTraineeSchema = traineeSchema.partial();
