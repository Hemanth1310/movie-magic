import React from 'react'
import { useParams } from 'react-router'
import { useScreeningDetails } from '../utils/hooks/dataQueryHooks'
import ErrorFallback from '../components/error/ErrorFallback'
import Spinner from '../components/ui/Spinner'
import getImageUrl from '../utils/getImageUrl'
import ScreeningDetails from '../components/ui/ScreeningDetails'

const MovieDetails = () => {
  const {movieId} = useParams()
  const {data:screeningDetails, isError, isLoading, refetch} = useScreeningDetails(movieId!)

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col font-mono italic text-gray-500 items-center justify-center text-3xl">
        "Page is loading . please wait"
        <Spinner/>
        
      </div>
    );
  }

  if (!screeningDetails) {
    return (
      <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">
        Failed to fetch details
      </div>
    );
  }
  if (isError) {
   return (
     <ErrorFallback onRetry={refetch}/>
    );
  }

  return (
    <div className="container flex flex-col items-center justify-between">
      <div className='w-full flex p-10 bg-gray-200 text-2xl font-bold'>
        Movie Details
      </div>
     <div className='w-full flex flex-col items-center md:items-start md:flex-row gap-10 mt-10'>
      <div className=' box-border'>
          <div className='flex flex-col gap-5'>
            <img className="h-120 min-w-80" src={getImageUrl(screeningDetails[0].movie.imagePath)}/>
            <div className=' ml-5'>
              <h1 className='text-2xl'>{screeningDetails[0].movie.title}</h1>
              <p>Genre: {screeningDetails[0].movie.genre}</p>
              <p>Duration: {screeningDetails[0].movie.duration}Mins</p>
            </div>
          </div>
      </div>
      <div className='w-full box-border'>
        <ScreeningDetails screeningDetails={screeningDetails}/>
      </div>
     </div>
    </div>
    
  )
}

export default MovieDetails