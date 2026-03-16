import {z} from 'zod';
import { nodeEnv } from './envs.type';

export const envSchema = z.object({
   // nodeEnv:z.nativeEnum(nodeEnv),
    DATABASE_URL:z.string().url(),
    nextPublicAppUrl:z.string().url().optional(),
    logLevel:z.string().optional(),
    POSTGRES_USER:z.string(),
    POSTGRES_PASSWORD:z.string(),
    POSTGRES_DB:z.string()
})

function getEnvSchema(){
    const parsedEnv = envSchema.safeParse(process.env);
    if(!parsedEnv.success){
        console.error('Invalid environment variables', parsedEnv.error.flatten().fieldErrors);
        throw new Error("Invalid env variables");
    }
    return parsedEnv.data;
}
export const env = getEnvSchema();