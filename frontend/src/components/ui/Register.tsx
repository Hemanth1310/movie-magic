import React, { useRef, useState } from 'react'
import ErrorBlock from '../error/ErrorBlock'
import Spinner from './Spinner'
import { registerSchema } from '../../utils/TypeChecker'
import api from '../../utils/config/axiosConfig'
import axios from 'axios'
import type { UserRegistrationData } from '../../types'

type Props = {
    handleToggle:(moveTo:string)=>void,
    closeModal: ()=>void
}
const baseURL = import.meta.env.VITE_API_URL

const Register = ({handleToggle,closeModal}: Props) => {
    const inputRef = useRef<HTMLInputElement|null>(null)
    const [formError,setFormError]  = useState('')
    const [isProgress,setIsProgress] = useState(false)
    const [isRegisted,setIsRegistered] = useState(false)

    const handleRegister =async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setFormError('')
        setIsProgress(true)
        setIsRegistered(false)
        const formData = new FormData(e.target as HTMLFormElement)
        const payload = Object.fromEntries(formData);
        
        const result = registerSchema.safeParse(payload)

        if(!result.success){
            setFormError(result.error.issues[0].message);
            setIsProgress(false)
            return;
        }
        const userData =  Object.fromEntries(
            Object.entries(result.data).filter(([key]) => key !== "repassword")
        ) as UserRegistrationData;
        
        try{
            const {data} = await api.post(`${baseURL}/api/auth/register`, userData)
            console.log("API Response:", data);
              if (!data.success) {
                    throw new Error(data.message || 'Registration failed')
                    
            }
            setIsRegistered(true)
            setIsProgress(false)
            const timeoutId = setTimeout(() => {
                closeModal()
            }, 3000);
            
            return()=>clearTimeout(timeoutId)
        }catch(err){
           if (axios.isAxiosError(err)) {
                    setFormError(err.response?.data.message || 'Registration failed')
                } else if (err instanceof Error) {
                    setFormError(err.message)
                } else {
                    setFormError('Unexpected error occurred, please try later')
                }
                setIsProgress(false)
        }
        
    }

  return (
   <div className='flex flex-col gap-5 items-center w-full'>
        {!isRegisted?<div className='flex flex-col gap-5 w-full items-center'>
            <form className='flex flex-col gap-3 items-center w-full' onSubmit={handleRegister}>
            <input className='p-5 w-full text-xl border border-zinc-400' name='email' ref={inputRef} type='text' placeholder='Enter email'/>
            <input className='p-5 w-full text-xl border border-zinc-400' name='firstName' type='text' placeholder='Enter firstname'/>
            <input className='p-5 w-full text-xl border border-zinc-400' name='lastName' type='text' placeholder='Enter lastname'/>
            <input className='p-5 w-full text-xl border border-zinc-400' name='password' type='password' placeholder='Enter password'/>
            <input className='p-5 w-full text-xl border border-zinc-400' name='repassword' type='password' placeholder='Re-Enter password'/>
            <button disabled={isProgress} className='p-5 w-full text-xl bg-brand-primary text-brand-secondary flex items-center justify-center' type='submit'>{isProgress?<div className='w-5 h-5'><Spinner/></div>:'Register'}</button>
        </form>
        <ErrorBlock errorMessage={formError}/>
        <div className='w-full text-center text-lg'>Registered ? <span className='text-blue-700 hover:cursor-pointer' onClick={()=>handleToggle('login')}>Login here</span></div>
        </div>:<div className='text-xl'>
            Registration successfull, Please login to continue !!!
        </div>}
    </div>
  )
}

export default Register