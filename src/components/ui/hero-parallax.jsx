"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { DarkSearchBar } from "./DarkSearchBar";

export const HeroParallax = ({
  movies = [],
  offsetY = -160,
  offsetX = -80,
}) => {
  const ROW_SIZE = 6;
  // Build up to 4 rows (24 movies max)
  const rows = React.useMemo(() => {
    if (!Array.isArray(movies)) return [];
    const maxRows = 4;
    const totalRows = Math.min(maxRows, Math.ceil(movies.length / ROW_SIZE));
    return Array.from({ length: totalRows }, (_, i) =>
      movies.slice(i * ROW_SIZE, (i + 1) * ROW_SIZE)
    );
  }, [movies]);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  // Height scales with number of rows (approx 90vh per row)
  const containerHeightClass =
    rows.length === 4
      ? "h-[480vh]"
      : rows.length === 3
        ? "h-[360vh]"
        : rows.length === 2
          ? "h-[240vh]"
          : "h-[180vh]";
  return (
    <div
      ref={ref}
      className={`relative flex ${containerHeightClass} flex-col self-auto overflow-hidden py-32 antialiased [perspective:1000px] [transform-style:preserve-3d]`}
    >
      <Header />
      <DarkSearchBar />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <div
          style={{ marginTop: offsetY, marginLeft: offsetX }}
          className="pointer-events-auto"
        >
          {rows.map((row, idx) => {
            // Keep visual order consistent (left-to-right) while alternating motion direction
            const translate = idx % 2 === 0 ? translateX : translateXReverse;
            if (!row.length) return null;
            return (
              <motion.div
                key={`row-${idx}`}
                className="flex flex-row mb-20 space-x-20"
              >
                {row.map((movie) => (
                  <MovieCard
                    movie={movie}
                    translate={translate}
                    key={movie.imdbID || movie.Title}
                  />
                ))}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="relative flex justify-center w-full pb-32">
      <div className="container flex justify-start max-w-screen-lg mx-6">
        <div className="w-full">
          <h1 className="text-2xl font-bold dark:text-white md:text-7xl">
            Find your next watch <br /> REELZY
          </h1>
          <p className="max-w-2xl mt-8 text-base dark:text-neutral-200 md:text-xl">
            A website that helps you find movies you'll love. <br />
            Don't doomscroll reels when we make it REELZY to find your next
            film.
          </p>
        </div>
      </div>
    </div>
  );
};

export const MovieCard = ({ movie, translate }) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      className="relative group/movie h-96 w-72 shrink-0"
    >
      <Link to={`/${movie.imdbID}`}>
        <div className="relative group rounded-2xl transition-group hover:scale-105 hover:card-hover-shadow">
          <div className="absolute inset-0 flex items-end rounded-2xl border border-[#b1b1b166] bg-gradient-to-t from-black/60 to-transparent">
            <div className="p-4 text-white translate-y-8 transition-secondary group-hover:translate-y-0">
              <h3 className="mb-2 text-xl font-bold">{movie.Title}</h3>
              <div className="mt-4 space-x-4 transition-opacity delay-500 opacity-0 group-hover:opacity-100">
                <span>
                  <span className="text-yellow-400">
                    <FontAwesomeIcon icon={faStar} />
                  </span>{" "}
                  {movie.imdbRating}/10
                </span>
                <span>{movie.Rated}</span>
                {/* <span>{runtimeRef.current}</span> */}
              </div>
            </div>
          </div>
          <img
            src={movie.Poster}
            loading="lazy"
            alt="movie-poster"
            className="object-cover movie-card-img rounded-2xl"
          />
        </div>
      </Link>
    </motion.div>
  );
};
