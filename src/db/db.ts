import { PrismaClient } from '@prisma/client'

// console.log('DATABASE_URL:', env.DATABASE_URL);
console.log('[Db created] process.env.NODE_ENV:', process.env.NODE_ENV)

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: [/*'query',*/ 'info', 'warn', 'error'],
    errorFormat: 'pretty',
  })
}


declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const db = globalThis.prismaGlobal ?? prismaClientSingleton()

export default db

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db;
