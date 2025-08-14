import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const links = ["people", "planets", "species", "starships", "vehicles"];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">StarWars API</div>

        {/* Hamburger button for mobile */}
        <button
          className="sm:hidden flex items-center px-3 py-2 border rounded text-gray-300 border-gray-400 hover:text-yellow-300 hover:border-yellow-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="fill-current h-4 w-4"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            {isOpen ? (
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /> // X icon when open
            ) : (
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            )}
          </svg>
        </button>

        {/* Links for desktop */}
        <div className="hidden sm:flex gap-4">
          {links.map((link) => (
            <Link
              key={link}
              to={`/${link}`}
              className="hover:text-yellow-300 capitalize"
            >
              {link}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden mt-2 flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link}
              to={`/${link}`}
              className="hover:text-yellow-300 capitalize"
              onClick={() => setIsOpen(false)} 
            >
              {link}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
