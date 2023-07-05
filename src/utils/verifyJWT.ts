import configs from '@/configs';
import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';
export default function verifyJWT(req: NextApiRequest) {
  const authorization: any = req.headers['authorization'] ||'';
  const tokenSplited = authorization.split(' ')[1];
  const userDecoded: any = tokenSplited ? jwt.verify(tokenSplited, configs.JWT_SECRET) : {};
  return userDecoded;
}
