import {z} from 'zod';

export const paginationSchema = z.object({
    page:z.number().int().positive(),
    totalPages:z.number().int().positive(),
    totalItems:z.number().int().positive(),  
})