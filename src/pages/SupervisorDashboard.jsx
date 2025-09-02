
import { Link } from "react-router-dom";
import React from "react";

const sampleLogs = [
  { agent: "Asha", scenario: "Pricing too high", score: 82, feedback: "Good empathy, missed value framing." },
  { agent: "Ravi", scenario: "Already with competitor", score: 67, feedback: "Needs stronger differentiation." },
  { agent: "Meena", scenario: "My business is too small", score: 90, feedback: "Handled perfectly with relevance." },
  { agent: "Karan", scenario: "No time right now", score: 74, feedback: "Should create urgency politely." },
  { agent: "Priya", scenario: "Hidden charges?", score: 88, feedback: "Explained transparency well." }
];

export default function SupervisorDashboard() {
  const avgScore = Math.round(sampleLogs.reduce((sum, log) => sum + log.score, 0) / sampleLogs.length);

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-purple-800 mb-6">Supervisor Dashboard</h2>
        <div className="mb-6 p-4 bg-purple-100 border border-purple-200 rounded-lg text-purple-900">
          <h3 className="text-lg font-semibold">Overall Average Accuracy</h3>
          <p className="text-2xl font-bold">{avgScore}%</p>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-purple-200 text-purple-900">
              <th className="p-3 text-left">Agent</th>
              <th className="p-3 text-left">Scenario</th>
              <th className="p-3 text-left">Score</th>
              <th className="p-3 text-left">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {sampleLogs.map((log, idx) => (
              <tr key={idx} className="odd:bg-purple-50 even:bg-purple-100">
                <td className="p-3">{log.agent}</td>
                <td className="p-3">{log.scenario}</td>
                <td className="p-3 font-semibold">{log.score}%</td>
                <td className="p-3">{log.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>

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
