'use client'
import Card from "@/components/Card";
import { Movies } from "@/constants/Movies";
import { fetchData } from "@/utils";
import { useEffect, useState } from "react";

export default  function Home() {
  const [movies, setMovies] = useState<Movies[]>([])
  useEffect(() => {
    fetchData('/movies', 'GET').then(res => {
      setMovies(res.data)
    })
  }, [])
  return (
    <>
      <div className="flex flex-wrap ">
        {movies.map((movie: Movies, index: number) => (
          <div className="mx-2" key={index + 1}>
            <Card {...movie} />
          </div>
        ))}
      </div>
    </>
  );
}
