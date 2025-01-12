import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useLocation,
  // useNavigate,
} from "react-router-dom";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MovieCarousel from "./components/MovieCarousel";
// import axios from "axios";
// import { useDebounce } from "./utils/debounceHook";
// import { useContext, useEffect, useState } from "react";
// import topMovies from "./data/topMovies.json";



const App = () => {
  // const BASE_API_URL = "https://www.omdbapi.com/?";
  // const KEY = "&apikey=fd7c8c4e";

  // const [searchValue, setSearchValue] = useState("");
  // const debouncedSearch = useDebounce(searchValue);
  // const [searchResults, setSearchResults] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const { path } = useLocation();
  // const navigate = useNavigate();



  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setSearchValue(event.target.value)
  //   console.log(path);
  //   console.log(event);
  //   navigate("/search");
  // };

  // useEffect(() => {
  //   const handleSearchRequest = async () => {
  //     setIsLoading(true);
  //     let fullSearchResults = {};

  //     const { data } = await axios.get(
  //       `${BASE_API_URL}s=${debouncedSearch}${KEY}`
  //     );

  //     let responseDataSearch = [];
  //     if (!data.Search) {
  //       responseDataSearch = topMovies;
  //     } else {
  //       responseDataSearch = data.Search;
  //     }

  //     const responseDataIds = responseDataSearch?.map((movie) => movie.imdbID);
  //     await Promise.allSettled(
  //       responseDataIds?.map(async (id) => {
  //         // map over search results imdbIDs
  //         const responseMapped = await axios.get(
  //           `${BASE_API_URL}i=${id}${KEY}`
  //         );
  //         const responseMappedData = responseMapped.data;
  //         // Send request for each id
  //         fullSearchResults[responseMappedData.imdbID] = responseMappedData;
  //       })
  //     );
  //     setSearchResults(Object.values(fullSearchResults));
  //     console.log(Object.values(fullSearchResults));
  //   };
  //   setIsLoading(false);
  //   handleSearchRequest();
  // }, [debouncedSearch]);

  return (
    <Router>
      <Nav />
      <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search" element={<Search />}></Route>
      </Routes>
      <MovieCarousel />
      <Footer />
    </Router>
  );
};

export default App;
