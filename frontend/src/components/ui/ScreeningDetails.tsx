import React from "react";
import screeningDetailsProvider from "../../utils/screeningDetailsProvider";
import type { ScreeningDetail } from "../../types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type Props = {
  screeningDetails: ScreeningDetail[];
  openModal:()=>void
};

const ScreeningDetails = ({ screeningDetails, openModal }: Props) => {
  const navigate = useNavigate()
  const {userData} = useAuth()
  const formattedScreeningDetails = screeningDetailsProvider(screeningDetails);

  const handleShowtimeSelection =(id:string)=>{
    if(!userData){
      openModal()
    }else{
      navigate(`/showtime/${id}`)
    }
    
  }
  return (
    <div className="w-full">
      {Object.keys(formattedScreeningDetails).map((dateKey) => (
        <div key={dateKey}>
          <h2 className="text-2xl pb-10">{dateKey}</h2>
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-5 pb-10">
            {formattedScreeningDetails[dateKey].map((item) => (
              <div
                className="flex flex-col gap-1 p-5 border-2 border-gray-200"
                key={item.id}
              >
                <h3 className="text-2xl">{item.screen.theater.name}</h3>
                <p>@{item.screen.theater.location}</p>
                <p className="font-bold">{item.screen.name}</p>
                <div className="p-5 border-2 border-gray-300 hover:bg-gray-300" onClick={()=>handleShowtimeSelection(item.id)}>
                  <span>{new Date(item.startTime)
                    .getHours()
                    .toString()
                    .padStart(2, "0")}
                  :{new Date(item.startTime).getMinutes()}
                  </span>-
                  <span>{item.screen.seats.length}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScreeningDetails;
