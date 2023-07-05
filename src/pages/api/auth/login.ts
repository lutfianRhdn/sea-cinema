import configs from '@/configs';
import user from '@/constants/user';
import prisma from '@/lib/database';
import { response } from '@/utils';
import { compareSync } from 'bcrypt-ts';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { username, password } = req.body;
    const user: any = await prisma.user.findFirst({ where: { username } });
    if (!user) return response(res, 400, 'username / password salah', {});
    if (!compareSync(password, user.password))
      return response(res, 400, 'username / password salah', {});
    user.token = jwt.sign(user, configs.JWT_SECRET);
    return response(res, 200, 'success get data', user);
  } catch (err: any) {
    console.error(err);
    return response(res, 500, 'error', err);
  }
}
