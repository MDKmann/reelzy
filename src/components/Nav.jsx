import Logo from "../../public/assets/images/logo.png";
import { Link } from "react-router-dom";

export function Nav() {
  // return (
  //   <header
  //     // className="z-30 max-w-screen-md py-3 m-10 mx-auto shadow sm:border sm:border-gray-500 sm:w-3/4 lg:w-2/3 sm:top-6 sm:rounded-3xl lg:max-w-screen-lg">
  //     className="z-30 max-w-screen-sm py-3 m-10 mx-auto sm:border test-navbar sm:w-3/4 lg:w-2/3 sm:top-6 sm:rounded-3xl"
  //   >
  //     <div className="px-4">
  //       <div className="flex items-center justify-between">
  //         <div className="flex shrink-0">
  //           <Link to={"/"} className="flex items-center">
  //             <img className="w-auto h-9" src={Logo} alt="" />
  //             <p className="sr-only">REELZY Logo</p>
  //           </Link>
  //         </div>
  //         <a
  //           className="flex items-center text-lg font-bold text-white no-underline opacity-75 sm:text-2xl hover:no-underline lg:text-4xl"
  //           href="#"
  //         >
  //           <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-sky-400">
  //             REEL
  //           </span>
  //           ZY
  //         </a>
  //         <div className="flex items-center justify-end gap-3">
  //           <a
  //             className="inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-white transition-all duration-150 bg-blue-600 shadow-sm rounded-xl hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
  //             href="#"
  //           >
  //             Login
  //           </a>
  //         </div>
  //       </div>
  //     </div>
  //   </header>
  // );

  return (
    <header className={`flex w-full items-center justify-center `}>
      <div className="container h-12 max-w-screen-lg mx-6 my-4 ">
        <div className="relative flex items-center justify-between">
          <div className="flex w-full max-w-full gap-4 px-4">
            <Link to={"/"} className="flex items-center">
              <img className="w-auto h-9" src={Logo} alt="" />
              <p className="sr-only">REELZY Logo</p>
            </Link>
            <a
              className="flex items-center text-lg font-bold text-white no-underline opacity-75 sm:text-2xl hover:no-underline lg:text-4xl"
              href="#"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-sky-400">
                REEL
              </span>
              ZY
            </a>
          </div>
          <div className="flex items-center justify-between w-full px-4">
            <div></div>
            <div className="flex justify-end lg:pr-0">
              <a
                className="inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-white transition-all duration-150 bg-blue-600 shadow-sm rounded-xl hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                href="#"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
