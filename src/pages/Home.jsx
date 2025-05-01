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
      <div className="flex h-4/5 flex-col items-center">
        <div className="movie-banner-bg -z-50 "></div>
        <div className="shadow-inner-xl -z-40"></div>
        <Hero />
        <SearchBar />
        <MovieCarousel />
      </div>
    </>
  );
};

export default Home;
