import logo from "../assets/download.svg";

const Logo = () => {
  return (
    <div className="flex items-center">
      <img
        src={logo}
        alt="App logo"
        className="h-10 w-10 md:h-11 md:w-11 rounded-lg"
      />
    </div>
  );
};

export default Logo;
