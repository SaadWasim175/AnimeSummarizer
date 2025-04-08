import axios from "axios";

const GEMINI_API_KEY = 'AIzaSyDPXPwawhUN80BA1FPhpoPd__aRmX0K7WA';

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function generateAISummary(prompt) {
  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Full API Response:", response.data); // ✅ Debug log

    const generatedText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No summary generated.";
    return generatedText;
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    return "Failed to generate summary. Please try again.";
  }
}

