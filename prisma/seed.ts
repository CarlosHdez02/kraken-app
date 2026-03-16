import { env } from "@/models/envs/envs.schema";
import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import dayjs from 'dayjs'

const adapter = new PrismaPg({
    connectionString:env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
})

const traineeData:Prisma.TraineeCreateInput[] = [
    {
        firstName:"Carlos",
        lastName:"Hernandez",
        email:"carloshinzunza2@gmail.com",
        age:24,
        phone:"+52 1234567890",
        hasPaid:true,
        lastPaymentAt:dayjs().toISOString(),
        isActive:true,
        createdAt:dayjs().toISOString(),
        updatedAt:dayjs().toISOString(),
    }
]

export async function main(){
    for(const trainee of traineeData){
        await prisma.trainee.create({data:trainee});
    }
}
main()