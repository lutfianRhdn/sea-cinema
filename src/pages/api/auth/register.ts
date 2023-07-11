import prisma from '@/lib/database';
import { response } from '@/utils';
import { hashSync } from 'bcrypt-ts';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { username, password, confirm_password, age, name } = req.body;
    const passwordHash = hashSync(password, 10);
    if (password !== confirm_password)
      return response(res, 400, 'error', { message: 'password salah' });
    if (!username || !password || !confirm_password || !age || !name)
      return response(res, 400, 'error', {
        message: 'data tidak boleh kosong',
      });
    const user = await prisma.user.findFirst({ where: { username } });
    if (user) return response(res, 400, 'error', { message: 'user sudah ada' });
    if (typeof +age !== 'number')
      return response(res, 400, 'error', { message: 'age harus number' });
    const users = await prisma.user.create({
      data: {
        username,
        password: passwordHash,
        age: +age,
        name,
      },
    });
    if (!users) return response(res, 400, 'error', { message: 'error' });

    return response(res, 200, 'success get data', users);
  } catch (err) {
    console.error(err);
    return response(res, 500, 'error', err);
  }
}
