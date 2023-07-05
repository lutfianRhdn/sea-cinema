import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;
const globalEnv: any = global;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!globalEnv.prisma) {
    globalEnv.prisma = new PrismaClient();
  }
  prisma = globalEnv.prisma;
}

export default prisma;
