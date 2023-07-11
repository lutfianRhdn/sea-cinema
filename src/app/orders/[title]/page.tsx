/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'

import Button from "@/components/Button";
import Tost from "@/components/Tost";
import { Movies } from "@/constants/Movies";
import { Transaction } from "@/constants/Transaction";
import { fetchData } from "@/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Order({ params }: any) {
  const [selectedSeats, setselectedSeats]: any = useState<string[]>([])
  const [selectedTime, setselectedTime]: any = useState<string>("")
  const [isShownTost, setIsShownTost] = useState<boolean>(false)
  const [tostType, setTostType] = useState<'success' | 'error' | 'info' | 'warning'>("info")
  const [tostMessage, setTostMessage] = useState<string>("")
  const [shownTimes, setShownTimes]: any = useState<MovieTimes>()
  const [movies, setMovies]: any = useState<Movies>()
  const { data: session } = useSession()
  const {push, refresh} = useRouter()

  const [unavailable_seats, setUnavailable_seats]: any = useState<string[]>([])
  const { title } = params
  const totalSeats = 64

  useEffect(function () {
    fetchData("/movies", 'GET').then((res) => {
      const titleDecoded = decodeURIComponent(title)
      const movie: Movies = res.data.find((movie: any) => movie.title == titleDecoded)
      setMovies(movie)
      fetchData(`/shown_times/${movie.id}`, 'GET',).then(res => {
        setShownTimes(res.data)
      })
      if (!!session) {

        const { data }: any = session?.user
        if (data.age < movie.age_rating) {
          setIsShownTost(true)
          setTostMessage("Film Ini dibatasi usia")
          setTimeout(() => {
            push('/movies')
          }, 1000)
        }
      }
    });

  }, [session])


  const generateSeats = () => {
    const seat: string[] = []
    for (let i = 0; i < totalSeats; i++) {
      seat.push(`${i + 1}`)
    }
    return seat
  }
  const handlerSeat = async (val: any) => {
    if (selectedSeats.find((item: any) => item === val)) {
      setselectedSeats((values: any) => values.filter((item: any) => item !== val))
      return
    }
    if (selectedSeats.length >= 6) {
      setIsShownTost(true)
      setTostMessage("Maksimal 6 kursi")
      return
    }
    setselectedSeats((values: any) => ([
      ...values,
      val
    ]))

  }
  const seatsIsAvailable = (seat: string) => {
    if (unavailable_seats) {
      return unavailable_seats.find((item: any) => item == seat)
    }
  }
  const handleTime = (time: string) => {
    if (selectedTime === time) {
      setselectedTime("")
      return
    }
    setselectedTime(time)
    setUnavailable_seats(shownTimes.unavailable_seats_times.find((item: any) => item.time === time).seats)
  }
  const handleOrder = async () => {
    if (!selectedTime) {
      setTostMessage('tolong pilih jam tayang');
      setIsShownTost(true)
      return
    }
    if (selectedSeats.length <= 0) {

      setTostMessage('tolong pilih kursi');
      setIsShownTost(true)
      return
    }
    if (selectedSeats.length > 6) {
      setTostMessage('maksimal 6 kursi');
      setIsShownTost(true)
      return
    }

    const data: Transaction = {
      movie_id: movies.id,
      time: selectedTime,
      seats: selectedSeats,
      movie_time_id: shownTimes.id
    }
    const { data: user }: any = session?.user
    fetchData('/orders', 'POST', data, user.token).then(res => {
      setIsShownTost(true)
      setTostType(res.status === 200 ? "success" : "error")
      setTostMessage(res.message)
      if (res.status === 200) {
        window.location.reload()
        push('/my-tickets')
      }
    }).catch(err => {
      setIsShownTost(true)
      setTostType("error")
      setTostMessage(err.message)
    })
  }
  return (
    <>
      {isShownTost && <Tost message={tostMessage} onClick={() => setIsShownTost(!isShownTost)} type={tostType} />}

      <div className="flex flex-col gap-5">

        <div className="flex md:flex-row flex-col w-full  h-full bg-white shadow-lg rounded-lg p-5">
          <img src={movies?.poster_url || ''} alt="" className="h-52" />
          <div className="md:ml-5 flex  flex-1 flex-col justify-between">
            <div>
              <p className="text-black uppercase text-xl font-bold  mt-4">
                {movies?.title}
              </p>
              <p>
                total kursi : {selectedSeats?.length || 0}
              </p>
              <p>
                total harga : Rp.{movies?.ticket_price * (selectedSeats?.length) || 0}
              </p>
            </div>
            <div>
              <p className="font-bold">
                Pilih Jam Tayang
              </p>


              <div className="flex gap-5 flex-wrap">
                {shownTimes?.unavailable_seats_times && shownTimes.unavailable_seats_times.map((times: any, index: number) => (
                  <button className={`${selectedTime == times.time ? "bg-gray-400 " : "bg-gray-200"} px-6 rounded-lg py-1`} key={index} onClick={() => handleTime(times.time)}>
                    <p>{times.time}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="h-full flex items-end">
            <Button text="Pesan" isLink={false} onClick={() => handleOrder()} className="mt-5" />
          </div>
        </div>
        <div className="overflow-x-auto">
        <div className="flex flex-col p-10 h-full bg-gray-800 items-center justify-center gap-14 w-[112rem] ">
          <div className="bg-white h-8 w-3/4 flex items-center justify-center">
            <p className="text-black uppercase text-center  font-bold ">
              Screen
            </p>
          </div>
          <div className="flex flex-row  items-center justify-center gap-2 ">
            <div className="flex flex-row gap-10 flex-wrap items-center justify-center  ">

              {selectedTime && generateSeats().map((seat: string, index: number) => (
                <button type="button" key={index + 1} className={`${selectedSeats.find((item: string) => item === seat) ? 'bg-red-400' : (seatsIsAvailable(seat) ? 'bg-gray-500' : 'bg-white')} w-16 h-16 rounded-lg flex justify-center items-center`} disabled={seatsIsAvailable(seat)} onClick={() => handlerSeat(seat)}>
                  {seat}
                </button>
              ))}
            </div>
          </div>
          </div>
        </div>
        <div>
          <div className="flex justify-center  text-white">
            <div className=" bg-gray-800 flex flex-col px-4 py-2 gap-4">
              <p className="text-center font-bold text-xl">Catatan</p>
              <div className="flex gap-10">

                <div className="flex items-center gap-2">
                  <div className="bg-red-400 w-5 h-5"></div>
                  <p>Selected</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-white w-5 h-5"></div>
                  <p>Available</p>
                </div><div className="flex items-center gap-2">
                  <div className="bg-gray-500 w-5 h-5"></div>
                  <p>not available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}
