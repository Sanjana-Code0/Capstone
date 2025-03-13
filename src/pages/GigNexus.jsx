import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../assets/splashAnimation.json"; // Lottie animation
import backgroundVideo from "../assets/background.mp4"; // Video background

const GigNexusPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setLoading(false), 5000); // Simulates a splash screen delay
  }, []);

  // Lottie Animation Config
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (loading) {
    return (
      <div style={splashScreenStyle}>
        <div style={splashContentStyle}>
          <Lottie options={defaultOptions} height={500} width={500} />
          <h1 style={splashTextStyle}>GigNexus</h1>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Background Video */}
      <video autoPlay loop muted style={videoStyle}>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div style={contentOverlayStyle}>
        <button style={loginButtonStyle} onClick={() => navigate("/login")}>
          Dashboard
        </button>

        <h1 style={titleStyle}>GigNexus</h1>
        <p style={descriptionStyle}>
          Empowering gig workers with financial literacy, resources, and tools to
          manage their income effectively.
        </p>

        <div style={testimonialsContainer}>
          <div style={testimonialBox}>
            <p>"GigNexus helped me track my earnings seamlessly!"</p>
            <span>- Alex, Freelancer</span>
          </div>
          <div style={testimonialBox}>
            <p>"A must-have platform for every gig worker!"</p>
            <span>- Priya, Ride-Share Driver</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Splash Screen Style
const splashScreenStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(135deg, #2C3E50, #3498DB)",
  color: "white",
};

const splashContentStyle = {
  textAlign: "center",
};

const splashTextStyle = {
  fontSize: "3.5rem",
  fontFamily: "'Dancing Script', cursive",
  fontWeight: "bold",
  color: "#F8F9FA",
};

// Main Container
const containerStyle = {
  position: "relative",
  width: "100%",
  height: "100vh",
  overflow: "hidden",
};

// Background Video
const videoStyle = {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: "-1",
};

// Content Overlay (Ensures readability over video)
const contentOverlayStyle = {
  position: "relative",
  zIndex: "1",
  textAlign: "center",
  padding: "50px",
  color: "white",
  background: "rgba(0, 0, 0, 0.5)", // Dark overlay for readability
  minHeight: "100vh",
};

// Login Button
const loginButtonStyle = {
  position: "absolute",
  top: "20px",
  right: "30px",
  padding: "12px 24px",
  fontSize: "18px",
  background: "linear-gradient(90deg, #3498DB, #2980B9)",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "10px",
  fontWeight: "bold",
  transition: "0.3s",
};

loginButtonStyle[":hover"] = {
  background: "linear-gradient(90deg, #2980B9, #1A5276)",
};

// Title
const titleStyle = {
  fontSize: "4rem",
  fontFamily: "'Dancing Script', cursive",
  fontWeight: "bold",
  marginTop: "50px",
};

// Description
const descriptionStyle = {
  fontSize: "20px",
  maxWidth: "700px",
  margin: "20px auto",
  fontWeight: "500",
};

// Testimonials
const testimonialsContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginTop: "40px",
};

const testimonialBox = {
  padding: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.8)", // Light background for contrast
  borderRadius: "15px",
  width: "280px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  textAlign: "center",
  fontStyle: "italic",
  fontWeight: "500",
  borderLeft: "5px solid #3498DB",
};

export default GigNexusPage;
