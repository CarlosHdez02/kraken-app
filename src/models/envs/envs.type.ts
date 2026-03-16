import {z} from 'zod';
import { envSchema } from './envs.schema';
export const nodeEnv = {
    development:"development",
    test:"test",
    production:"production"
} as const;

export type nodeEnv = typeof nodeEnv[keyof typeof nodeEnv];
export type envsType = z.infer<typeof envSchema>;