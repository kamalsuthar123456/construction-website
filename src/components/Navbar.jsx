import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { scrollToSection } from "../utils/scrollToSection";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const navItems = ["Home", "About", "Services", "Projects", "Pages", "Contact"];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >

      {/* MAIN TOP NAV */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3">

        {/* LOGO + SEARCH */}
        <div className="flex items-center gap-3 flex-1">

          {/* LOGO */}
          <div className="text-xl sm:text-2xl font-bold whitespace-nowrap text-gray-900">
            <span className="text-primary">Con</span>struct
          </div>

          {/* SEARCH — only visible on lg and bigger */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="hidden lg:flex items-center px-4 py-1.5 rounded-full border-2 border-orange-500 bg-white max-w-md flex-grow"
          >
            <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="bg-transparent outline-none text-sm w-full pl-2 text-black placeholder-gray-500"
            />
          </motion.div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* DESKTOP NAV MENU */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-gray-700 hover:text-primary transition-all font-medium"
              >
                {item}
              </button>
            ))}
          </div>

          {/* GET STARTED DESKTOP */}
          <button className="hidden lg:block bg-primary text-white px-5 py-2 rounded-full hover:bg-orange-600 transition-all hover:shadow-md">
            Get Started
          </button>

          {/* HAMBURGER BTN — shows on md & below */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-800"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="lg:hidden bg-white shadow-md px-5 pb-4 pt-3 space-y-3"
        >

          {/* SEARCH MOBILE */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-orange-500 bg-gray-50">
            <svg
              className="w-5 h-5 text-orange-500 flex-shrink-0 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="bg-transparent outline-none w-full text-black placeholder-gray-500 tracking-wide"
            />
          </div>

          {/* MENU LINKS */}
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="block py-2 w-full text-left text-gray-800 hover:text-primary text-lg"
            >
              {item}
            </button>
          ))}

          {/* START BUTTON — MOBILE */}
          <button className="w-full bg-primary text-white py-3 rounded-full text-lg">
            Get Started
          </button>

        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
