const Nav = () => {
  return (
    <header className="w-full fixed flex items-center justify-center z-10">
      <nav className=" glass-effect flex m-5 sm:m-10  h-20 w-full rounded-3xl ">
        <div className="flex w-full items-center justify-between">
          <div className="flex w-full items-center justify-center">LOGO</div>
          <div className="flex w-full items-center justify-around">REELZY</div>
          <div className="flex w-full items-center justify-center">Login</div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
