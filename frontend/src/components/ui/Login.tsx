import React, { useEffect, useRef, useState} from 'react'
import { loginDetailSchema } from '../../utils/TypeChecker'

type Props = {
    handleToggle:(moveTo:string)=>void
}


const Login = ({handleToggle}: Props) => {
    const inputRef = useRef<HTMLInputElement|null>(null)
    const [formError,setFormError]  = useState('')
    const [isProgress,setIsProgress] = useState(false)
    useEffect(()=>{
        inputRef.current?.focus()
    },[])

    const handleLogin = (e: React.FormEvent<HTMLFormElement>)=>{
        setIsProgress(true)
        const formData = new FormData(e.target as HTMLFormElement);
        const payload = Object.fromEntries(formData);

        const result = loginDetailSchema.safeParse(payload);
        if (!result.success) {
            setFormError(result.error.issues[0].message);
            setIsProgress(false)
            return;
        }

        }

  return (
    <div>
        <form className='flex flex-col gap-3 items-center' onSubmit={handleLogin}>
            <input className='p-5 text-xl border border-zinc-400' name='email' ref={inputRef} type='text' placeholder='Enter username'/>
            <input className='p-5 text-xl border border-zinc-400' name='password' type='password' placeholder='Enter password'/>
            <button disabled={isProgress} className='p-5 text-xl bg-brand-primary text-brand-secondary' type='submit'>Login</button>
        </form>
        {isProgress ? <div>In progress...</div> : <div>Register</div>}
        {formError}
        <div>Not Registered ? <span onClick={()=>handleToggle('register')}>Register here</span></div>
    </div>
  )
}

export default Login