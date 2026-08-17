import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../lib/firebaseClient";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ Password reset link sent! Check your email inbox.");
    } catch (err) {
      console.error(err);
      setError("❌ Failed to send reset email. Verify your email address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1329] text-white flex items-center justify-center p-6">
      <div className="bg-[#151f38] border border-gray-800 p-8 rounded-xl max-w-md w-full shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
          Reset Password
        </h2>

        {message && (
          <div className="bg-green-600/20 border border-green-500 text-green-400 p-3 rounded-lg mb-4 text-sm text-left">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-600/20 border border-red-500 text-red-400 p-3 rounded-lg mb-4 text-sm text-left">
            {error}
          </div>
        )}

        <form onSubmit={handleReset} className="flex flex-col gap-4">
          <div className="text-left">
            <label className="block text-sm text-gray-400 mb-1 font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full bg-[#0b1329] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded-lg transition mt-2 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-2 text-sm text-gray-400">
          <Link to="/login" className="text-blue-400 hover:underline">
            ← Back to User Login
          </Link>
          <Link
            to="/admin-login"
            className="text-gray-400 hover:text-white hover:underline"
          >
            Back to Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}
