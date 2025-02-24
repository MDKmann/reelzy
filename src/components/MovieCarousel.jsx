import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Keyboard,
  Navigation,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import { useSearchState } from "../hooks/useSearchState";
// import { useEffect } from "react";
import topMovies from "../data/topMovies.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { fixTime } from "../utils/fixTime";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

const MovieCarousel = () => {
  const [img, setImg] = useState();

   const imageLoaded = useCallback((movie) => {
        const image = new Image();
        image.src = movie.Poster;
        image.onload = () => {
         setImg(image);
        };
   },[])

  useEffect(() => {

  },[imageLoaded])


  return (
    <div className="container mx-auto mt-16 flex w-full max-w-screen-lg items-center justify-center h-full">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        grabCursor={true}
        loop={true}
        keyboard={{
          enabled: true,
        }}
        // lazy={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        style={{
          "--swiper-navigation-color": "white",
          "--swiper-navigation-size": "25px",
        }}
        // breakpoints={{
        //   640: {
        //     slidesPerView: 2,
        //     spaceBetween: 20,
        //   },
        //   768: {
        //     slidesPerView: 4,
        //     spaceBetween: 40,
        //   },
        //   1024: {
        //     slidesPerView: 4,
        //     spaceBetween: 40,
        //   },
        // }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Keyboard]}
        className="swiper-container"
      >
        {topMovies?.map((movie) => (
          <SwiperSlide
            key={movie.imdbID}
            className="my-10 sm:mx-6 px-20 sm:px-0"
          >
            {imageLoaded(movie)}
            {img ? (
              <>
                <Link to={`/${movie.imdbID}`}>
                  <div className=" sm:hover:card-hover-shadow transition-group group relative rounded-2xl hover:scale-105 m-auto">
                    <div className="absolute inset-0 flex items-end rounded-2xl sm:border sm:border-[#b1b1b166] bg-gradient-to-t from-black/60 to-transparent">
                      <div className="transition-secondary sm:translate-y-8 p-4 text-white group-hover:translate-y-0">
                        <h3 className="mb-2 sm:text-xl font-bold">
                          {movie.Title}
                        </h3>
                        <div className="mt-4 space-x-4 sm:opacity-0 transition-opacity delay-500 group-hover:opacity-100">
                          <span>
                            <span className="text-yellow-400">
                              <FontAwesomeIcon icon={faStar} />
                            </span>{" "}
                            {movie.imdbRating}/10
                          </span>
                          <span>{movie.Rated}</span>
                          <span>{fixTime(movie.Runtime)}</span>
                        </div>
                      </div>
                    </div>
                    <img
                      src={movie.Poster}
                      loading="lazy"
                      alt="movie-poster"
                      className="movie-card-img rounded-2xl object-cover"
                    />
                  </div>
                </Link>
              </>
            ) : (
              <>
                <div className=" transition-group group relative rounded-2xl hover:scale-105">
                  <div className="absolute inset-0 flex items-end rounded-2xl">
                    <div className="transition-secondary sm:translate-y-8 p-4 text-white group-hover:translate-y-0">
                      <h3 className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></h3>
                      <div className="mt-4 sm:space-x-4 sm:opacity-0 transition-opacity delay-500 group-hover:opacity-100">
                        <div className="flex justify-start">
                          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-16 mr-2"></div>
                          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-16 mr-2"></div>
                          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-16 "></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <img className="movie-card-img bg-gray-500 rounded-2xl object-cover" />
                </div>
              </>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieCarousel;
