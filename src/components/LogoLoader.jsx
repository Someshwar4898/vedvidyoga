import logo from "../assets/logo.png";

function LogoLoader() {
  return (
    <div className="flex justify-center py-24">
      <img
        src={logo}
        alt="Loading…"
        className="logo-loader h-10 w-10 object-contain"
      />
    </div>
  );
}

export default LogoLoader;
