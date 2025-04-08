import { Link } from "react-router-dom";

function AnimeCard({ anime }) {
  return (
    <Link to={`/anime/${anime.id}`} className="block">
      <div className="bg-gray-800 shadow-md hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300 ease-in-out rounded-lg overflow-hidden border border-gray-700">
        <img
          src={anime.coverImage.large}
          alt={anime.title.romaji}
          className="w-full h-64 object-cover"
        />
        <div className="p-3">
          <h2 className="text-lg font-semibold text-white truncate">
            {anime.title.english || anime.title.romaji}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default AnimeCard;


