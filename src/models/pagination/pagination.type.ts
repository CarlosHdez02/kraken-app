import {z} from 'zod';
import { paginationSchema } from './pagination.schema';

export type paginationType = z.infer<typeof paginationSchema>;