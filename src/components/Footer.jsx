import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-[#000000] text-gray-400 py-12 px-6 md:px-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
        <div className="flex flex-col space-y-4">
          <h3 className="text-white font-bold text-lg tracking-wider uppercase">
            MODEL MOTORCYCLE
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Premium custom motorcycle modifications, track performance setups,
            and digital diagnostics tuning for high-end sport bikes and
            cruisers.
          </p>
          <div className="flex items-center space-x-4 pt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-blue-500 transition-colors"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-pink-500 transition-colors"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <FaXTwitter size={18} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-red-500 transition-colors"
            >
              <FaYoutube size={18} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col space-y-3">
          <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-1">
            NAVIGATION
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col space-y-3">
          <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-1">
            SERVICES
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Custom Tuning</li>
            <li>Premium Care</li>
            <li>ECU Scanning</li>
            <li>Telemetry Maps</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <p>
          © {new Date().getFullYear()} Model Motorcycle. All rights reserved.
        </p>
        <Link
          to="/admin-login"
          className="text-gray-600 hover:text-gray-400 transition-colors text-[11px]"
        >
          Admin Portal
        </Link>
      </div>
    </footer>
  );
}
