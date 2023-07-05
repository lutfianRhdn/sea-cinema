/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Button from "@/components/Button";
import Table from "@/components/Table";
import Tost from "@/components/Tost";
import { fetchData } from "@/utils";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AdminMovies() {
  const [movies, setMovies] = useState([])
  const { data: session } = useSession()
  const [isShownTost, setIsShownTost] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")
  useEffect(() => {
    const { data: user }: any = session?.user
    fetchData('/movies', 'GET', {}, user.token).then((response) => {
      setMovies(response.data)
    })
  }, [])
  useEffect(() => {
    const { data: user }: any = session?.user

    fetchData('/movies', 'GET', {}, user.token).then((response) => {
      setMovies(response.data)
    })
  }, [isShownTost])

  const handleDelete = async (id: string) => {
    const { data: user }: any = session?.user

    const deleted = await fetchData(`/movies/delete/${id}`, 'POST', {}, user.token)
    if (deleted) {
      setIsShownTost(true)
      setMessage('Film Berhasil dihapus')
    }
  }
  const handleChangeStatus = async (id: string, value: string) => {
    const { data: user }: any = session?.user

    const updated = await fetchData(`/movies/update-status/${id}`, 'PUT', { status: value }, user.token)
    if (updated) {
      setIsShownTost(true)
      setMessage('Status Berhasil diupdate')
    }
  }

  return (
    <>
      {isShownTost && <Tost message={message} onClick={() => setIsShownTost(false)} type="success" />}
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl font-bold">Movies</h1>
        <div className="flex justify-start">
          <Button text="Buat Film Baru" isLink={true} path="/admin/movies/create" />
        </div>
        <Table data={[...movies]} service="movies" columns={['title', 'description', 'age_rating', 'release_date', 'ticket_price']} onDelete={(id: any) => handleDelete(id)} onChangeStatus={(id: string, value: string) => handleChangeStatus(id, value)} />
      </div>
    </>
  )
}