
import { Link } from "react-router-dom";
import { useState } from "react";
import scenarios from "../data/scenarios.json";

const languageMap = {
  English: "en-US",
  Hindi: "hi-IN",
  Hinglish: "hi-IN",
  Marathi: "mr-IN",
  Kannada: "kn-IN",
  Tamil: "ta-IN",
  Telugu: "te-IN",
  Bangla: "bn-IN",
};

function startRecording(setText, langCode) {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Speech recognition not supported in this browser. Please use Chrome.");
    return;
  }
  const recognition = new window.webkitSpeechRecognition();
  recognition.lang = langCode;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setText(transcript);
  };
  recognition.start();
}

function speakText(text, langCode) {
  if (!("speechSynthesis" in window)) {
    alert("Text-to-Speech not supported in this browser.");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langCode;
  speechSynthesis.speak(utterance);
}

export default function MerchantCheckin() {
  const [language, setLanguage] = useState("English");
  const [objection, setObjection] = useState("");
  const [response, setResponse] = useState("");

  async function handleSubmit() {
    const res = await fetch("/.netlify/functions/merchantRebuttal", {
      method: "POST",
      body: JSON.stringify({ objection, language }),
    });
    const data = await res.json();
    setResponse(data.text);
    speakText(data.text, languageMap[language]);
  }

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-purple-800 mb-6">Merchant Check-in</h2>

        <label className="block text-purple-700 font-medium mb-2">Select language</label>
        <select
          className="w-full border border-purple-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {Object.keys(languageMap).map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>

        <label className="block text-purple-700 font-medium mb-2">Select or record an objection</label>
        <select
          className="w-full border border-purple-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) => setObjection(e.target.value)}
        >
          <option value="">-- Choose an objection --</option>
          {scenarios.map((s) => (
            <option key={s.id} value={s.objection}>
              {s.objection}
            </option>
          ))}
        </select>

        <button
          onClick={() => startRecording(setObjection, languageMap[language])}
          className="w-full mb-4 bg-white border border-purple-600 text-purple-600 py-2 rounded-lg shadow hover:bg-purple-50 transition"
        >
          🎤 Record Objection
        </button>

        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 text-white py-3 rounded-lg shadow hover:bg-purple-700 transition"
        >
          Get AI Rebuttal
        </button>

        {response && (
          <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-800 mb-2">AI Suggestion</h3>
            <p className="text-gray-800 mb-2">{response}</p>
            <button
              onClick={() => speakText(response, languageMap[language])}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition"
            >
              🔊 Replay
            </button>
          </div>
        )}

      <div className="mt-6">
        <Link
          to="/"
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition"
        >
          ⬅ Back to Home
        </Link>
      </div>

      </div>
    </div>
  );
}
