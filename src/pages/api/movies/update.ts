import prisma from '@/lib/database';
import { response } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'PUT':
      const { id }: any = req.query;
      const {
        title,
        description,
        poster_url,
        age_rating,
        release_date,
        ticket_price,
      } = req.body;
      const movie = await prisma.movie.update({
        where: { id },
        data: {
          title,
          description,
          poster_url,
          age_rating: +age_rating,
          release_date,
          ticket_price: +ticket_price,
        },
      });
      return response(res, 200, 'success create new movie', movie);
    default:
  }
}
