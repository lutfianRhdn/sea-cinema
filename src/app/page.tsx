'use client'
import Card from "@/components/Card";
import Slider from "@/components/Slider";
import { fetchData } from "@/utils";
import { Movie } from "@prisma/client";
import { useEffect, useState } from "react";



export default function Home() {
  const [moviesPlaying, setMoviesPlaying] = useState<Movie[]>([])
  const [moviesUpcoming, setMoviesUpcoming] = useState<Movie[]>([])
  useEffect(() => {
    fetchData('/movies/playing', 'GET').then(res => {
      setMoviesPlaying(res.data)
    })
    fetchData('/movies/upcoming', 'GET').then(res => {
      setMoviesUpcoming(res.data)
    })
  }, [])
  
  return (
    <div className=" py-2 flex flex-col gap-10">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold"> Sedang Tayang</h1>
        {moviesPlaying.map((movie: Movie, index: number) => (
          <Card age_rating={movie.age_rating} key={index} description={movie.description} id={movie.id} poster_url={movie.poster_url} release_date={movie.release_date} ticket_price={movie.ticket_price} title={movie.title} />
        ))}

      </div >
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold"> Akan Datang</h1>
        <Slider options={{ dragFree: false }}>
          {moviesUpcoming.map((movie: Movie,index:number) => (

            <Card age_rating={movie.age_rating} key={index} description={movie.description} id={movie.id} poster_url={movie.poster_url} release_date={movie.release_date} ticket_price={movie.ticket_price} title={movie.title} />
          ))}

        </Slider>
      </div >
    </div >

  )
}
