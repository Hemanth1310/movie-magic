import React, { useEffect, useRef, useState} from 'react'
import { loginDetailSchema } from '../../utils/TypeChecker'
import api from '../../utils/config/axiosConfig'
import axios from 'axios'
import Spinner from './Spinner'
import ErrorBlock from '../error/ErrorBlock'
import { useAuth } from '../../contexts/AuthContext'


type Props = {
    handleToggle:(moveTo:string)=>void,
    closeModal: ()=>void
}

const Login = ({handleToggle,closeModal}: Props) => {
    const inputRef = useRef<HTMLInputElement|null>(null)
    const [formError,setFormError]  = useState('')
    const [isProgress,setIsProgress] = useState(false)
    const {handleUserData} = useAuth()
    useEffect(()=>{
        inputRef.current?.focus()
    },[])

    const handleLogin = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setIsProgress(true)
        setFormError('')
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
            const {data} =await api.post('/api/auth/login',payload)
            localStorage.setItem("mmtoken", data.token)
            handleUserData(data.payload)
            closeModal()
        }catch(err){
            if(axios.isAxiosError(err)){
                const errorMessage = err.response?.data?.message || "Login failed";
                setFormError(errorMessage)
                console.error(errorMessage);
            }else{
                setFormError('Unexpected Error occured')
            }
        }
        setIsProgress(false)
    }

  return (
    <div className='flex flex-col gap-5'>
        <form className='flex flex-col gap-3 items-center' onSubmit={handleLogin}>
            <input className='p-5 w-full text-xl border border-zinc-400' name='email' ref={inputRef} type='text' placeholder='Enter username'/>
            <input className='p-5 w-full text-xl border border-zinc-400' name='password' type='password' placeholder='Enter password'/>
            <button disabled={isProgress} className='p-5 w-full text-xl bg-brand-primary text-brand-secondary flex items-center justify-center' type='submit'>{isProgress?<div className='w-5 h-5'><Spinner/></div>:'Login'}</button>
        </form>
        <ErrorBlock errorMessage={formError}/>
        <div className='w-full text-center text-lg'>Not Registered ? <span className='text-blue-700 hover:cursor-pointer' onClick={()=>handleToggle('register')}>Register here</span></div>
    </div>
  )
}

export default Login