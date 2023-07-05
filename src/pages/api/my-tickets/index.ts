import prisma from '@/lib/database';
import { response } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import verifyJWT from '@/utils/verifyJWT';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await verifyJWT(req);
  const tickets = await prisma.ticket.findMany({
    where: { transaction: { user_id: user.id }  },
    include: {
      transaction: {
        include: {
          movie: true,
        }
      }
    },
  });
  console.log(tickets)
  return response(res, 200, 'Hello World!', tickets);
}
