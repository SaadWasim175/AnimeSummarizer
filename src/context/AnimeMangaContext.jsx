import { createContext, useContext, useEffect, useState } from "react";
import { fetchTrending } from "../api/anilistAPI"; // ✅ Import API function

const AnimeMangaContext = createContext();

export function useAnimeManga() {
  return useContext(AnimeMangaContext);
}

export function AnimeMangaProvider({ children }) {
  const [mangaList, setMangaList] = useState([]);
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    async function loadTrending() {
      setMangaList(await fetchTrending("MANGA"));
      setAnimeList(await fetchTrending("ANIME"));
    }
    loadTrending();
  }, []);

  return (
    <AnimeMangaContext.Provider value={{ mangaList, animeList }}>
      {children}
    </AnimeMangaContext.Provider>
  );
}
