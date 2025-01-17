import Logo from "../../public/assets/images/logo.png"
import { Link } from "react-router-dom";

export function Nav() {
  return (
    <header
      className=" m-10 z-30 max-w-screen-md py-3 mx-auto sm:border sm:border-gray-500 shadow sm:w-3/4 lg:w-2/3   sm:top-6 sm:rounded-3xl lg:max-w-screen-lg">
        <div className="px-4">
          <div className="flex items-center justify-between">
            <div className="flex shrink-0">
                <Link to={"/"} className="flex items-center" >
                    <img className="w-auto h-9" src={Logo} alt="" />
                    <p className="sr-only">REELZY Logo</p>
                </Link>
            </div>
            <a className="flex items-center text-lg font-bold text-white no-underline opacity-75 sm:text-2xl hover:no-underline lg:text-4xl" href="#">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-sky-400">REEL</span>ZY
          </a>
            <div className="flex items-center justify-end gap-3">
                <a className="inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-white transition-all duration-150 bg-blue-600 shadow-sm rounded-xl hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    href="#">Login</a>
            </div>
          </div>
        </div>
      </header>
  );
}
