const Header = () => {
  const nav_buttons = ["About Us", "Contact Us", "Terms & Conditions"];

  return (
    <div className="bg-black z-50">
      <div className="fixed top-0 left-0 border-b p-3 z-50 bg-black  border-n-4 w-full flex justify-between">
        <h1 className="text-n-1 font-black font-sans tracking-wider text-2xl">
          Windy Farm
        </h1>

        <nav className="lg:flex gap-6 items-center">
          {nav_buttons.map((item) => {
            return (
              <a className="text-n-2 uppercase font-code font-light text-sm transition-all hover:text-color-1 hover:cursor-pointer">
                {item}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Header;
