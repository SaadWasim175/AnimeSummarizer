import { useState, useEffect } from "react";
import { useAnimeManga } from "../context/AnimeMangaContext";
import { searchAnimeManga } from "../api/anilistAPI";
import MangaCard from "../components/MangaCard";

function MangaPage() {
  const { mangaList } = useAnimeManga();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (search.trim() === "") {
      setSearchResults([]);
    } else {
      searchAnimeManga(search, "MANGA").then(setSearchResults);
    }
  }, [search]);

  const displayedManga = search.trim() === "" ? mangaList : searchResults;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold mb-4 text-blue-400">Trending Manga</h1>

        <input
          type="text"
          placeholder="Search Manga..."
          className="w-full p-3 rounded-md border border-blue-700 bg-[#1e293b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {displayedManga.map((manga) => (
            <MangaCard key={manga.id} manga={manga} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MangaPage;

