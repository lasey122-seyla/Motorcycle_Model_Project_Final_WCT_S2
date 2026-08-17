import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebaseClient";

export default function UserLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUserLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      // 🎯 User Login successful -> redirect to Items / Products page
      navigate("/products");
    } catch (err) {
      setError("Email or password is incorrect!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <form
        onSubmit={handleUserLogin}
        className="bg-[#111c3a] p-8 rounded-xl w-full max-w-md border border-slate-800 shadow-xl"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-blue-400">👤 User Login</h2>
          <p className="text-sm text-gray-400 mt-1">
            Sign in to explore MotoStore items and products
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 text-sm p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-medium mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            className="w-full p-2.5 bg-[#0b1329] text-white rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-medium mb-1.5">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full p-2.5 bg-[#0b1329] text-white rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold p-2.5 rounded-lg transition-colors shadow-lg"
        >
          {loading ? "Logging in..." : "Login & View Items"}
        </button>

        <div className="mt-4 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
}
