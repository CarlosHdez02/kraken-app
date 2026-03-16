import {z} from 'zod';
import { traineeApiResponseSchema, traineeSchema } from './trainee.schema';
export type traineeType = z.infer<typeof traineeSchema>;
export type traineeApiResponseType = z.infer<typeof traineeApiResponseSchema>;
