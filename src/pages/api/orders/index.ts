import { Transaction } from '@/constants/Transaction';
import prisma from '@/lib/database';
import { response } from '@/utils';
import verifyJWT from '@/utils/verifyJWT';
import { randomUUID } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
    // return getOrders(req, res);
    case 'POST':
      const { movie_id, movie_time_id, seats, time }: Transaction = req.body;
      const movie = await prisma.movie.findFirst({ where: { id: movie_id } });
      const total_amount = seats.length * (movie?.ticket_price || 0);
      const JWTUser = await verifyJWT(req);
      if (!movie) return response(res, 404, 'Movie not found');
      const user = await prisma.user.findUnique({
        where: {
          id: JWTUser.id,
        },
      });
      if (!user) return response(res, 404, 'User not found');
      if (user.balance < total_amount)
        return response(res, 400, 'Saldo tidak cukup');
      const userUpdated = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          balance: user.balance - total_amount,
        },
      });
      const transaction = await prisma.transaction.create({
        data: {
          user_id: userUpdated.id,
          transaction_code: randomUUID().toString(),
          movie_id: movie_id,
          time,
          movie_time_id,
          seats,
          type: 'buy',
          total_amount,
        },
      });
      const tickets = seats.map((seat) => {
        return {
          seats: seat,
          ticket_code: randomUUID().toString(),
          transaction_id: transaction.id,
        };
      });
      await prisma.ticket.createMany({
        data: [...tickets],
      });

      const movieTime = await prisma.movie_time.findFirst({
        where: {
          movie_id,
          id: movie_time_id,
        },
      });
      if (!movieTime) return response(res, 404, 'Movie time not found');
      const unavailable_seats_times = movieTime.unavailable_seats_times;
      const unavailable_seats_times_updated = unavailable_seats_times.map(
        (item) => {
          if (item.time === time) {
            return {
              ...item,
              seats: [...item.seats, ...seats],
            };
          }
          return item;
        }
      );
      await prisma.movie_time.update({
        where: {
          id: movie_time_id,
        },
        data: {
          unavailable_seats_times: unavailable_seats_times_updated,
        },
      });

      response(res, 200, `Berhasil Booking Film `, {});
    default:
  }
}
