import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'
import Modal from './Modal'

type Props = {
  isModalOpen: boolean,
  closeModal: ()=>void
}

const AuthLayout = ({isModalOpen,closeModal}:Props) => {

    const [toggle,setToggle] = useState('login')
    const SelectedComponent = toggle==='login'?Login:Register
    const title = toggle==='login'?'Login':'Register'

    const handleToggle = (moveTo:string)=>{
      setToggle(moveTo)
    }
    
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} title={title}>
        <SelectedComponent handleToggle={handleToggle}/>
    </Modal>
  )
}

export default AuthLayout