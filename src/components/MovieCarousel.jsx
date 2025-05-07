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
import { faChevronLeft, faChevronRight, faCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { fixTime } from "../utils/fixTime";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";

const MovieCarousel = () => {
  const [img, setImg] = useState();
  const swiperRef = useRef(null);

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
    // <div className="container mx-auto mt-16 flex w-full max-w-screen-xl items-center relative justify-center h-full">
    <div className="container mx-auto mt-16 flex w-full max-w-screen-xl items-center relative justify-center h-full overflow-visible px-8 sm:px-16 ">
      {/* Left Arrow */}
      <button
        className="absolute -left-2 lg:-left-8 top-1/2 z-10 -translate-y-1/2  ml-12 rounded-full hover:scale-105 transition-all hover:transition-all duration-300 hover:duration-300"
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Previous"
      >
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg> */}
        <div className="fa-layers fa-fw text-5xl hidden sm:block">
          <FontAwesomeIcon
            icon={faCircle}
            className="text-white/25 border border-white/50 rounded-full shadow-[0_2px_12px_1px_rgba(255,255,255,0.25)]"
          />
          <FontAwesomeIcon icon={faChevronLeft} inverse transform="shrink-8" />
        </div>
      </button>

      {/* Right Arrow */}
      <button
        className="absolute -right-2 lg:-right-8 top-1/2 z-10 -translate-y-1/2 mr-12 rounded-full hover:scale-105 transition-all hover:transition-all duration-300 hover:duration-300"
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Next"
      >
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg> */}
        <div className="fa-layers fa-fw text-5xl hidden sm:block">
          <FontAwesomeIcon
            icon={faCircle}
            className="text-white/25 border border-white/50 rounded-full shadow-[0_2px_12px_1px_rgba(255,255,255,0.25)]"
          />
          <FontAwesomeIcon icon={faChevronRight} inverse transform="shrink-8" />
        </div>
      </button>

      {/* <Swiper
        cssMode={true}
        slidesPerView={"auto"}
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
      > */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        cssMode={true}
        slidesPerView={1} // base
        spaceBetween={20}
        loop={false} // disables wrapping to ensure clean ends
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        navigation={false}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Keyboard]}
        className="w-full "
      >
        {topMovies?.map((movie) => (
          <SwiperSlide key={movie.imdbID} className="my-10 sm:mx-0">
            {imageLoaded(movie)}
            {img ? (
              <>
                <div className="inline-block h-full w-full scale-[0.9]">
                  <Link to={`/${movie.imdbID}`}>
                    <div
                      style={{
                        backgroundImage: `url(${movie.Poster})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                      }}
                      className="group relative flex items-end hover:scale-105 transition-group transition-transform rounded-2xl aspect-[2/3] h-auto w-full sm:hover:card-hover-shadow sm:border sm:border-[#b1b1b166]"
                    >
                      <div className="absolute  bg-gradient-to-t from-black/60 to-transparent h-full w-full aspect-[2/3] rounded-2xl "></div>
                      {/* <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className=" rounded-2xl object-contain"
                        loading="lazy"
                      /> */}
                      <div className="z-10 transition-secondary sm:translate-y-8 p-4 text-white group-hover:translate-y-0">
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
                  </Link>
                </div>
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
        {/* {topMovies?.map((movie) => (
          <SwiperSlide
            key={movie.imdbID}
            className="my-10 sm:mx-6 px-20 sm:px-0 "
          >
            {imageLoaded(movie)}
            {img ? (
              <>
                <Link to={`/${movie.imdbID}`}>
                  <div className=" sm:hover:card-hover-shadow transition-group group relative rounded-2xl hover:scale-105 m-auto ">
                    <div className="absolute  flex items-end rounded-2xl sm:border sm:border-[#b1b1b166] bg-gradient-to-t from-black/60 to-transparent aspect-[2/3]">
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
        ))} */}
      </Swiper>
    </div>
  );
};

export default MovieCarousel;
