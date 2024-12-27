import "../pages/MovieCarousel.css" 
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
} from "swiper/modules";
import {} from "swiper";

const MovieCarousel = () => {
  return (
	<div className="container">
	<h1 className="heading">Flower Gallery</h1>
	<Swiper
	  effect={'coverflow'}
	  grabCursor={true}
	  centeredSlides={true}
	  loop={true}
	  slidesPerView={'auto'}
	  coverflowEffect={{
		rotate: 0,
		stretch: 0,
		depth: 100,
		modifier: 2.5,
	  }}
	  pagination={{ el: '.swiper-pagination', clickable: true }}
	  navigation={{
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
		clickable: true,
	  }}
	  modules={[EffectCoverflow, Pagination, Navigation]}
	  className="swiper_container"
	>
<SwiperSlide>
          <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=450" alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=450" alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.pexels.com/photos/445109/pexels-photo-445109.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=450" alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.pexels.com/photos/8422523/pexels-photo-8422523.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=450" alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.pexels.com/photos/445109/pexels-photo-445109.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=450" alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=450" alt="slide_image" />
        </SwiperSlide>
        
		<div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
};

export default MovieCarousel;
