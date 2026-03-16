import {z} from 'zod';
import { orderBy } from './query-params.type';

export const queryParamsSchema = z.object({
    page:z.number().int().positive(),
    limit:z.number().int().positive(),
    orderBy:z.nativeEnum(orderBy),
})