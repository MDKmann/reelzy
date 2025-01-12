// import React from 'react'

// const MovieGrid = () => {
//   return (
//     <div> 
//       {searchResults?.map((movie) => (
//           <div key={movie.imdbID}>
//             <div className="relative">
//               <div className="absolute inset-0 flex items-end rounded-2xl border border-[#b1b1b166] bg-gradient-to-t from-black/60 to-transparent">
//                 <div className="p-4 text-white">
//                   <h3 className="mb-2 text-xl font-bold">{movie.Title}</h3>
//                   <div className="mt-4 space-x-4">
//                     <span>{movie.imdbRating}</span>
//                     <span>{movie.Rated}</span>
//                     <span>{movie.Runtime}</span>
//                   </div>
//                 </div>
//               </div>
//               <img
//                 src={movie.Poster}
//                 loading="lazy"
//                 alt="movie-poster"
//                 className="rounded-2xl object-cover"
//               />
//             </div>
//           </div>
//         ))}</div>
//   )
// }

// export default MovieGrid