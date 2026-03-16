import { queryParamsSchema } from "./query-params.schema";
import { z } from "zod";
export const orderBy = {
    asc:"asc",
    desc:"desc"
} as const;
export type orderBy = (typeof orderBy)[keyof typeof orderBy];
export type queryParamsType = z.infer<typeof queryParamsSchema>;