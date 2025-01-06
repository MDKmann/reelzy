
export function Footer() {
  return <footer className="relative mx-auto mt-20 w-full bg-black text-center text-white xl:mt-32">
        <div className="px-6 py-8 md:py-14 xl:pb-12 xl:pt-20">
          <h2 className="text-3xl font-bold leading-snug xl:text-4xl">
            Love what you see?
            <br />
            Touch base with me and we would love to see what the future has in
            store.
          </h2>
          <a className="focus:ring-offset-sky-999 mt-8 inline-block rounded-full border border-transparent bg-blue-800 px-12 py-5 text-lg font-medium leading-tight shadow-xl hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 xl:mt-12" href="#">
            Contact
          </a>
          <div className="mt-14 xl:mt-20">
            <nav className="flex flex-wrap justify-center text-lg font-medium">
              <div className="px-5 py-2">
                <a href="#">Contact</a>
              </div>
              <div className="px-5 py-2">
                <a href="#">Pricing</a>
              </div>
              <div className="px-5 py-2">
                <a href="#">Privacy</a>
              </div>
              <div className="px-5 py-2">
                <a href="#">Terms</a>
              </div>
              <div className="px-5 py-2">
                <a href="#">Twitter</a>
              </div>
            </nav>
            <p className="mt-7 text-base">© 2023 XYZ, LLC</p>
          </div>
        </div>
      </footer>;
}
  