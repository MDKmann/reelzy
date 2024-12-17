const Nav = () => {
  return (
    <header className="flex w-full items-center justify-between px-5 py-10 sm:px-10">
      <nav className="screen-max-width nav-height glass-effect flex w-full">
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
