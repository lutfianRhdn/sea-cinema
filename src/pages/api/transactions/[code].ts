import prisma from '@/lib/database';
import { response } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;
  const users = await prisma.transaction.findUnique({
    where: { transaction_code: String(code) },
    include: {
      tickets: true,
    },
  });
  return response(res, 200, 'success get data', users);

  // return response(res, 200, 'Hello World!');
}
