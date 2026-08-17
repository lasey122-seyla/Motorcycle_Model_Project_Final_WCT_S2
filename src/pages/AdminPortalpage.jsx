import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebaseClient";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { StatCard, RecentPostsTable } from "../components/DashboardComponents";

export default function AdminPortalPage({ user }) {
  const navigate = useNavigate();

  // State for Login Form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for Admin Verification & Data Dashboard
  const [isAdmin, setIsAdmin] = useState(false);
  const [verifyingAdmin, setVerifyingAdmin] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    myPosts: 0,
    postsWithImages: 0,
    lastPostDate: "N/A",
  });
  const [recentPosts, setRecentPosts] = useState([]);
  const [loadingStats, setLoadingStats] = useState(false);

  // 1. check  Admin with Firestore collection "user"
  useEffect(() => {
    async function checkAdminStatus() {
      if (!user) {
        setIsAdmin(false);
        setVerifyingAdmin(false);
        return;
      }

      try {
        setVerifyingAdmin(true);

        // check collection "user" by UID
        let userDocRef = doc(db, "user", user.uid);
        let userSnap = await getDoc(userDocRef);

        // if not found in "user", try "users" (to prevent lookup errors)
        if (!userSnap.exists()) {
          userDocRef = doc(db, "users", user.uid);
          userSnap = await getDoc(userDocRef);
        }

        if (userSnap.exists() && userSnap.data().role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("Error verifying admin role:", err);
        setIsAdmin(false);
      } finally {
        setVerifyingAdmin(false);
      }
    }

    checkAdminStatus();
  }, [user]);

  // 2. take data from Dashboard when Admin ready
  useEffect(() => {
    async function fetchAdminStats() {
      if (!isAdmin) return;

      setLoadingStats(true);
      try {
        const postsRef = collection(db, "posts");
        const q = query(postsRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const total = postsData.length;
        const myCount = postsData.filter(
          (p) => p.authorEmail === user?.email,
        ).length;

        const withImages = postsData.filter((p) => {
          if (!p.content) return false;
          const parser = new DOMParser();
          const doc = parser.parseFromString(p.content, "text/html");
          return doc.querySelector("img") !== null;
        }).length;

        let latestDate = "No posts yet";
        if (postsData.length > 0 && postsData[0].createdAt?.toDate) {
          latestDate = postsData[0].createdAt.toDate().toLocaleDateString();
        }

        setStats({
          totalPosts: total,
          myPosts: myCount,
          postsWithImages: withImages,
          lastPostDate: latestDate,
        });

        setRecentPosts(postsData.slice(0, 5));
      } catch (error) {
        console.error("Error loading admin stats:", error);
      } finally {
        setLoadingStats(false);
      }
    }

    fetchAdminStats();
  }, [isAdmin, user]);

  // 3. Handle Admin Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setIsSubmitting(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const loggedUser = userCredential.user;

      // check Role before Login
      let userDocRef = doc(db, "user", loggedUser.uid);
      let userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        userDocRef = doc(db, "users", loggedUser.uid);
        userSnap = await getDoc(userDocRef);
      }

      if (userSnap.exists() && userSnap.data().role === "admin") {
        setIsAdmin(true);
      } else {
        setLoginError("this is not an Admin");
        setIsAdmin(false);
      }
    } catch (err) {
      setLoginError("Invalid email or password!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // show Loading Indicator when checking User
  if (verifyingAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500"></div>
      </div>
    );
  }

  // option 1 ៖ if not logged in or not an Admin -> show Admin Login Form
  if (!user || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] px-4">
        <form
          onSubmit={handleLogin}
          className="bg-[#111c3a] p-8 rounded-xl w-full max-w-md border border-slate-800 shadow-xl"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white tracking-wide">
              Admin Portal Login
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              please enter your Admin credentials to access the portal
            </p>
          </div>

          {loginError && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 text-sm p-3 rounded-lg mb-4 text-center">
              {loginError}
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
              placeholder="admin_seyla@gmail.com"
              className="w-full p-2.5 bg-[#0b1329] text-white rounded-lg border border-slate-700 focus:outline-none focus:border-red-500 transition-colors"
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
              className="w-full p-2.5 bg-[#0b1329] text-white rounded-lg border border-slate-700 focus:outline-none focus:border-red-500 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-semibold p-2.5 rounded-lg transition-colors shadow-lg"
          >
            {isSubmitting ? "Logging in..." : "Login as Admin"}
          </button>
        </form>
      </div>
    );
  }

  // option 2 ៖ check Admin correct -> show Dashboard Overview
  return (
    <div className="space-y-6 pl-3">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-6 rounded-xl border border-gray-200 shadow-sm gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Overview
          </h1>
        </div>

        <Link
          to="/admin/posts"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-center self-start sm:self-auto"
        >
          Manage All Posts
        </Link>
      </div>

      {/* Real statistics grid cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Published Posts"
          value={loadingStats ? "..." : stats.totalPosts}
          color="text-blue-600"
        />
        <StatCard
          title="Authored by You"
          value={loadingStats ? "..." : stats.myPosts}
          color="text-green-600"
        />
        <StatCard
          title="Posts with Images"
          value={loadingStats ? "..." : stats.postsWithImages}
          color="text-purple-600"
        />
        <StatCard
          title="Latest Activity"
          value={loadingStats ? "..." : stats.lastPostDate}
          color="text-amber-600"
          isText={true}
        />
      </div>

      {/* Live Recent Posts Table */}
      <RecentPostsTable posts={recentPosts} loading={loadingStats} />
    </div>
  );
}
