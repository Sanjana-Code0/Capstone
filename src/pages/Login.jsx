import React, { useState } from "react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import animationData from "../assets/animation1.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(sessionStorage.getItem("user"));

    if (!storedUser) {
      toast.error("No registered user found. Please sign up first.");
      return;
    }

    if (storedUser.username !== username || storedUser.password !== password) {
      toast.error("Oops! Invalid credentials. Try again.");
      return;
    }

    sessionStorage.setItem("loggedInUser", JSON.stringify(storedUser));
    toast.success("🎉 Login Successful! Redirecting...");
    
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  // Lottie Animation Config
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="login-container">
      <Navbar />
      <div className="login-content">
        <div className="form-container">
          <h2>Welcome Back! 👋</h2>
          <p className="subtext">Log in to access your dashboard</p>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>

          <p className="register-text">
            New here? <a href="/register">Create an account</a>
          </p>
        </div>

        <div className="image-container">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

      {/* Styles */}
      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #ece9e6, #ffffff);
        }

        .login-content {
          display: flex;
          justify-content: space-between;
          width: 80%;
          max-width: 1000px;
        }

        .form-container {
          flex: 1;
          padding: 30px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .form-container h2 {
          font-size: 2rem;
          color: #333;
        }

        .subtext {
          color: #666;
          font-size: 1rem;
          margin-bottom: 20px;
        }

        .form-container input {
          width: 100%;
          padding: 12px;
          margin: 12px 0;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }

        .form-container button {
          width: 100%;
          padding: 12px;
          background: #6200ea;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
          transition: 0.3s ease-in-out;
        }

        .form-container button:hover {
          background: #3700b3;
        }

        .register-text {
          margin-top: 15px;
          font-size: 0.9rem;
          color: #555;
        }

        .register-text a {
          color: #6200ea;
          text-decoration: none;
          font-weight: bold;
        }

        .image-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default Login;
