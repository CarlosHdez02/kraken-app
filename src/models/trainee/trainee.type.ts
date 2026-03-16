import {z} from 'zod';
import { createTraineeSchema, traineeApiResponseSchema, traineeSchema } from './trainee.schema';
export type traineeType = z.infer<typeof traineeSchema>;
export type traineeApiResponseType = z.infer<typeof traineeApiResponseSchema>;
export type createTraineeType = z.infer<typeof createTraineeSchema>;