'use client'
import Button from "@/components/Button";
import InputForm from "@/components/InputForm";
import { fetchData } from "@/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Register() {
  const [inputs, setInputs]: any = useState([])
  const [errors, setErrors]: any = useState([])
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
      setErrors({ ...errors, messge: "Data Tidak Boleh Kosong" })
      return
    }
    if (inputs.password !== inputs.confirm_password) {
      setErrors({ ...errors, messge: "Password Tidak Sama" })
      return
    }
    if (inputs.age && typeof +inputs.age !== 'number') {
      setErrors({ ...errors, messge: "Umur Harus Angka" })
      return
    }
    const registered = await fetchData('/auth/register', 'POST', inputs)
    if (registered)
      push('/login')
  }
  return (
    <>
      <div className="flex justify-center items-center h-screen mx-auto">
        <div
          className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 min-w-[24rem]">
          <form className="space-y-6 " onSubmit={handleSubmit}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Register</h3>
            <InputForm name="username" placeholder="plase type your name" text="name" value={inputs.name} onChange={(value: string) => handleChange(value, 'name')} errorMessage={errors.username} />
            <InputForm name="username" placeholder="plase type usernmae" text="username" value={inputs.username} onChange={(value: string) => handleChange(value, 'username')} errorMessage={errors.username} />
            <InputForm name="age" placeholder="plase type your age" text="age" type="number" value={inputs.age} onChange={(value: string) => handleChange(value, 'age')} errorMessage={errors.age} />

            <InputForm name="password" placeholder="please type password" type="password" text="password" value={inputs.password} onChange={(value: string) => handleChange(value, 'password')} errorMessage={errors.password} />

            <InputForm name="confirm_password" placeholder="please type password again" type="password" text="confirm password" value={inputs.confirm_password} onChange={(value: string) => handleChange(value, 'confirm_password')} errorMessage={errors.confirm_password} />
            <div className="flex items-start">

            </div>
            {/* <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button> */}
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