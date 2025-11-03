import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-neutral-100 border-b-2 border-amber-800 py-4 px-8 flex items-center justify-between">
      <nav className="flex items-center gap-6 text-gray-700 font-medium font-jomolhari uppercase tracking-wide">
        <Link to="/home" className="hover:text-amber-700 transition-colors duration-200">
          HOME
        </Link>
        <Link to="/home" className="hover:text-amber-700 transition-colors duration-200">
          ABOUT
        </Link>
        <Link to="/home" className="hover:text-amber-700 transition-colors duration-200">
         SERVICES
        </Link>
       </nav>


      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-xl font-semibold text-gray-800 tracking-wide">
          Velora
        </h1>
      </div>

      <div className="flex items-center font-medium font-jomolhari gap-4">
        <Link to="/" className="text-gray-700 hover:text-amber-700  transition-colors" >
          LOGIN
        </Link>
      </div>
    </header>
  );
}
