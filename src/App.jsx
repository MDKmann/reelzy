import axios from "axios";
import MagnifySVG from "./components/MagnifySVG";
import SlidersSVG from "./components/SlidersSVG";
import { useDebounce } from "./utils/debounceHook";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import topMovies from "./data/topMovies.json";

const App = () => {
  const BASE_API_URL = "https://www.omdbapi.com/?";
  const KEY = "&apikey=fd7c8c4e";

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };

  useEffect(() => {
    const handleSearchRequest = async () => {
      setIsLoading(true);
      let fullSearchResults = {};

      const { data } = await axios.get(
        `${BASE_API_URL}s=${debouncedSearch}${KEY}`,
      );

      let responseDataSearch = [];
      if (!data.Search) {
        responseDataSearch = topMovies;
      } else {
        responseDataSearch = data.Search;
      }
      
      const responseDataIds = responseDataSearch?.map((movie) => movie.imdbID);
      await Promise.allSettled(
        responseDataIds?.map(async (id) => {
          // map over search results imdbIDs
          const responseMapped = await axios.get(
            `https://www.omdbapi.com/?i=${id}&apikey=fd7c8c4e`,
          );
          const responseMappedData = responseMapped.data;
          // Send request for each id
          fullSearchResults[responseMappedData.imdbID] = responseMappedData;
          setSearchResults(Object.values(fullSearchResults));
          console.log(Object.values(fullSearchResults));
        }),
      );
    };
    setIsLoading(false);
    handleSearchRequest();
  }, [debouncedSearch]);

  return (
    <>
      <header className="z-10 flex w-full items-center justify-center">
        <nav className=" glass-effect m-5 flex h-20  w-full rounded-3xl sm:m-10 ">
          <div className="flex w-full items-center justify-between">
            <div className="flex w-full items-center justify-center">LOGO</div>
            <div className="flex w-full items-center justify-around">
              REELZY
            </div>
            <div className="flex w-full items-center justify-center">Login</div>
          </div>
        </nav>
      </header>
      <div className="mt-4 flex items-center justify-center">
        <div className="flex w-full max-w-[600px] rounded-full bg-[#0d1829] px-2">
          <button className="flex cursor-pointer self-center bg-[#0d1829] p-1">
            <SlidersSVG />
          </button>

          <form className="flex grow" onSubmit={handleSubmit}>
            <input
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search by title . . ."
              className="flex grow w-full bg-[#0d1829] bg-transparent pl-2 text-[#cccccc] focus:outline-none z-10 outline-0"
            />
            <button
              type="submit"
              className="relative rounded-full bg-[#0d1829] p-2"
            >
              <MagnifySVG />
            </button>
          </form>
        </div>
      </div>

      {/* <div className=" mt-10 flex flex-wrap h-1/2 w-full justify-center">
      {
        searchResults?.map((movie) => (
          <div
            key={movie.imdbID}
            className=" group relative max-w-xs overflow-hidden rounded-2xl shadow-lg m-4"
          >
            <img
              src={movie.Poster}
              alt="movie-poster"
              className="w-full transition-transform duration-200 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent">
              <div className="p-4 text-white">
                <h3 className="mb-2 text-xl font-bold">{movie.Title}</h3>
                <div className="mt-4 space-x-4">
                  <span>{movie.imdbRating}</span>
                  <span>{movie.Rated}</span>
                  <span>{movie.Runtime}</span>
                </div>
              </div>
            </div>
          </div>
      ))}
      </div> */}

      <div className="container m-auto flex h-dvh w-full max-w-screen-md items-center justify-center">
        <Swiper
          slidesPerView={3}
          effect={"coverflow"}
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
          {searchResults?.map((movie) => (
            <SwiperSlide key={movie.imdbID}>
              <div className="relative">
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent">
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
                  alt="movie-poster"
                  className="w-full transition-transform duration-200 group-hover:scale-110"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <footer className="relative mx-auto mt-20 w-full bg-black text-center text-white xl:mt-32">
        <div className="px-6 py-8 md:py-14 xl:pb-12 xl:pt-20">
          <h2 className="text-3xl font-bold leading-snug xl:text-4xl">
            Love what you see?
            <br />
            Touch base with me and we would love to see what the future has in
            store.
          </h2>
          <a
            className="focus:ring-offset-sky-999 mt-8 inline-block rounded-full border border-transparent bg-blue-800 px-12 py-5 text-lg font-medium leading-tight shadow-xl hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 xl:mt-12"
            href="#"
          >
            Contact
          </a>
          <div className="mt-14 xl:mt-20">
            <nav className="flex flex-wrap justify-center text-lg font-medium">
              <div className="px-5 py-2">
                <a href="#">Contact</a>
              </div>
              <div className="px-5 py-2">
                <a href="#">Pricing</a>
              </div>
              <div className="px-5 py-2">
                <a href="#">Privacy</a>
              </div>
              <div className="px-5 py-2">
                <a href="#">Terms</a>
              </div>
              <div className="px-5 py-2">
                <a href="#">Twitter</a>
              </div>
            </nav>
            <p className="mt-7 text-base">© 2023 XYZ, LLC</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
