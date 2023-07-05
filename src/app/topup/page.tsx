'use client';
import Button from "@/components/Button";
import InputForm from "@/components/InputForm";
import Tost from "@/components/Tost";
import { fetchData } from "@/utils";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function TopUp() {
  const [inputs, setInputs]: any = useState<object>({})
  const { data: session } = useSession()
  const [isShownTost,setIsShownTost] = useState(false)
  const handleChange = (value: string | number) => {
    setInputs({
      ...inputs,
      amount: value
    })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const { data }: any = session?.user
    const response = await fetchData('/user/topup', 'POST', inputs, data.token || '')
    if(response) setIsShownTost(true)
  }
  return (
    <>
      {isShownTost && (<Tost message="Pengisian Saldo Berhasil" onClick={() => setIsShownTost(false)} type="success" />)}
      <h1 className="text-3xl font-bold mb-10">Pengisian Saldo</h1>
      <div className="flex  gap-5">
        <form action="" className="flex-1" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col  bg-white">

            <div className="px-7 py-5">
              <InputForm name="amount" onChange={(value) => handleChange(value)} text="Nominal" value={inputs.amount} isRequired={true} type="number" style="light" />
            </div>
            <div className="px-7  py-5">
              <Button text="Isi Saldo" type="submit" />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
