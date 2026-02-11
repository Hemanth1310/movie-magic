import React, { useEffect, useRef, useState} from 'react'
import { loginDetailSchema } from '../../utils/TypeChecker'
import api from '../../utils/config/axiosConfig'
import axios from 'axios'
import Spinner from './Spinner'
import ErrorBlock from '../error/ErrorBlock'


type Props = {
    handleToggle:(moveTo:string)=>void
}

const baseURL = import.meta.env.VITE_API_URL

const Login = ({handleToggle}: Props) => {
    const inputRef = useRef<HTMLInputElement|null>(null)
    const [formError,setFormError]  = useState('')
    const [isProgress,setIsProgress] = useState(false)
    useEffect(()=>{
        inputRef.current?.focus()
    },[])

    const handleLogin = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setIsProgress(true)
        setTimeout(()=>{
            console.log('timeout')
        },3000)

       
        const formData = new FormData(e.target as HTMLFormElement);
        const payload = Object.fromEntries(formData);
        console.log(payload)

        const result = loginDetailSchema.safeParse(payload);
        if (!result.success) {
            setFormError(result.error.issues[0].message);
            setIsProgress(false)
            return;
        }

        try{
            const {data} =await api.post(`${baseURL}/api/auth/login`,payload)
            console.log(data)
        }catch(err){
            if(axios.isAxiosError(err)){
                const errorMessage = err.response?.data?.message || "Login failed";
                console.error(errorMessage);
            }
        }
        setIsProgress(false)
    }

  return (
    <div className='flex flex-col gap-5'>
        <form className='flex flex-col gap-3 items-center' onSubmit={handleLogin}>
            <input className='p-5 w-full text-xl border border-zinc-400' name='email' ref={inputRef} type='text' placeholder='Enter username'/>
            <input className='p-5 w-full text-xl border border-zinc-400' name='password' type='password' placeholder='Enter password'/>
            <button disabled={isProgress} className='p-5 w-full text-xl bg-brand-primary text-brand-secondary' type='submit'>{isProgress ? <Spinner/>: <div>Login</div>}</button>
        </form>
        <ErrorBlock errorMessage={formError}/>
        <div className='w-full text-center text-lg'>Not Registered ? <span className='text-blue-700 hover:cursor-pointer' onClick={()=>handleToggle('register')}>Register here</span></div>
    </div>
  )
}

export default Login