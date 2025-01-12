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
import { useSearchState } from "../hooks/useSearchState";
import { useEffect } from "react";

const MovieCarousel = () => {
  const { data } = useSearchState();


useEffect(() => {}, [data])
  
  return (
    <div className="container m-auto mt-16 flex w-full max-w-screen-md items-center justify-center">
      <Swiper
        slidesPerView={4}
        effect={"coverflow"}
        spaceBetween={30}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: true,
        }}
        // lazy={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation, Keyboard]}
        className="swiper-container"
      >
        {data?.map((movie) => (
          <SwiperSlide key={movie.imdbID}>
            <div className="relative">
              <div className="absolute inset-0 flex items-end rounded-2xl border border-[#b1b1b166] bg-gradient-to-t from-black/60 to-transparent">
                <div className="p-4 text-white">
                  <h3 className="mb-2 text-xl font-bold">{movie.Title}</h3>
                  <div className="mt-4 space-x-4">
                    <span>{movie.imdbRating}</span>
                    <span>{movie.Rated}</span>
                    <span>{movie.Runtime}</span>
                  </div>
                </div>
              </div>
              <img
                src={movie.Poster}
                loading="lazy"
                alt="movie-poster"
                className="rounded-2xl object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieCarousel;
