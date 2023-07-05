import prisma from '@/lib/database';
import { response } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id }: any = req.query;
  switch (req.method) {
    case 'POST':
      console.log('ok');
      const movies = await prisma.movie.delete({ where: { id } });
      return response(res, 200, 'success get data', movies);
    default:
      return response(res, 404, 'undifind', {});
  }
}
