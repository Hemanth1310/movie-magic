import { useMovies } from "./hooks/dataQueryHooks"


const useMoviesDataProvider = ()=>{
    const {data ,  isLoading, isError , refetch} = useMovies()
    const moviesList  = data?.map(movie=>movie.title)

    const allMoviesData = data
    const feturedMoviesData = data?.filter((movie)=>movie.featured===true)
    
    return {
        allMoviesData,
        feturedMoviesData,
        moviesList,
        isLoading,
        isError,
        refetch
    }

}

export default useMoviesDataProvider