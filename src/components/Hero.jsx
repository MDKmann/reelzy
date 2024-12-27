import SearchBar from "./SearchBar"


const Hero = () => {
  return (
   <>
     <div className="flex justify-center items-center h-dvh text-center">
       <div className="movie-banner-bg -z-50"></div>
       <div className="shadow-inner-xl -z-40"></div>
       <div className="flex flex-col items-center justify-center h-full">
        <h1>Your site to find your next favorite show and we make it REELZY for YOU!</h1>
        <h3 className="my-6">Don{"'"}t you want to stop doomscrolling all of your streaming platforms?
          <br />
           Let us help you watch your movie instead of searching for it.</h3>
           <SearchBar />
       </div>
       
    </div>
    
   </>
    
  )
}

export default Hero