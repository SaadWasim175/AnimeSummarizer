import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAnimeMangaDetails } from "../api/anilistAPI";
import { generateAISummary } from "../api/generateAISummary";

function AnimeDetailPage() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState("");
  const [summaryLength, setSummaryLength] = useState(150);
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);

  useEffect(() => {
    async function getAnimeDetails() {
      const data = await fetchAnimeMangaDetails(id);
      setAnime(data);
    }
    getAnimeDetails();
  }, [id]);

  const handleGenerateSummary = async () => {
    if (!selectedEpisode) return;
    setSummaryLoading(true);
    const prompt = `Summarize episode ${selectedEpisode} of the anime "${anime.title.english || anime.title.romaji}" in about ${summaryLength} words length verify that you are giving accurate 
    episode information, make a heading of the episode name, give a cinematic worldbuilding intro, story-like narrative flow, emotional weight and measure, focus on characters' dialogues and their weight, third person narrator 
    tone, focus on building hype, drama and mystery, and ensure smooth transitions from past > present > action all while making sure there is no summary vibe..`;
    const generated = await generateAISummary(prompt);
    setSummary(generated);
    setSummaryLoading(false);
  };

  const handleDownloadSummary = () => {
    const blob = new Blob([summary], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${anime.title.romaji}_Episode${selectedEpisode}_Summary.txt`;
    link.click();
  };

  if (!anime) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="p-6 text-white min-h-screen bg-gray-900">
      <h1 className="text-3xl font-bold">{anime.title.english || anime.title.romaji}</h1>
      <img src={anime.coverImage.large} alt={anime.title.romaji} className="w-64 h-96 object-cover my-4 rounded-lg shadow-md" />
      <p dangerouslySetInnerHTML={{ __html: anime.description }} className="text-blue-200"></p>

      <div className="mt-4">
        <label className="block font-semibold">Enter Episode Number:</label>
        <input
          type="number"
          min="1"
          className="p-2 bg-gray-800 text-white border border-blue-500 rounded-md w-24"
          value={selectedEpisode}
          onChange={(e) => setSelectedEpisode(e.target.value)}
          placeholder="e.g. 1"
        />
      </div>

      <div className="mt-4">
        <label className="block font-semibold">Summary Length (words):</label>
        <input
          type="number"
          className="p-2 bg-gray-800 text-white border border-blue-500 rounded-md w-24"
          value={summaryLength}
          onChange={(e) => setSummaryLength(e.target.value)}
        />
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
        disabled={!selectedEpisode || summaryLoading}
        onClick={handleGenerateSummary}
      >
        {summaryLoading ? "Generating..." : "Generate Summary"}
      </button>

      {summary && (
        <div className="mt-4 p-4 bg-gray-800 rounded-md shadow-md">
          <h2 className="font-semibold text-blue-300 mb-2">AI Summary:</h2>
          <p className="text-blue-100">{summary}</p>
          <button
            className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
            onClick={handleDownloadSummary}
          >
            Download Summary
          </button>
        </div>
      )}
    </div>
  );
}

export default AnimeDetailPage;
