import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAnimeMangaDetails } from "../api/anilistAPI";
import { generateAISummary } from "../api/generateAISummary";

function MangaDetailPage() {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [selectedVolume, setSelectedVolume] = useState("");
  const [summaryLength, setSummaryLength] = useState(150);
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);

  useEffect(() => {
    async function getMangaDetails() {
      const data = await fetchAnimeMangaDetails(id);
      setManga(data);
    }
    getMangaDetails();
  }, [id]);

  const handleGenerateSummary = async () => {
    if (!selectedVolume) return;
    setSummaryLoading(true);
    const prompt = `Summarize chapter ${selectedVolume} of the manga "${manga.title.english || manga.title.romaji}" in about ${summaryLength} words length, verify that you are giving accurate 
    chapter information, give chapter name heading, give a cinematic worldbuilding intro, story-like narrative flow, emotional weight and measure, focus on characters' dialogues and their weight, third person narrator 
    tone, focus on building hype, drama and mystery, and ensure smooth transitions from past > present > action all while making sure there is no summary vibe.`;
    const generated = await generateAISummary(prompt);
    setSummary(generated);
    setSummaryLoading(false);
  };

  const handleDownloadSummary = () => {
    const blob = new Blob([summary], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${manga.title.romaji}_Chapter${selectedVolume}_Summary.txt`;
    link.click();
  };

  if (!manga) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="p-6 text-white min-h-screen bg-gray-900">
      <h1 className="text-3xl font-bold">{manga.title.english || manga.title.romaji}</h1>
      <img src={manga.coverImage.large} alt={manga.title.romaji} className="w-64 h-96 object-cover my-4 rounded-lg shadow-md" />
      <p dangerouslySetInnerHTML={{ __html: manga.description }} className="text-blue-200"></p>

      <div className="mt-4">
        <label className="block font-semibold">Enter Chapter Number:</label>
        <input
          type="number"
          min="1"
          className="p-2 bg-gray-800 text-white border border-blue-500 rounded-md w-24"
          value={selectedVolume}
          onChange={(e) => setSelectedVolume(e.target.value)}
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
        disabled={!selectedVolume || summaryLoading}
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

export default MangaDetailPage;
