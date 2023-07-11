'use client'
import Button from "@/components/Button";
import InputForm from "@/components/InputForm";
import Tost from "@/components/Tost";
import { fetchData } from "@/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Register() {
  const [inputs, setInputs]: any = useState([])
  const [error, setError]: any = useState("")
  const [isShownTost, setIsShownTost] = useState(false)
  const { push } = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      return redirect('/movies')
    }
  }, [session])
  const handleChange = (value: string, name: string) => {
    setInputs((values: any) => ({
      ...values,
      [name]: value
    }))
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!inputs.username || !inputs.password || !inputs.confirm_password || !inputs.age || !inputs.name) {
      setError("Data Tidak Boleh Kosong")
      setIsShownTost(true)

      return
    }
    if (inputs.password !== inputs.confirm_password) {
      setError("Password Tidak Sama")
      setIsShownTost(true)

      return
    }
    if (inputs.age && typeof +inputs.age !== 'number') {
      setError("Umur Harus Angka")
      setIsShownTost(true)

      return
    }
    const registered = await fetchData('/auth/register', 'POST', inputs)
    if (registered && registered.status === 200) {
      push('/login')
    }
    if (registered && registered.status === 400) {
      setError(registered.data.message)
      setIsShownTost(true)
    }
  }
  return (
    <>
      { isShownTost && <Tost message={error} onClick={()=>setIsShownTost(false)} type="error" />}
      <div className="flex justify-center items-center md:h-screen mx-auto">
        <div
          className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 min-w-[24rem]">
          <form className="space-y-6 " onSubmit={handleSubmit}>
            <h3 className="text-xl font-medium text-gray-900 ">Register</h3>
            <InputForm name="username" placeholder="plase type your name" text="name" value={inputs.name} onChange={(value: string) => handleChange(value, 'name')}  />
            <InputForm name="username" placeholder="plase type usernmae" text="username" value={inputs.username} onChange={(value: string) => handleChange(value, 'username')}  />
            <InputForm name="age" placeholder="plase type your age" text="age" type="number" value={inputs.age} onChange={(value: string) => handleChange(value, 'age')}  />

            <InputForm name="password" placeholder="please type password" type="password" text="password" value={inputs.password} onChange={(value: string) => handleChange(value, 'password')}  />

            <InputForm name="confirm_password" placeholder="please type password again" type="password" text="confirm password" value={inputs.confirm_password} onChange={(value: string) => handleChange(value, 'confirm_password')}  />
            <div className="flex items-start">

            </div>
           
            <Button text="Register" isLink={false} onClick={() => handleSubmit} className="w-full" />
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Already registered? <Link href="/login" className="text-blue-700 hover:underline dark:text-blue-500">Login</Link>
            </div>
          </form>
        </div>



      </div>
    </>
  )
}