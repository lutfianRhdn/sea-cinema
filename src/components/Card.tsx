/* eslint-disable @next/next/no-img-element */
'use client';
import { Movies } from '@/constants/Movies';
import Button from './Button';

export default function Card({ ...props }: Movies) {

  return (
    <>

      <div className="py-2 sm:max-w-xl sm:mx-auto mb-20 w-full">
        <div className="bg-white shadow-lg border-gray-100 min-w-[31rem] max-w-[35rem] max-h-80	 border sm:rounded-3xl p-8 flex space-x-8">
          <div className="h-28   overflow-visible w-2/6">
            <img className="rounded-3xl shadow-lg" src={props.poster_url} alt="" />
          </div>
          <div className="flex flex-col w-1/2 space-y-4">
            <div className="flex justify-between items-start">
              <h2 className="text-3xl font-bold truncate">{props.title}</h2>
              {/* <div className="bg-yellow-400 font-bold rounded-xl p-2">7.  2</div> */}
            </div>
            <div className='flex items-center'>
              <div className="text-sm text-gray-400">Age Rating</div>
              <div className="text-lg text-gray-800 ml-5">{props.age_rating}</div>
            </div>
            <div className='flex justify-between'>
              <div className="flex text-2xl font-bold text-a">Rp.{props.ticket_price}</div>
              <Button text='Detail' isLink={true} path={`/movies/${props.title}`} className='ml-5' />
            </div>

          </div>

        </div>
      </div>

      {/* </div> */}
    </>
  )
}