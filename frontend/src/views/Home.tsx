import Banner from "../components/ui/Banner"
import useMoviesDataProvider from "../utils/moviesDataProvider"

const Home = () => {
  const { allMoviesData,
        feturedMoviesData,
        moviesList,
        isLoading,
        isError,
        refetch} = useMoviesDataProvider()
  return (
    <div className="container flex flex-col items-center justify-between">
      <Banner featuredMoviesData={feturedMoviesData?feturedMoviesData : []}/>
    </div>
  )
}

export default Home