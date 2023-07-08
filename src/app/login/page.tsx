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
  const [errors, setErrors]: any = useState({ })
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
      setErrors({ ...errors, message: "username dan password tidak boleh kosong" })
      return
    }
      signIn('credentials', {
      username: inputs.username,
      password: inputs.password,
      redirect:false
      }).then(({ok,error}:any) => {
        setErrors({ message: error })
      setIsShownTost(true)
      })

  }
  return (
    <>
      {}
      <div className="flex justify-center items-center md:h-screen mx-auto">
        <div
          className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 min-w-[24rem]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex items-center ">

              <h3 className="text-3xl font-medium text-gray-900 md:text-left text-center w-full "> <span className="font-bold"> Log</span>in</h3>
            </div>
            {isShownTost && <Tost onClick={() => setIsShownTost(!isShownTost)} type="error" message={errors.message} />}
            <InputForm name="username" placeholder="plase type username" text="username" value={inputs.username} onChange={(value: string) => handleChange(value, 'username')} errorMessage={errors.username} />
            <InputForm name="password" placeholder="please type password" type="password" text="password" value={inputs.password} onChange={(value: string) => handleChange(value, 'password')} errorMessage={errors.password} />
            <div className="flex items-start">

            </div>
            <Button text="Login" isLink={false} onClick={() => handleSubmit} type="submit" className="w-full" />
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