import prisma from '@/lib/database';
import { response } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title }: any = req.query;

  const movies = await prisma.movie.findFirst({
    where: { title: decodeURIComponent(title) },
    include: { movie_times: true },
  });
  return response(res, 200, 'success get data', movies);

}
