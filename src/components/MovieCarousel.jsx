import "../pages/MovieCarousel.css";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Navigation,
  Pagination,
  EffectCoverflow,
} from "swiper/modules";


const MovieCarousel = () => {
  return (
    <div className="container flex justify-center items-center h-dvh w-full m-auto">
      <Swiper
        slidesPerView={3}
        effect={'coverflow'}
        loop={true}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper-container"
      >
        
        <SwiperSlide>
         <div className="relative">
          <div className="absolute bottom-4 left-4">
            <h3>Avengers</h3>
            <div>
              <span>
                7.5*
              </span>
              
              <span>
                2015
              </span>
            </div>
          </div>
         <img
            src="https://m.media-amazon.com/images/M/MV5BNGE0YTVjNzUtNzJjOS00NGNlLTgxMzctZTY4YTE1Y2Y1ZTU4XkEyXkFqcGc@._V1_SX300.jpg"
            alt="slide_image"
          />
         </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://m.media-amazon.com/images/M/MV5BNGE0YTVjNzUtNzJjOS00NGNlLTgxMzctZTY4YTE1Y2Y1ZTU4XkEyXkFqcGc@._V1_SX300.jpg"
            alt="slide_image"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://m.media-amazon.com/images/M/MV5BNGE0YTVjNzUtNzJjOS00NGNlLTgxMzctZTY4YTE1Y2Y1ZTU4XkEyXkFqcGc@._V1_SX300.jpg"
            alt="slide_image"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://m.media-amazon.com/images/M/MV5BNGE0YTVjNzUtNzJjOS00NGNlLTgxMzctZTY4YTE1Y2Y1ZTU4XkEyXkFqcGc@._V1_SX300.jpg"
            alt="slide_image"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://m.media-amazon.com/images/M/MV5BNGE0YTVjNzUtNzJjOS00NGNlLTgxMzctZTY4YTE1Y2Y1ZTU4XkEyXkFqcGc@._V1_SX300.jpg"
            alt="slide_image"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://m.media-amazon.com/images/M/MV5BNGE0YTVjNzUtNzJjOS00NGNlLTgxMzctZTY4YTE1Y2Y1ZTU4XkEyXkFqcGc@._V1_SX300.jpg"
            alt="slide_image"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MovieCarousel;
