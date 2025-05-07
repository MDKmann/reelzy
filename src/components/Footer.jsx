
export function Footer() {
  return (
    <footer className="relative mx-auto mt-20 w-full bg-black text-center text-white xl:mt-32">
      <div className="px-6 py-8 md:py-14 xl:pb-12 xl:pt-20">
        <h2 className="text-4xl font-bold leading-snug xl:text-4xl">
          Love what you see?
        </h2>
        <h4 className="text-2xl m-4">
          Touch base with me and we would love to see what the future has in
          store.
        </h4>
        <a
          className="focus:ring-offset-sky-999 mt-8 inline-block rounded-full border border-transparent bg-blue-800 px-12 py-5 text-lg font-medium leading-tight shadow-xl hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 xl:mt-12"
          href="mailto:MDKuhlmann@zoho.com"
        >
          Contact
        </a>
        <div className="mt-14 xl:mt-20">
          <nav className="flex flex-wrap justify-center text-lg font-medium">
            <div className="px-5 py-2">
              <a href="https://www.linkedin.com/in/michael-kuhlmann-developer/">
                LinkedIn
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="https://github.com/MDKmann">GitHub</a>
            </div>
            <div className="px-5 py-2">
              <a href="https:/michael-kuhlmann.com">ePortfolio</a>
            </div>
            <div className="px-5 py-2">
              <a href="https://drive.google.com/drive/folders/1XzGVYIDvfv7Fo1cjb2wcrAv465IiQ20a?usp=sharing">
                Resume
              </a>
            </div>
          </nav>
          <p className="mt-7 text-base">© 2025 REELZY - Michael Kuhlmann</p>
        </div>
      </div>
    </footer>
  );
}
  