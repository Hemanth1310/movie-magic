import { useNavigate } from "react-router";
import Banner from "../components/ui/Banner";
import Spinner from "../components/ui/Spinner";
import getImageUrl from "../utils/getImageUrl";
import useMoviesDataProvider from "../utils/moviesDataProvider";

const Home = () => {
  const navigate= useNavigate()
  const {
    allMoviesData,
    feturedMoviesData,
    isLoading,
    isError,
    refetch,
  } = useMoviesDataProvider();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col gap-5 font-mono italic text-gray-500 items-center justify-center text-3xl">
        "Page is loading . please wait"
        <Spinner/>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full h-screen flex flex-col gap-5 font-mono italic text-gray-500 items-center justify-center text-3xl">
        "Failed to load the page"
        <span onMouseDown={() => refetch()}>Refetch</span>
      </div>
    );
  }

  const handleMovieDetails = (id:string)=>{
      navigate(`/movie-details/${id}`)
  }
  return (
    <div className="container flex flex-col items-center justify-between">
      <Banner featuredMoviesData={feturedMoviesData ? feturedMoviesData : []} />
      <div className="flex flex-wrap flex-col items-center justify-between mt-10">
        <h2 className="text-2xl md:text-4xl">Currently screening in cinemas</h2>
        <div className="flex flex-wrap items-center justify-between mt-10">
        {allMoviesData?.map((movie)=>
        <div key={movie.id} className="flex flex-col" onClick={()=>handleMovieDetails(movie.id)}>
          <img className="h-100 w-70" src={getImageUrl(movie.imagePath)}/>
          <h3>{movie.title}</h3>
          <p>{movie.genre}</p>
          <p>{movie.description}</p>
        </div>)}
        </div>

      </div>
    </div>
  );
};

export default Home;
