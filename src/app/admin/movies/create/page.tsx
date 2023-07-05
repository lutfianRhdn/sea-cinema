'use client'
import Button from "@/components/Button";
import InputForm from "@/components/InputForm";
import { fetchData } from "@/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateMovies() {
  const [inputs, setInputs]: any = useState({})
  const { data: session } = useSession()
  const { push } = useRouter()
  const handleChange = (value: string, key: string) => {
    setInputs({ ...inputs, [key]: value })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const { data }: any = session?.user

    const movie = await fetchData('/movies/create', 'POST', inputs, data.token)
    if (movie) push('/admin/movie')
  }
  return (
    <>
      <div className="bg-white px-10 py-5 rounded-lg shadow-lg">

        <h1 className="text-4xl font-bold">Buat Film Baru</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5 w-full ">
          <InputForm name="title" text="Judul" style="light" onChange={(value: string) => handleChange(value, 'title')} value={inputs.title} type="text" placeholder="Judul Film" />
          <InputForm name="title" text="Rating Umur" style="light" onChange={(value: string) => handleChange(value, 'age_rating')} value={inputs.age_rating} type="number" placeholder="Rating Umur " />
          <InputForm name="ticket_price" text="Harga Tiket" style="light" onChange={(value: string) => handleChange(value, 'ticket_price')} value={inputs.ticket_price} type="number" placeholder="Harga Tiket" />
          <InputForm name="title" text="Link Poster " style="light" onChange={(value: string) => handleChange(value, 'poster_url')} value={inputs.poster_url} type="url" placeholder="Link Poster" />
          <InputForm name="title" text="Tanggal Rilis " style="light" onChange={(value: string) => handleChange(value, 'release_date')} value={inputs.release_date} type="date" placeholder="Tanggal Rilis" />
          <InputForm name="title" text="Deskripsi " style="light" onChange={(value: string) => handleChange(value, 'description')} value={inputs.description} type="text" placeholder="Deskripsi" />
          <div>
            <Button text="Buat Film" type="submit" className="bg-blue-500" />
          </div>
        </form>
      </div>
    </>
  )
}