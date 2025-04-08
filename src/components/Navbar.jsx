import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold tracking-wider">
          AniSum
        </Link>
        <div className="space-x-6">
          <Link
            to="/anime"
            className="text-white hover:text-blue-300 transition duration-300"
          >
            Anime
          </Link>
          <Link
            to="/manga"
            className="text-white hover:text-blue-300 transition duration-300"
          >
            Manga
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

