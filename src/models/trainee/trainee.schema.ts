import {z} from 'zod';
import dayjs from 'dayjs';
import { paginationSchema } from '../pagination/pagination.schema';

export const traineeSchema = z.object({
    id: z.string().uuid(),
    firstName:z.string().min(1).max(30),
    lastName:z.string().min(1).max(30),
    email:z.string(),
    age:z.number().int().positive(),
    createdAt: z.string().default(dayjs().toISOString()),
    updatedAt: z.string().default(dayjs().toISOString()),
    isActive: z.boolean().default(true),
    phone: z.string().min(1).max(15).optional(),
    hasPaid: z.boolean().default(false),
    lastPaymentAt: z.string().optional(),
})

export const traineeApiResponseSchema = z.object({
    success:z.boolean(),
    message:z.string(),
    data:traineeSchema,
    pagination:paginationSchema
})