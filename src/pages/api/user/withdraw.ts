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
  const user = await prisma.user.findUnique({
    where: {
      id: JWTUser.id,
    },
  });
  if (!user) return response(res, 404, 'User not found');
  if (user.balance < +amount)
    return response(res, 400, 'Balance is not enough');
  const userUpdated = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      balance: user.balance - parseInt(amount),
    },
  });
  await prisma.transaction.create({
    data: {
      user_id: userUpdated.id,
      transaction_code: randomUUID().toString(),
      type: 'withdraw',
      total_amount: +amount,
    },
  });
  return response(res, 200, 'Topup successfully', userUpdated);
}
