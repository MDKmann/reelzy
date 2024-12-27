import MagnifySVG from "./MagnifySVG";
import SlidersSVG from "./SlidersSVG";



const SearchBar = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="flex w-full max-w-[600px] rounded-full bg-[#0d1829] px-2">
        <button className="flex cursor-pointer self-center bg-[#0d1829] p-1">
          <SlidersSVG />
        </button>

        <input
          type="text"
          className="flex w-full bg-[#0d1829] bg-transparent pl-2 text-[#cccccc] outline-0"
          placeholder="Search by title . . ."
        />
        <button type="submit" className="relative rounded-full bg-[#0d1829] p-2">
            <MagnifySVG />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
