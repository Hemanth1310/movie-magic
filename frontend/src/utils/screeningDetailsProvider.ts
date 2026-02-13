import type { ScreeningDetail } from "../types";


const screeningDetailsProvider = (screeningDetails:ScreeningDetail[])=>{
    const formattedScreeningDetails: Record<string, ScreeningDetail[]>  ={}

    for(let i=0;i<screeningDetails.length;i++){
        const date = new Date(screeningDetails[i].startTime).toLocaleDateString()
        if(!formattedScreeningDetails[date]){
            formattedScreeningDetails[date]=[]
        }
       formattedScreeningDetails[date].push(screeningDetails[i])
    }

    return formattedScreeningDetails

}

export default screeningDetailsProvider