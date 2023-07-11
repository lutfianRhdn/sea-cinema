'use client';
import Button from "@/components/Button";
import InputForm from "@/components/InputForm";
import Tost from "@/components/Tost";
import { fetchData } from "@/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WithDraw() {
  const [inputs, setInputs]: any = useState<object>({})
  const [isShownTost,setIsShownTost] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  const handleChange = (value: string | number) => {
    setInputs({
      ...inputs,
      amount: value
    })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const { data: user }: any = session?.user
    const response = await fetchData('/user/withdraw', 'POST', inputs, user.token )
    if (response) {
      setIsShownTost(true)
      window.location.reload()

    }
  }
  return (
    <>
      {isShownTost && (<Tost message="Tarik Saldo Berhasil!" onClick={() => setIsShownTost(false)} type="success" />)}
      <h1 className="text-3xl font-bold mb-10">Tarik Saldo</h1>
      <div className="flex  gap-5">
        <form action="" className="flex-1" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col  bg-white">

            <div className="px-7 py-5">
              <InputForm name="amount" onChange={(value) => handleChange(value)} text="Nominal" value={inputs.amount} isRequired={true} type="number" style="light" />
            </div>
            <div className="px-7  py-5">
              <Button text="Tarik Saldo" type="submit" />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
