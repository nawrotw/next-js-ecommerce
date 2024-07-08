import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";

console.log('[Db connection created] process.env.NODE_ENV:', process.env.NODE_ENV)

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: [/*'query',*/ 'info', 'warn', 'error'],
    errorFormat: 'pretty',
  }).$extends(withAccelerate())
}


declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const db = globalThis.prismaGlobal ?? prismaClientSingleton()

export default db

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db;
