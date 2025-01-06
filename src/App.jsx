import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer';
// import { SearchBar } from './components/SearchBar';
import { Nav } from './components/Nav';
import  Home  from './pages/Home';
import axios from "axios";
import { useDebounce } from "./utils/debounceHook";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, HashNavigation, Keyboard, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import topMovies from "./data/topMovies.json";
import Search from './pages/Search';


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
            `${BASE_API_URL}i=${id}${KEY}`,
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
    <Router>
     <Nav     />
     {/* <SearchBar   handleSubmit={handleSubmit} searchValue={searchValue} event={event} setSearchValue={setSearchValue}  /> */}
    <Routes>
    <Route path="/" element={<Home />} ></Route>
    <Route path="/search" element={<Search />} ></Route>

    </Routes>

    <div className="container m-auto flex mt-16 w-full max-w-screen-md items-center justify-center">
        <Swiper
          slidesPerView={4}
          effect={"coverflow"}
          spaceBetween={30}
          loop={true}
          grabCursor={true}
          keyboard={{
            enabled: true,
          }}
          hashNavigation={{
            watchState: true,
          }}
          centeredSlides={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: true,
          }}
          lazy={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation, HashNavigation, Keyboard]}
          className="swiper-container"
        >
          {searchResults?.map((movie) => (
            <SwiperSlide 
            key={movie.imdbID}
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent rounded-2xl border border-[#b1b1b166]">
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
                  className="object-cover rounded-2xl"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
     <Footer     />
    </Router>
  );
};

export default App;

  