import { NextApiResponse } from 'next';
/**
 *
 * @param res  NextApiResponse
 * @param status  number
 * @param message   string
 * @param data any
 * @returns   NextApiResponse
 */
export default function response(
  res: NextApiResponse,
  status: number,
  message: string,
  data?: any
) {
  return res.status(status).json({
    status,
    message,
    data,
  });
}
