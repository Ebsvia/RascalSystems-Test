import { Link } from "react-router-dom";

export default function Navbar() {
  const links = ["people", "planets", "species", "starships", "vehicles"];

  return (
    <nav className="bg-gray-900 text-white p-4 flex gap-4">
      {links.map((link) => (
        <Link
          key={link}
          to={`/${link}`}
          className="hover:text-yellow-300 capitalize"
        >
          {link}
        </Link>
      ))}
    </nav>
  );
}
