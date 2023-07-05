import prisma from '@/lib/database';
import { response } from '@/utils';
import verifyJWT from '@/utils/verifyJWT';

import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userDecoded = verifyJWT(req);
  const user = await prisma.user.findFirst({ where: { id: userDecoded.id } });
  return response(res, 200, 'success get data', user);

}
