/* eslint-disable @next/next/no-img-element */
import Button from "@/components/Button";
import { fetchData } from "@/utils";
import { redirect } from "next/navigation";

export default async function MoviePage({ params }: any) {
  const { title } = params
  const getData = async () => {
    const movie = await fetchData(`/movies/${title}`, 'GET')
    if (!movie) return redirect('/not-found')
    return movie.data;
  }

  const data = await getData()
  return (
    <>
      <div className="flex justify-center items-center h-screen ">

        <div className="flex md:grid-cols-2 max-h-96  ">
          <div className="max-h-96 md:h-screen">
            <img className="h-full object-top" src={data.poster_url} alt="" />
          </div>
          <div className="flex bg-white  p-10">
            <div className="mb-auto mt-auto max-w-lg">
              <h1 className="text-3xl uppercase">{data.title}</h1>
              <p className="font-semibold mb-5">Rp.{data.ticket_price}</p>
              <p className="font-semibold mb-5">Age Rating: {data.age_rating}</p>
              <p>{data.description}</p>
              {data.movie_times.status === 'playing' && (

                <div className="mt-5">
                  <Button text="Book Now" isLink={true} path={`/orders/${data.title}`} ></Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div >
    </>
  )
}