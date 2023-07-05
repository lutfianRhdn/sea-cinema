'use client';
import Button from "@/components/Button";
import InputForm from "@/components/InputForm";
import { fetchData } from "@/utils";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function WithDraw() {
  const [inputs, setInputs]: any = useState<object>({})
  const { data: session } = useSession()

  const handleChange = (value: string | number) => {
    setInputs({
      ...inputs,
      amount: value
    })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const { data: user }: any = session?.user
    const response = await fetchData('/user/withdraw', 'POST', inputs, user.token || '')
  }
  return (
    <>
      <div className="flex  gap-5">
        <form action="" className="flex-1" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col  bg-white">

            <div className="px-7 py-5">
              <InputForm name="amount" onChange={(value) => handleChange(value)} text="Nominal" value={inputs.amount} isRequired={true} type="number" style="light" />
            </div>
            <div className="px-7  py-5">
              <Button text="Top Up" type="submit" />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
