import prisma from '@/lib/database';
import { response } from '@/utils';
import verifyJWT from '@/utils/verifyJWT';
import { randomUUID } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { amount } = req.body;
  const JWTUser = await verifyJWT(req);
  if (!JWTUser) return response(res, 401, 'Unauthorized');
  const user = await prisma.user.findUnique({
    where: {
      id: JWTUser.id,
    },
  });
  if (!user) return response(res, 404, 'User not found');
  const userUpdated = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      balance: (user.balance || 0) + +amount,
    },
  });
  await prisma.transaction.create({
    data: {
      user_id: userUpdated.id,
      transaction_code: randomUUID().toString(),
      type: 'topup',
      total_amount: +amount,
    },
  });
  return response(res, 200, 'Topup successfully', userUpdated);
}
