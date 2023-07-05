import prisma from '@/lib/database';
import { response } from '@/utils';
import verifyJWT from '@/utils/verifyJWT';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await verifyJWT(req);
  if (!user) return response(res, 401, 'Unauthorized');
  const trasactions = await prisma.transaction.findMany({
    where: { user_id: user.id },
    include: {
      movie: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return response(res, 200, 'success get data', trasactions);
}
