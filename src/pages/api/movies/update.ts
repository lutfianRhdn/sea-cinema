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
        movie_time:times,
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
      const movie_time = await prisma.movie_time.findUnique({ where: { movie_id: id } })
      const timesArray:any =[]
      times.split(';').map(async (time: string) => {
        const timeExist = movie_time?.unavailable_seats_times?.find((t: any) => t.time === time)
        if (!timeExist) {
          timesArray.push({ time, seats: [] })
        }
        timesArray.push(timeExist)
      })
      await prisma.movie_time.update({
        where: { movie_id: id },
        data: {
          unavailable_seats_times: {
            set: timesArray
          }
        },
      });
      return response(res, 200, 'success create new movie', movie);
    default:
  }
}
