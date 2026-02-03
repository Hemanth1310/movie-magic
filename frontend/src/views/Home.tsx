import Banner from "../components/ui/Banner";
import useMoviesDataProvider from "../utils/moviesDataProvider";

const Home = () => {
  const {
    allMoviesData,
    feturedMoviesData,
    moviesList,
    isLoading,
    isError,
    refetch,
  } = useMoviesDataProvider();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col gap-5 font-mono italic text-gray-500 items-center justify-center text-3xl">
        "Page is loading . please wait"
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
  return (
    <div className="container flex flex-col items-center justify-between">
      <Banner featuredMoviesData={feturedMoviesData ? feturedMoviesData : []} />
    </div>
  );
};

export default Home;
