/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Button from "@/components/Button";
import InputForm from "@/components/InputForm";
import { fetchData } from "@/utils";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function CreateMovies({ params }: any) {
  const { id } = params
  const [inputs, setInputs]: any = useState({})
  const [movie, setMovie]: any = useState({})
  const [times,setTimes] = useState<string[]>([])
  const { data: session } = useSession()
  const { push } = useRouter()
  const handleChange = (value: string, key: string) => {
    setInputs({ ...inputs, [key]: value })
  }
  useEffect(() => {
    const { data }: any = session?.user
    fetchData(`/movies?id=${id}`, 'GET', {}, data.token).then(res => {
      setMovie(res.data)
      setTimes(res.data.movie_times.unavailable_seats_times.map((item: any) => [item.time]))
      setInputs(res.data)
    })
  }, [session])
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const { data }: any = session?.user

     await fetchData(`movies/update?id=${id}`, 'PUT', inputs, data.token)
    push('/admin/movies')
  }
  return (
    <>
      <div className="bg-white px-10 py-5 rounded-lg shadow-lg">

        <h1 className="text-4xl font-bold">Edit Film Baru</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5 w-full ">
          <InputForm name="title" text="Judul" style="light" onChange={(value: string) => handleChange(value, 'title')} value={inputs.title || movie.title} type="text" placeholder="Judul Film" />
          <InputForm name="age_rating" text="Rating Umur" style="light" onChange={(value: string) => handleChange(value, 'age_rating')} value={inputs.age_rating || movie.age_rating} type="number" placeholder="Rating Umur " />
          <InputForm name="poster_url" text="Link Poster " style="light" onChange={(value: string) => handleChange(value, 'poster_url')} value={inputs.poster_url || movie.poster_url} type="url" placeholder="Link Poster" />
          <InputForm name="realiase_date" text="Tanggal Rilis " style="light" onChange={(value: string) => handleChange(value, 'release_date')} value={inputs.release_date || movie.release_date} type="date" placeholder="Tanggal Rilis" />
          <InputForm name="movie_time" text="Jam Penayangan " style="light" onChange={(value: string) => handleChange(value, 'movie_time')} value={inputs.movie_time || times.join(';')} type="text" placeholder="17.00;18.00" />
          <small>Pisahkan dengan titik koma(;) seperti 17.00;18.00;20.00;</small>
          <InputForm name="title" text="Deskripsi " style="light" onChange={(value: string) => handleChange(value, 'description')} value={inputs.description || movie.description} type="text" placeholder="Deskripsi" />
          <div>
            <Button text="Edit Film" type="submit" className="bg-blue-500" />
          </div>
        </form>
      </div>
    </>
  )
}