import prisma from '@/lib/database';
import { response } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const users = await prisma.movie_time.findMany();
  return response(res, 200, 'success get data', users);

  // return response(res, 200, 'Hello World!');
}
