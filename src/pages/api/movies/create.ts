import prisma from '@/lib/database';
import { response } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      const {
        title,
        description,
        poster_url,
        age_rating,
        release_date,
        ticket_price,
        movie_time:times,
      } = req.body;
      const movie = await prisma.movie.create({
        data: {
          title,
          description,
          poster_url,
          age_rating: +age_rating,
          release_date,
          ticket_price: +ticket_price,
        },
      });
      await prisma.movie_time.create({
        data: {
          movie_id: movie.id,
          status: 'not_yet',
          unavailable_seats_times: times.split(';').map((time: string) => ({
            time,
            seats: [],
          })),
        },

      });
      return response(res, 200, 'success create new movie', movie);
    default:
      return res.redirect('/notfound');
  }
}
