import React, { useState, useEffect } from "react";
import { NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, LogOut, User } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  
  // ✅ Auth0 hooks
  const { 
    isAuthenticated: auth0Authenticated,
    user: auth0User,
    logout: auth0Logout,
    isLoading: auth0Loading 
  } = useAuth0();
  
  // ✅ Check for backend token (email/password login)
  const [backendToken, setBackendToken] = useState(null);
  
  const navigate = useNavigate();

  // ✅ Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Check backend token on mount and listen for storage changes
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setBackendToken(token);
    };
    
    checkToken();
    
    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkToken);
    
    return () => window.removeEventListener('storage', checkToken);
  }, []);

  // ✅ Body scroll lock for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMenuOpen]);

  // ✅ COMBINED LOGIC: Check if user is logged in (Auth0 OR Backend)
  const isLoggedIn = auth0Authenticated || !!backendToken;
  const userProfile = auth0User || null;

  // ✅ Handle logout (works for BOTH Auth0 and Backend)
  const handleLogout = () => {
    toast.success('Logged out successfully!', {
      duration: 2000,
      style: {
        background: '#10b981',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '16px',
        padding: '16px 24px',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#10b981',
      },
    });
    
    setTimeout(() => {
      // Clear backend token
      localStorage.removeItem("token");
      setBackendToken(null);
      
      // Logout from Auth0 if logged in via Auth0
      if (auth0Authenticated) {
        auth0Logout({ 
          logoutParams: { 
            returnTo: window.location.origin 
          } 
        });
      } else {
        // If backend login, just redirect
        navigate("/auth");
        window.location.reload();
      }
    }, 1000);
  };

  const handleNavClick = (to) => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/projects", label: "Projects" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <Toaster position="top-center" />

      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4">
          <RouterNavLink to="/" className="text-2xl font-bold text-gray-900 flex-shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-orange-500">Con</span>struct
          </RouterNavLink>

          <div className="hidden lg:flex items-center px-3 py-2 rounded-lg border border-gray-300 bg-white w-64 group hover:border-orange-500 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all duration-200">
            <Search className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder:text-gray-400"
            />
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <RouterNavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `text-gray-600 hover:text-orange-500 font-medium transition-colors duration-300 relative group ${
                      isActive ? 'text-orange-500' : ''
                    }`
                  }
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full" />
                </RouterNavLink>
              </motion.div>
            ))}

            {/* ✅ FIXED: Conditional Auth Buttons */}
            <AnimatePresence mode="wait">
              {!auth0Loading && (
                <>
                  {isLoggedIn ? (
                    <motion.div
                      key="logout"
                      initial={{ opacity: 0, scale: 0.8, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="ml-4 flex items-center gap-3"
                    >
                      {/* Show profile picture only if Auth0 user */}
                      {userProfile?.picture && (
                        <motion.img 
                          src={userProfile.picture} 
                          alt={userProfile.name || 'User'}
                          className="w-9 h-9 rounded-full border-2 border-orange-500 object-cover"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        />
                      )}
                      
                      <motion.button
                        onClick={handleLogout}
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(239, 68, 68, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md flex items-center gap-2"
                      >
                        <LogOut size={16} />
                        Logout
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="auth-buttons"
                      initial={{ opacity: 0, scale: 0.8, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3 ml-4"
                    >
                      <RouterNavLink to="/auth?mode=login">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-2 rounded-full border-2 border-orange-500 text-orange-500 font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-orange-200"
                        >
                          Login
                        </motion.button>
                      </RouterNavLink>

                      <RouterNavLink to="/auth?mode=register">
                        <motion.button
                          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 107, 53, 0.4)" }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all duration-300 shadow-md"
                        >
                          Register
                        </motion.button>
                      </RouterNavLink>
                    </motion.div>
                  )}
                </>
              )}
            </AnimatePresence>
          </div>

          {/* MOBILE MENU BUTTON */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-2xl text-gray-700 p-2"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </motion.button>
        </div>

        {/* MOBILE OVERLAY */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-72 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto overscroll-contain touch-pan-y"
            >
              <div className="relative w-full min-h-screen bg-white">
                <div className="flex flex-col p-6 pt-20">
                  <div className="flex items-center px-3 py-2 rounded-lg border border-gray-300 bg-white mb-6 w-full hover:border-orange-500 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
                    <Search className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder:text-gray-400"
                    />
                  </div>

                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <RouterNavLink
                        to={link.to}
                        className={({ isActive }) =>
                          `block py-3 text-gray-700 hover:text-orange-500 font-medium border-b border-gray-100 transition-colors ${
                            isActive ? 'text-orange-500' : ''
                          }`
                        }
                        onClick={() => handleNavClick(link.to)}
                      >
                        {link.label}
                      </RouterNavLink>
                    </motion.div>
                  ))}

                  {/* MOBILE AUTH BUTTONS */}
                  <AnimatePresence mode="wait">
                    {!auth0Loading && (
                      <>
                        {isLoggedIn ? (
                          <motion.div
                            key="mobile-logout"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mt-6"
                          >
                            {userProfile && (
                              <motion.div 
                                className="flex items-center gap-3 mb-4 p-3 bg-orange-50 rounded-lg"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                              >
                                {userProfile.picture && (
                                  <img 
                                    src={userProfile.picture} 
                                    alt={userProfile.name || 'User'}
                                    className="w-12 h-12 rounded-full border-2 border-orange-500 object-cover"
                                  />
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-gray-900 truncate">
                                    {userProfile.name || 'User'}
                                  </p>
                                  <p className="text-sm text-gray-600 truncate">
                                    {userProfile.email}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                            
                            <motion.button
                              onClick={() => {
                                handleLogout();
                                setIsMenuOpen(false);
                              }}
                              whileTap={{ scale: 0.95 }}
                              className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                              <LogOut size={18} />
                              Logout
                            </motion.button>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="mobile-auth"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex flex-col gap-3 mt-6"
                          >
                            <RouterNavLink to="/auth?mode=login" onClick={() => handleNavClick('/auth?mode=login')}>
                              <motion.button
                                whileTap={{ scale: 0.95 }}
                                className="w-full px-6 py-3 rounded-full border-2 border-orange-500 text-orange-500 font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300"
                              >
                                Login
                              </motion.button>
                            </RouterNavLink>

                            <RouterNavLink to="/auth?mode=register" onClick={() => handleNavClick('/auth?mode=register')}>
                              <motion.button
                                whileTap={{ scale: 0.95 }}
                                className="w-full px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all duration-300"
                              >
                                Register
                              </motion.button>
                            </RouterNavLink>
                          </motion.div>
                        )}
                      </>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-6 right-6 text-gray-700 p-2"
                >
                  <X size={24} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
