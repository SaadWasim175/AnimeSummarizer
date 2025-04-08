import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MangaPage from "./pages/MangaPage";
import AnimePage from "./pages/AnimePage";
import SummaryPage from "./pages/SummaryPage";
import { AnimeMangaProvider } from "./context/AnimeMangaContext";
import MangaDetailPage from "./pages/MangaDetailPage";
import AnimeDetailPage from "./pages/AnimeDetailPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AnimeMangaProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manga" element={<MangaPage />} />
          <Route path="/anime" element={<AnimePage />} />
          <Route path="/summary/:id" element={<SummaryPage />} />
          <Route path="/manga/:id" element={<MangaDetailPage />} />
          <Route path="/anime/:id" element={<AnimeDetailPage />} />
        </Routes>
      </Router>
    </AnimeMangaProvider>
  );
}

export default App;
