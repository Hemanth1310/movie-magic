import { useQuery } from "@tanstack/react-query"
import api from "../config/axiosConfig"
import type { Movies } from "../../types"

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