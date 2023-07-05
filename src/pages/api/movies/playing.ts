import prisma from '@/lib/database';
import { response } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const movies = await prisma.movie.findMany({
    where: {
      movie_times: {
        status: 'playing',
      },
    },
    take: 10,
  });
  return response(res, 200, 'success get movies playing', movies);
  // return response(res, 200, 'Hello World!');
}
