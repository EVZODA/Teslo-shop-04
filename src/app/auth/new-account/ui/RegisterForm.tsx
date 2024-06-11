'use client'

import { useState } from "react"
import Link from "next/link"

import clsx from "clsx"
import { useForm } from "react-hook-form"

import { login, registerUser } from "@/actions"


type FormInputs = {
  name: string
  email: string
  password: string
}



export const RegisterForm = () => {

  

  const [errorMessage, setErrorMessage] = useState('')
  const [Message, setMessage] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()


  const onSubmit = async (data: FormInputs) => {
    setErrorMessage('')
    setMessage('')
    const { email, name, password } = data
    const resp = await registerUser(name, email, password)

    if (!resp.ok) {
      setErrorMessage(resp.message)
      return
    }

    setMessage(resp.message)
    await login(email.toLowerCase(), password)
    window.location.replace('/')

    
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

      <label htmlFor="name">Nombre completo</label>
      <input
        className={
          clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
            'border-red-500': errors.name
          })
        }
        type="text"
        autoFocus
        {...register('name', { required: true })}
      />

      <label htmlFor="email">Correo electronico</label>
      <input
        className={
          clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
            'border-red-500': errors.email
          })
        }
        type="email"
        {...register('email', { required: true, pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i })}
      />


      <label htmlFor="password">Contraseña</label>
      <input
        className={
          clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
            'border-red-500': errors.password
          })
        }
        type="password"
        {...register('password', { required: true, minLength: 8 })}
      />

      {
        errorMessage ?
          (<span className="text-red-500">* {errorMessage}</span>) :
          (<span className="text-green-500">{Message}</span>)
      }

      <button

        className="btn-primary">
        Crear una nueva cuenta
      </button>


      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/login"
        className="btn-secondary text-center">
        Ingresar
      </Link>

    </form>
  )
}
