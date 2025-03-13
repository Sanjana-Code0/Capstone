import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css"; // Import the updated CSS

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  // Close sidebar when ESC key is pressed
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") closeSidebar();
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <motion.button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="sidebar open"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Sidebar Header */}
            <div className="sidebar-header">
              <h2>🚀 GigNexus</h2>
            </div>

            {/* Profile Section */}
            <div className="profile-section">
              <FaUserCircle size={50} className="profile-icon" />
              <p>Welcome, Guest</p>
            </div>

            {/* Navigation Links */}
            <ul>
              <motion.li whileHover={{ scale: 1.1 }}>
                <a href="/" onClick={closeSidebar}>🏠 Home</a>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <a href="/register" onClick={closeSidebar}>📝 Sign Up</a>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <a href="/login" onClick={closeSidebar}>🔑 Sign In</a>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <a href="/products" onClick={closeSidebar}>📜 Certifications</a>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <a href="/financial-dashboard" onClick={closeSidebar}>💰 Financial Dashboard</a>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <a href="/rate-calculator" onClick={closeSidebar}>💵 Rate Calculator</a>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <a href="/client-management" onClick={closeSidebar}>🤝 Client Management</a>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <a href="/skill-development" onClick={closeSidebar}>📈 Skill Development</a>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <a href="/" onClick={closeSidebar}>🚪 Logout</a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay (Dark Background) */}
      {isOpen && <div className="overlay" onClick={closeSidebar}></div>}
    </>
  );
};

export default Sidebar;
