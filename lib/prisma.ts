import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const connectionString = process.env.DATABASE_URL;
if (!connectionString || !connectionString.startsWith("postgresql://")) {
  throw new Error(
    "DATABASE_URL is missing or invalid. Set it in .env.local to a postgresql:// URL (e.g. postgresql://user:password@localhost:5432/dbname)"
  );
}

const adapter = new PrismaPg({
  connectionString,
  max: 10,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 60000,
  keepAlive: true,
});
const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma; 