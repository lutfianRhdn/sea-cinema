import prisma from '@/lib/database';
import { response } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { movie_id }: any = req.query;
  const movie_times = await prisma.movie_time.findFirst({
    where: { movie_id },
  });
  return response(res, 200, 'success get data', movie_times);

}
