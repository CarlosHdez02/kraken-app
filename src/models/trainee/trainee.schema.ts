import { z } from "zod";
import { paginationSchema } from "../pagination/pagination.schema";

/** Matches Prisma TraineePlanType enum */
export const traineePlanTypeEnum = z.enum([
  "SINGLE_VISIT",
  "TWICE_PER_WEEK",
  "THREE_PER_WEEK",
  "UNLIMITED",
]);

export const traineeSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(1).max(30),
  lastName: z.string().min(1).max(30),
  email: z.string().max(255),
  age: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isActive: z.boolean(),
  phone: z.string().max(15),
  hasPaid: z.boolean(),
  lastPaymentAt: z.date(),
  planType: traineePlanTypeEnum,
});

export const traineeApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(traineeSchema),
  pagination: paginationSchema,
});