/**
 * Home page component responsible for rendering the home page and it's components
 * - Responsible for 'movieCarousel' state
 * - Passes 'movieCarousel' state to movieCarousel component
 * - responsible for container styles
 */

import Hero from "../components/Hero";
import MovieCarousel from "../components/MovieCarousel";
import { SearchBar } from "../components/SearchBar";


const Home = () => {
  return (
    <>
      <div className="h-screen flex-col items-center justify-center">
        <div className="movie-banner-bg -z-50 "></div>
        <div className="shadow-inner-xl -z-40"></div>
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-full mx-auto">
          <Hero />
          <SearchBar />
        </div>
      </div>
      <MovieCarousel />
    </>
  );
};

export default Home;
