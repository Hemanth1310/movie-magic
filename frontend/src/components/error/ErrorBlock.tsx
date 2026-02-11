import React from 'react'

type Props = {
    errorMessage: string
}

const ErrorBlock = ({errorMessage}: Props) => {
    if(!errorMessage){
        return
    }
  return (
    <div className='w-full text-center text-red-700 text-xl'>{errorMessage}</div>
  )
}

export default ErrorBlock