import heroPoster from "/public/assets/images/heroFilmPosters.png"

const Hero = () => {
  return (
    <div className="hero-height flex  items-center justify-center">
        <img src={heroPoster} alt="poster" className="m-4 overflow-hidden rounded-3xl shadow-inner" />
    </div>
  )
}

export default Hero