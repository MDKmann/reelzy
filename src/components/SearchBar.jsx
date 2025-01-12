import { useLocation, useNavigate } from "react-router-dom";

import MagnifySVG from "./MagnifySVG";
import SlidersSVG from "./SlidersSVG";
import useFetchMovies from "../hooks/useFetchMovies";

export function SearchBar() {
  const { searchValue, setSearchValue } = useFetchMovies();
  const { path } = useLocation();
  const navigate = useNavigate();



  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(path)
    console.log(event);
    navigate('/search')
  };



  return (
    <div className="mt-4 flex justify-center">
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
  );
}
