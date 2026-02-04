import { useQuery } from "@tanstack/react-query"
import api from "../config/axiosConfig"
import type { Movies, ScreeningDetail } from "../../types"

const baseUrl  = import.meta.env.VITE_API_URL

const fetchAllMovies = async():Promise<Movies[]>=>{
    const {data} = await api.get(baseUrl+'/api/publicRoutes/all-movies')
    return data.payload.movies
}

export const useMovies = ()=>{
    return useQuery({
        queryKey:['movies'],
        queryFn:fetchAllMovies,
    })
}

const fetchScreeningDetails =async(id:string):Promise<ScreeningDetail[]>=>{
    const {data} = await api.get(baseUrl+`/api/publicRoutes/screenings/${id}`)
    console.log(data)
    return data.payload.screeningDetails
}

export const useScreeningDetails=(id:string)=>{
    return useQuery({
        queryKey:['screeningDetails',id],
        queryFn:()=>fetchScreeningDetails(id),
        enabled: !!id,
    })
}