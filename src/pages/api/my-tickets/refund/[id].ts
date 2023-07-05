import prisma from '@/lib/database';
import { response } from '@/utils';
import verifyJWT from '@/utils/verifyJWT';
import { randomUUID } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id }: any = req.query
  const userJWT = await verifyJWT(req)
  console.log(req.method)
  const ticket = await prisma.ticket.findUnique({ where: { id },include:{transaction:{include:{movie:true}}} })
  if(userJWT.id !==ticket?.transaction.user_id)return response(res,400,'invalid account') 
   await prisma.ticket.delete({ where: { id } })
  const totalAmount = ticket?.transaction.movie?.ticket_price || 0
   await prisma.transaction.create({
    data: {
      total_amount: +totalAmount,
      type: 'refund',
      transaction_code: randomUUID().toString(),
      user_id:userJWT.id
    }
  })
  await prisma.user.update({
    where: { id: userJWT.id },
    data: {
      balance: {increment:+totalAmount}
    }
  })
  return response(res,200,"Success Refund",ticket)
}
