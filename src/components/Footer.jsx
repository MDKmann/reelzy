
const Footer = () => {
  return (
    <footer class="mt-20 xl:mt-32 mx-auto w-full relative text-center bg-black text-white">
    <div class="px-6 py-8 md:py-14 xl:pt-20 xl:pb-12">
        <h2 class="font-bold text-3xl xl:text-4xl leading-snug">
            Love what you see?<br />Touch base with me and we would love to see what the future has in store.
        </h2>
        <a class="mt-8 xl:mt-12 px-12 py-5 text-lg font-medium leading-tight inline-block bg-blue-800 rounded-full shadow-xl border border-transparent hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-999 focus:ring-sky-500"
            href="#">Contact</a>
        <div class="mt-14 xl:mt-20">
            <nav class="flex flex-wrap justify-center text-lg font-medium">
                <div class="px-5 py-2"><a href="#">Contact</a></div>
                <div class="px-5 py-2"><a href="#">Pricing</a></div>
                <div class="px-5 py-2"><a href="#">Privacy</a></div>
                <div class="px-5 py-2"><a href="#">Terms</a></div>
                <div class="px-5 py-2"><a href="#">Twitter</a></div>
            </nav>
            <p class="mt-7 text-base">© 2023 XYZ, LLC</p>
        </div>
    </div>
</footer>
  )
}

export default Footer