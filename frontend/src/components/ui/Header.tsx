import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import AuthLayout from "./AuthLayout"


const Header = () => {
  const {userData,handleLogout} = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDropDownOpen, setIsDropDownOpen] = useState(true)
  
  const closeModal=() =>{
    setIsModalOpen(false)
  }
  const openModal =()=>{
    setIsModalOpen(true)
  }

  const onLogout=()=>{
    setIsDropDownOpen(false)
    handleLogout()
  }

  return (
    <div className="flex-1 w-screen h-20 bg-brand-primary flex items-center justify-center fixed top-0 left-0 z-100 shadow-md">
      <div className="container relative w-full flex items-center justify-between">
        <div className="flex items-center font-bold text-brand-secondary text-2xl">
          <span className="material-symbols-outlined brand-icon">
            local_activity
          </span>
          MovieMagic
        </div>
        <div className="h-full">
          {userData? <div className="relative h-full"> 
              <span className="material-symbols-outlined acc-icon ">
              account_circle
            </span>
             {isDropDownOpen &&<div className="absolute right-0 mt-4 h-48 w-56 bg-zinc-100 shadow-md shadow-zinc-500 z-50">
                <div onClick={onLogout} className="w-screen lg:w-full h-16 hover:bg-zinc-300 flex items-center gap-1 pl-5">
                  <span className="material-symbols-outlined dropd-icon">
                    logout
                    </span>
                    <p className="text-xl text-zinc-800" >Logout</p>
                </div>
             </div>}
          </div>:
          <button className="font-bold text-neutral-100 text-xl" onClick={openModal}>Sign In</button>
          }
          
        </div>
      </div>
      <AuthLayout
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      />
    </div>
  )
}

export default Header