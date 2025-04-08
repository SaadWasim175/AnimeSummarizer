import animeCharacters from '../assets/animeCharacters.png'; // Image of anime characters
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 min-h-screen text-white">
      {/* Hero Section */}
      <div className="relative w-full min-h-screen flex flex-col justify-center items-center text-center px-6 py-20">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <img
            src={animeCharacters}
            alt="Anime Characters"
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        {/* Title */}
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200 mb-6 z-10">
          Discover the World of Anime & Manga
        </h1>

        {/* Subtext */}
        <p className="text-xl text-blue-200 mb-12 z-10">
          Dive into your favorite anime and manga. Generate AI summaries for volumes or episodes!
        </p>

        {/* Buttons */}
        <div className="flex space-x-6 z-10">
          <Link
            to="/anime"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-md font-semibold text-xl shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Explore Anime
          </Link>
          <Link
            to="/manga"
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-8 py-4 rounded-md font-semibold text-xl shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Explore Manga
          </Link>
        </div>
      </div>

      {/* Decorative Section */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 py-12 z-10">
        <svg
          className="w-32 h-32 text-blue-500 opacity-30"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="5" fill="none" />
        </svg>
      </div>
    </div>
  );
}

export default Home;

