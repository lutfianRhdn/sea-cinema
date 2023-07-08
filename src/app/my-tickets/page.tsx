/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Button from "@/components/Button";
import Tost from "@/components/Tost";
import config from "@/configs";
import { fetchData } from "@/utils";
import { useSession } from "next-auth/react";
import { useQRCode } from "next-qrcode";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MyTickets() {
  const [tickets, setTickets] = useState([])
  const { data: session } = useSession()
  const [isRefresh, setIsRefresh] = useState(false)
  const [isShownTost, setIsShownTost] = useState(false)
  const [url , setUrl] = useState('')
  const { Canvas } = useQRCode();
  useEffect(() => {
    if(!!!session)return
    const { data: user }: any = session?.user
    fetchData('/my-tickets', 'GET', {}, user.token).then(res => {
      setTickets(res.data)
    })
    setUrl(config.NEXT_PUBLIC_BASE_URL)

    setIsRefresh(false)
  }, [session,isRefresh])
  const handleRefund = async (id: string) => {
    const { data: user }: any = session?.user
    const response = await fetchData(`/my-tickets/refund/${id}`, "POST", {}, user.token)
    if (response) { 
      setIsRefresh(true)
      setIsShownTost(true)
    }
  }
  return (
    <>
      {isShownTost && (<Tost message="Tiket Berhasil dibatalkan!" onClick={()=>setIsShownTost(false)} type="info" />)}
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">Tiket Saya</h1>
        <div className="flex flex-row gap-5 my-4 flex-wrap ">
          {tickets.map((ticket: any, index: number) => (
            <div key={index} className="">

              <div className="w-full gap-5 rounded-xl shadow-lg">

                {/* body */}
                <div className="min-h-[20rem] px-5 py-3 bg-white w-full rounded-t-2xl ">
                  <div className="flex flex-col  ">
                    <div className="flex flex-row justify-between items-center gap-5">
                      <div className="flex">
                        <h1 className="text-2xl font-semibold">Movie: {ticket.transaction.movie.title}</h1>
                      </div>
                      <p className="text-sm">{new Date(ticket.createdAt).toDateString()}</p>
                    </div>
                    <div className="flex flex-col justify-center  items-center mt-5 ">
                      <Canvas
                        text={`${url}/my-tickets/${ticket.ticket_code }`}
                        options={{
                          level: 'M',
                          margin: 1,
                          scale: 20,
                          width: 200,
                          color: {
                            dark: '#000000',
                            light: '#ffffff',
                          },
                        }}
                      />
                      <p className="font-bold text-lg">Kode Tiket</p>
                      <p className="text-sm">
                        {ticket.ticket_code}
                    </p>
                    </div>

                  </div>
                  <div className="flex flex-col gap-5 my-4 ">
                    <div className="bg-black h-98 w-full" key={ticket.id}>

                    </div>
                  </div>

                </div>
                {/* footer */}
                <div className="h-[10rem] bg-white border-0 border-t-4 px-5 py-2  border-dashed border-gray-500 w-full rounded-b-2xl">
                  <div className="flex justify-between">

                  <div className="flex flex-col items-center">
                    <p className="text-lg font-bold text-gray-500">Seats </p>
                    <h5>{ticket.seats}</h5>
                    </div>

                    <div className="flex flex-col items-center">
                      <p className="text-lg font-bold text-gray-500">Time </p>
                      <h5>{ticket.transaction.time}</h5>
                    </div>
                  </div>
                  <div className="mt-10">
                    <Button text="Batalkan" className="bg-gray-900 w-full" isLink={false} onClick={() => handleRefund(ticket.id)} />
                  </div>
              </div>
            </div>
        </div>

          ))}

        </div>
        </div>
    </>
  )
}