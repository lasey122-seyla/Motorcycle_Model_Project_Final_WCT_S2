import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebaseClient";

console.log("Current Firebase API Key:", auth?.app?.options?.apiKey);

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  //  check URL has "admin" word or not (e.g., /admin-login)
  const isAdminPage = location.pathname.toLowerCase().includes("admin");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (isRegister && cleanPassword !== confirmPassword.trim()) {
      return setError("❌ Passwords do not match!");
    }

    setLoading(true);

    try {
      if (isRegister) {
        // register regular user
        const res = await createUserWithEmailAndPassword(
          auth,
          cleanEmail,
          cleanPassword,
        );

        await setDoc(doc(db, "users", res.user.uid), {
          email: cleanEmail,
          role: "user",
          createdAt: new Date(),
        });

        alert("Account registered successfully!");
        navigate("/products", { replace: true });
      } else {
        // login user
        const res = await signInWithEmailAndPassword(
          auth,
          cleanEmail,
          cleanPassword,
        );
        const currentUser = res.user;

        let userDocRef = doc(db, "user", currentUser.uid);
        let userSnap = await getDoc(userDocRef);

        if (!userSnap.exists()) {
          userDocRef = doc(db, "users", currentUser.uid);
          userSnap = await getDoc(userDocRef);
        }

        if (userSnap.exists() && userSnap.data().role === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/products", { replace: true });
        }
      }
    } catch (err) {
      console.error("Auth Error:", err.code);
      if (err.code === "auth/email-already-in-use") {
        setError("❌ This email is already registered.");
      } else if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password"
      ) {
        setError("❌ Incorrect email or password.");
      } else if (err.code === "auth/weak-password") {
        setError("❌ Password should be at least 6 characters.");
      } else {
        setError(`❌ Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center px-4">
      <div className="bg-slate-800 p-10 rounded-xl border border-slate-700 w-full max-w-[400px] text-white shadow-xl">
        <div className="text-center mb-6">
          <h2
            className={`m-0 text-2xl font-bold ${isAdminPage ? "text-red-500" : "text-sky-400"}`}
          >
            {isAdminPage
              ? " Admin Login"
              : isRegister
                ? " User Registration"
                : " User Login"}
          </h2>
          <p className="mt-2 text-slate-400 text-xs">
            {isAdminPage
              ? "Sign in to access MotoStore Management Dashboard"
              : isRegister
                ? "Create an account to explore MotoStore"
                : "Welcome back to MotoStore Customer Portal"}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-md mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-slate-400">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={
                isAdminPage ? "admin@example.com" : "user@example.com"
              }
              required
              className="p-3 rounded-md border border-slate-700 bg-slate-900 text-white text-base focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-slate-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="p-3 rounded-md border border-slate-700 bg-slate-900 text-white text-base focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {!isRegister && (
            <div className="flex justify-end -mt-2">
              <Link
                to="/forgot-password"
                className="text-sky-400 text-xs hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          )}

          {isRegister && !isAdminPage && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-slate-400">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="p-3 rounded-md border border-slate-700 bg-slate-900 text-white text-base focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`py-3.5 px-4 rounded-md font-bold text-base cursor-pointer text-white transition-colors disabled:opacity-50 ${
              isAdminPage
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading
              ? "Processing..."
              : isRegister
                ? "Register Account"
                : isAdminPage
                  ? "Login to Dashboard"
                  : "Login"}
          </button>
        </form>

        {!isAdminPage && (
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setError("");
              }}
              className="bg-transparent border-none text-sky-400 cursor-pointer text-sm underline hover:text-sky-300"
            >
              {isRegister
                ? "Already have an account? Login here"
                : "Don't have an account? Register here"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
