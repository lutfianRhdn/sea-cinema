import prisma from '@/lib/database';
import { response } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      const { id } = req.query;
      let movies;
      if (id !== undefined)
        movies = await prisma.movie.findFirst({
          where: { id: id.toString() },
          include: {movie_times:true},
        });
      else
        movies = await prisma.movie.findMany({
          include: { movie_times: true },
          orderBy: {
            createdAt: 'desc',
          },
        });
      return response(res, 200, 'success get data', movies);
    default:
      return response(res, 405, 'Method not allowed');
  }

}
