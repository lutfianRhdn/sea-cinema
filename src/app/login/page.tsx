'use client'
import Button from "@/components/Button";
import InputForm from "@/components/InputForm";
import Tost from "@/components/Tost";
import Link from "next/link";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
export default function Login() {
  const [inputs, setInputs]: any = useState([])
  const [errors, setErrors]: any = useState({ username: "", password: "" })
  const [isShownTost, setIsShownTost] = useState<boolean>(false)
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
    if (!inputs.username || !inputs.password) {
      setIsShownTost(true)
      setErrors({ ...errors, messge: "username dan password tidak boleh kosong" })
      return
    }
    await signIn('credentials', {
      username: inputs.username,
      password: inputs.password,
      callbackUrl: '/movies'
    })

  }
  return (
    <>
      <div className="flex justify-center items-center h-screen mx-auto">
        <div
          className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 min-w-[24rem]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex items-center ">

              <FontAwesomeIcon icon={faArrowLeft} className="text-gray-100  mr-5" />
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Login</h3>
            </div>
            {isShownTost && <Tost onClick={() => setIsShownTost(!isShownTost)} type="error" message={errors.messge} />}
            <InputForm name="username" placeholder="plase type usernmae" text="username" value={inputs.username} onChange={(value: string) => handleChange(value, 'username')} errorMessage={errors.username} />
            <InputForm name="password" placeholder="please type password" type="password" text="password" value={inputs.password} onChange={(value: string) => handleChange(value, 'password')} errorMessage={errors.password} />
            <div className="flex items-start">

            </div>
            <Button text="Login" isLink={false} onClick={() => handleSubmit} type="submit" className="w-full" />
            {/* <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button> */}
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered? <Link href="/register" className="text-blue-700 hover:underline dark:text-blue-500">Create
                account</Link>
            </div>
          </form>
        </div>



      </div>
    </>
  )
}