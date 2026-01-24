import React, { createContext, useContext, useEffect, useState } from 'react'
import type { UserData } from '../types'
import api from '../utils/config/axiosConfig';
import axios from 'axios';


type AuthContextType = {
  userData: UserData | null,
  handleUserData: (userData:UserData)=>void,
  isAuthLoading:boolean
}

type AuthConextProviderType = {
  children: React.ReactNode;
};

const baseUrl  = import.meta.env.VITE_API_URL

const defaultUser = {
  userData:null,
  handleUserData:()=>{},
  isAuthLoading:false
}

export const AuthContext = createContext<AuthContextType>(defaultUser)


export const AuthContextProvider  = ({children}: AuthConextProviderType) => {

  const [userData,setUserData] = useState<UserData | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true)

  const handleUserData = (data:UserData | null)=>{
       setUserData(data)
  }

  useEffect(()=>{
   const userCheck=async()=>{
     const token = localStorage.getItem('mmtoken')
      if(!token){
        setIsAuthLoading(false)
        return
      }
      try{
        const {data} =await api.get(baseUrl+'/api/auth/userDetails')
        setUserData(data)
        setIsAuthLoading(false)
      }catch(err){
        if(axios.isAxiosError(err)){
          console.log(err.response?.data?.message)
        }else{
          console.log("Unexpected Error: Session verification failed")
        }
        setIsAuthLoading(false)
        localStorage.removeItem("mmtoken")
        handleUserData(null)
      }
   }
   userCheck();
  },[])
  return (
   <AuthContext.Provider value={{userData,isAuthLoading,handleUserData}}>
      {children}
   </AuthContext.Provider>
  )
}

export const useAuth = ()=>{
  return useContext(AuthContext)
}