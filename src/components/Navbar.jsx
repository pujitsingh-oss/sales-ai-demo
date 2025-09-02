import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-purple-700 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">AI Sales Coach</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/merchant" className="hover:underline">Merchant Check-in</Link>
          <Link to="/practice" className="hover:underline">Practice Mode</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}
