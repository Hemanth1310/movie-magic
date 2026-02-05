import React from 'react'
import type { ScreeningDetail } from '../../types'

type Props = {
    item: ScreeningDetail
}

const ScreeningDetails = ({item}: Props) => {


  return (
   <div className='w-full p-5 border-2 border-gray-100 ' key={item.id}>
          <h3 className='text-2xl' >{item.screen.theater.name}</h3>
          <p>{item.screen.theater.location}</p>
          <p> {item.screen.name}</p>
          <p>{new Date(item.startTime).toLocaleDateString()}</p>
          {new Date(item.startTime).getHours().toString().padStart(2,'0')}: {new Date(item.startTime).getMinutes()}
        </div>
  )
}

export default ScreeningDetails