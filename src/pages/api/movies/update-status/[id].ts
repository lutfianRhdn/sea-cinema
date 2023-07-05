import prisma from '@/lib/database';
import { response } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { status }: any = req.body;
  const { id } = req.query;

  const updated = await prisma.movie_time.update({
    where: { movie_id: id?.toString() },
    data: { status },
  });
  return response(res, 200, 'status is updated', updated);
}
