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

let recognition;

function startRecording(setTranscript, langCode, setIsRecording) {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Speech recognition not supported in this browser. Please use Chrome.");
    return;
  }
  recognition = new window.webkitSpeechRecognition();
  recognition.lang = langCode;
  recognition.interimResults = true;
  recognition.continuous = true;

  recognition.onresult = (event) => {
    let finalTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      finalTranscript += event.results[i][0].transcript;
    }
    setTranscript(finalTranscript);
  };

  recognition.start();
  setIsRecording(true);
}

function stopRecording(setAgentResponse, transcript, setIsRecording) {
  if (recognition) {
    recognition.stop();
    setIsRecording(false);
    setAgentResponse(transcript);
  }
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

export default function PracticeMode() {
  const [language, setLanguage] = useState("English");
  const [current, setCurrent] = useState(0);
  const [agentResponse, setAgentResponse] = useState("");
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState("");

  const practiceSet = scenarios.slice(0, 10);

  async function handleSubmit() {
    const res = await fetch("/.netlify/functions/practiceFeedback", {
      method: "POST",
      body: JSON.stringify({
        scenario: practiceSet[current],
        agentResponse,
        language,
      }),
    });
    const data = await res.json();
    setFeedback(data.text);
    speakText(data.text, languageMap[language]);
  }

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-purple-800 mb-6">Practice Mode</h2>

        <label className="block text-purple-700 font-medium mb-2">Select language</label>
        <select
          className="w-full border border-purple-300 rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {Object.keys(languageMap).map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-purple-700 mb-2">
            Scenario {current + 1} of {practiceSet.length}
          </h3>
          <p className="text-gray-800 italic">"{practiceSet[current].objection}"</p>
        </div>

        <textarea
          className="w-full border border-purple-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows="4"
          value={agentResponse}
          onChange={(e) => setAgentResponse(e.target.value)}
          placeholder="Type your response here..."
        />

        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => startRecording(setTranscript, languageMap[language], setIsRecording)}
            disabled={isRecording}
            className="flex-1 bg-white border border-purple-600 text-purple-600 py-2 rounded-lg shadow hover:bg-purple-50 transition disabled:opacity-50"
          >
            🎙️ Start Recording
          </button>
          <button
            onClick={() => stopRecording(setAgentResponse, transcript, setIsRecording)}
            disabled={!isRecording}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg shadow hover:bg-red-600 transition disabled:opacity-50"
          >
            ⏹️ Stop Recording
          </button>
        </div>

        {transcript && (
          <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded">
            <p className="text-sm text-gray-700"><strong>Transcript:</strong> {transcript}</p>
          </div>
        )}

        <div className="flex space-x-4 mb-6">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-purple-600 text-white py-3 rounded-lg shadow hover:bg-purple-700 transition"
          >
            Submit Response
          </button>
          <button
            onClick={() => {
              setCurrent((c) => (c + 1) % practiceSet.length);
              setAgentResponse("");
              setTranscript("");
              setFeedback("");
            }}
            className="flex-1 bg-white border border-purple-600 text-purple-600 py-3 rounded-lg shadow hover:bg-purple-50 transition"
          >
            Next Scenario
          </button>
        </div>

        {feedback && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-800 mb-2">Agent Response</h3>
            <p className="text-gray-700">{agentResponse}</p>
            <h3 className="font-semibold text-purple-800 mt-4 mb-2">AI Feedback</h3>
            <p className="text-gray-800">{feedback}</p>
            <button
              onClick={() => speakText(feedback, languageMap[language])}
              className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700"
            >
              🔊 Replay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
