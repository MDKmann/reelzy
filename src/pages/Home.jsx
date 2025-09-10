/**
 * Home page component responsible for rendering the home page and it's components
 * - Responsible for 'movieCarousel' state
 * - Passes 'movieCarousel' state to movieCarousel component
 * - responsible for container styles
 */

import { HeroParallax } from "@/components/ui/hero-parallax";
import topMovies from "../data/topMovies.json";
import { useMemo } from "react";


const Home = () => {
  // Generate a randomized order each render/mount (stable per mount)
  const randomizedTopMovies = useMemo(() => {
    return [...topMovies]
      .map((m) => ({ m, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map(({ m }) => m);
  }, []);
  return (
    <>
      {/* <div className="flex-col items-center justify-center h-screen">
        <div className="movie-banner-bg -z-50 "></div>
        <div className="shadow-inner-xl -z-40"></div>
        <div className="absolute w-full mx-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <Hero />
          <SearchBar />
        </div>
      </div>
      <MovieCarousel /> */}
      <HeroParallax movies={randomizedTopMovies} />
    </>
  );
};

export default Home;
