import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./lib/firebaseClient";

// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

// Pages
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import Service from "./pages/Service";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import RegisterPage from "./pages/RegisterPage";
import PostsManager from "./pages/PostsManager";
import AdminPortalPage from "./pages/AdminPortalPage";
import PostDetailPage from "./pages/PostDetailPage";

export default function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [checkingRole, setCheckingRole] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith("/admin") &&
    location.pathname !== "/admin-login";

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser || null);

      if (currentUser) {
        setCheckingRole(true);
        try {
          let userDocRef = doc(db, "user", currentUser.uid);
          let userSnap = await getDoc(userDocRef);

          if (!userSnap.exists()) {
            userDocRef = doc(db, "users", currentUser.uid);
            userSnap = await getDoc(userDocRef);
          }

          if (userSnap.exists() && userSnap.data().role === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error checking user role:", error);
          setIsAdmin(false);
        } finally {
          setCheckingRole(false);
        }
      } else {
        setIsAdmin(false);
        setCheckingRole(false);
      }

      setCheckingSession(false);
      setIsSidebarOpen(!!currentUser);
    });

    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    try {
      await signOut(auth);
      setIsAdmin(false);
      setIsSidebarOpen(false);
    } catch (err) {
      console.error("Error signing out:", err);
    }
  }

  if (checkingSession || checkingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1329] text-gray-100">
        <p className="text-blue-400 animate-pulse font-medium text-lg">
          Loading authentication...
        </p>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-200 ${
        isAdminRoute
          ? "bg-slate-100 text-gray-900"
          : "bg-[#0b1329] text-gray-100"
      }`}
    >
      {!isAdminRoute && (
        <Navbar
          user={user}
          onLogout={handleLogout}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}

      <div className="flex flex-1 relative w-full justify-center">
        {user && isAdmin && isAdminRoute && (
          <Sidebar
            user={user}
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
            onLogout={handleLogout}
          />
        )}

        <main
          className={`flex-1 w-full transition-all duration-300 ${
            user && isAdmin && isAdminRoute && isSidebarOpen
              ? "md:pl-64"
              : "md:pl-0"
          }`}
        >
          <div
            className={isHomePage ? "w-full" : "max-w-7xl mx-auto p-4 md:p-6"}
          >
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/services" element={<Service />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/post/:id" element={<PostDetailPage />} />
              <Route path="/posts/:id" element={<PostDetailPage />} />

              {/* User Auth Routes */}
              <Route
                path="/login"
                element={
                  !user ? (
                    <LoginPage />
                  ) : isAdmin ? (
                    <Navigate to="/admin" replace />
                  ) : (
                    <Navigate to="/products" replace />
                  )
                }
              />
              <Route
                path="/admin-login"
                element={
                  !user ? (
                    <LoginPage />
                  ) : isAdmin ? (
                    <Navigate to="/admin" replace />
                  ) : (
                    <Navigate to="/products" replace />
                  )
                }
              />
              <Route
                path="/register"
                element={
                  !user ? <RegisterPage /> : <Navigate to="/products" replace />
                }
              />
              <Route
                path="/forgot-password"
                element={
                  !user ? (
                    <ForgotPassword />
                  ) : (
                    <Navigate to="/products" replace />
                  )
                }
              />

              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={
                  user ? (
                    isAdmin ? (
                      <AdminPortalPage user={user} />
                    ) : (
                      <Navigate to="/products" replace />
                    )
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/admin/posts"
                element={
                  user ? (
                    isAdmin ? (
                      <PostsManager user={user} />
                    ) : (
                      <Navigate to="/products" replace />
                    )
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />

              {/* Catch-all Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>

      {!isAdminRoute && <Footer />}
    </div>
  );
}
