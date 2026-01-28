import React, { useEffect, useState } from "react";
import type { Movies } from "../../types";

type Props = {
  featuredMoviesData: Movies[];
};

const Banner = ({ featuredMoviesData }: Props) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(()=>{
    const intervalID = setInterval(()=>{
        setActiveSlide(prev=>(prev+1)%featuredMoviesData.length)
    },100)
    return clearInterval(intervalID)
  },[featuredMoviesData.length])
  return (
    <div className="w-full relative flex flex-col items-center">
      {featuredMoviesData.map(
        (movie, index) =>
          index === activeSlide && 
          <div className="w-full bg-gray-600 h-50 md:h-100 lg:h-100">{movie.title}</div>,
      )}
        <div className="absolute bottom-0 flex">
            {Array.from(Array(featuredMoviesData.length)).map((_,index)=>(
                <div onClick={()=>setActiveSlide(index)} className="rounded-2xl h-3 w-3 bg-gray-100 m-5">
                    
                </div>))}
        </div>
    </div>
  );
};

export default Banner;
