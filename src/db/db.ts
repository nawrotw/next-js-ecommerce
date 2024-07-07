import { PrismaClient } from '@prisma/client'
import { env } from "@/env";

console.log('DATABASE_URL:', env.DATABASE_URL);
console.log('process.env.NODE_ENV:', process.env.NODE_ENV)

const prismaClientSingleton = () => {
  return new PrismaClient({
    // datasourceUrl: "postgresql://postgres:PQHQMpytcrJetkcdhWiMJKFbAMqYxIBc@monorail.proxy.rlwy.net:23246/railway",
    log: ['query', 'info', 'warn', 'error'],
    errorFormat: 'pretty',
  })
}


declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const db = globalThis.prismaGlobal ?? prismaClientSingleton()

// db.$on<any>('query', (e) => {
//   console.log('Prisma onQuery:', e)
// })
export default db

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db;
