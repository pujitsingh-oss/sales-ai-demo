import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-50 text-purple-900">
      <h1 className="text-4xl font-bold mb-8">AI Sales Coach</h1>
      <div className="space-x-4">
        <Link
          to="/merchant"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-700"
        >
          Merchant Check-in
        </Link>
        <Link
          to="/practice"
          className="bg-white text-purple-600 border border-purple-600 px-6 py-3 rounded-lg shadow hover:bg-purple-100"
        >
          Practice Mode
        </Link>
        <Link
          to="/dashboard"
          className="bg-purple-200 text-purple-800 px-6 py-3 rounded-lg shadow hover:bg-purple-300"
        >
          Supervisor Dashboard
        </Link>
      </div>
    </div>
  );
}
