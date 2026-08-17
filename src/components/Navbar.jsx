import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebaseClient";

function Navbar({ user, isAdmin }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="w-full min-h-[80px] px-10 py-5 flex justify-between items-center bg-[#0b1329] border-b border-[#1e293b] relative z-50 flex-wrap">
      {/* Logo */}
      <Link
        to="/"
        className="no-underline flex items-center gap-3"
        onClick={() => setIsOpen(false)}
      >
        <span className="text-white text-xl font-bold whitespace-nowrap">
          Model Motorcycle
        </span>
      </Link>

      {/* Desktop Menu & Buttons */}
      <div className="hidden md:flex items-center gap-8">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-slate-200 no-underline text-sm font-medium flex items-center gap-2 whitespace-nowrap hover:text-white"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-slate-200 no-underline text-sm font-medium flex items-center gap-2 whitespace-nowrap hover:text-white"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="text-slate-200 no-underline text-sm font-medium flex items-center gap-2 whitespace-nowrap hover:text-white"
          >
            About Us
          </Link>
          <Link
            to="/services"
            className="text-slate-200 no-underline text-sm font-medium flex items-center gap-2 whitespace-nowrap hover:text-white"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="text-slate-200 no-underline text-sm font-medium flex items-center gap-2 whitespace-nowrap hover:text-white"
          >
            Contact Us
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Only show Admin Portal if user is an admin */}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-white bg-red-600 px-5 py-2 rounded-xl no-underline font-semibold text-sm whitespace-nowrap shadow-md shadow-red-600/40 inline-block hover:bg-red-700"
                >
                  Admin Portal
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-white bg-slate-600 px-5 py-2 rounded-xl border-none cursor-pointer font-semibold text-sm whitespace-nowrap hover:bg-slate-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-white bg-blue-600 px-5 py-2 rounded-xl no-underline font-semibold text-sm whitespace-nowrap shadow-md shadow-blue-600/40 inline-block hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden bg-transparent text-white border-2 border-slate-700 rounded-lg text-2xl px-3 py-1 cursor-pointer flex items-center justify-center"
      >
        ☰
      </button>

      {isOpen && (
        <div className="w-full flex flex-col gap-5 mt-4 pt-4 border-t border-[#1e293b] md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="text-slate-200 no-underline text-sm font-medium flex items-center gap-2 whitespace-nowrap"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-slate-200 no-underline text-sm font-medium flex items-center gap-2 whitespace-nowrap"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/about"
              className="text-slate-200 no-underline text-sm font-medium flex items-center gap-2 whitespace-nowrap"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/services"
              className="text-slate-200 no-underline text-sm font-medium flex items-center gap-2 whitespace-nowrap"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="text-slate-200 no-underline text-sm font-medium flex items-center gap-2 whitespace-nowrap"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            {user ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-white bg-red-600 px-5 py-2 rounded-xl no-underline font-semibold text-sm whitespace-nowrap shadow-md shadow-red-600/40 inline-block"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Portal
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-white bg-slate-600 px-5 py-2 rounded-xl border-none cursor-pointer font-semibold text-sm whitespace-nowrap"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-white bg-blue-600 px-5 py-2 rounded-xl no-underline font-semibold text-sm whitespace-nowrap shadow-md shadow-blue-600/40 inline-block"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
