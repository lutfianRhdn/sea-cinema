'use client'
import { useSession } from "next-auth/react";
import { useState } from "react";
import Button from "./Button";
import Tost from "./Tost";


export default function Table({ data, columns, service, onDelete, onChangeStatus }: any) {
  const { data: session } = useSession()

  const [isDeleted, setIsDeleted] = useState(false)
  return (
    <>
      {isDeleted && (
        <Tost message="Berhasil Menghapus Film" type="success" onClick={() => setIsDeleted(!isDeleted)} />)}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2  align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200  sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 ">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    {columns.map((column: any, index: number) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {column}
                      </th>
                    ))}
                    <th className="relative px-6 py-3" scope="col">
                      <span className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status Penayangan
                      </span>
                    </th>
                    <th scope="col" className=" px-6 py-3">
                      <span className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">Aksi</span>
                      {/* <span className="sr-only">Edit</span> */}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">

                  {data.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{index + 1}</div>
                      </td>
                      {columns.map((column: any, index: number) => (

                        <td key={index} className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item[column]}</div>
                        </td>
                      ))}
                      <td className="px-6 py-4 whitespace-nowrap text-right flex justify-evenly text-sm font-medium">
                        <div className="flex justify-center">

                          <select name="status" id="" className="py-2 px-4 rounded-lg" onChange={(e: any) => onChangeStatus(item.id, e.target.value)} value={item.movie_times.status} >
                            <option value="not_yet"   >Belum Tayang</option>
                            <option value="playing" >Tayang</option>
                            <option value="finished" >Selesai Tayang</option>
                          </select>
                        </div>
                      </td>
                      <td className="">
                        <div className="flex justify-evenly">
                          <Button text="Edit" isLink={true} path={`/admin/${service}/${item.id}/edit`} className="bg-yellow-400 hover:bg-yellow-600 " />
                          <Button text="Hapus" isLink={false} onClick={() => onDelete(item.id)} className="bg-red-400 hover:bg-red-600" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}