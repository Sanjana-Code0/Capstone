import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Lottie from "react-lottie";
import animationData from "../assets/animation1.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form Validation before Submission
  const validateForm = () => {
    const { name, phone, email, password, confirmPassword } = formData;

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("📞 Invalid phone number! Must be 10 digits.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("📩 Invalid email format!");
      return false;
    }

    if (password.length < 6) {
      toast.error("🔑 Password must be at least 6 characters long!");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("🚫 Passwords do not match!");
      return false;
    }

    if (!name.trim()) {
      toast.error("❗ Name cannot be empty!");
      return false;
    }

    return true;
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      sessionStorage.setItem("user", JSON.stringify(formData));
      toast.success("🎉 Registration Successful! Redirecting to login...");
      setLoading(false);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }, 1500);
  };

  // Lottie Animation Options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="register-container">
      <Navbar />
      <div className="register-content">
        <div className="form-container">
          <h2>Join Us 🚀</h2>
          <p className="subtext">Create an account to get started</p>

          <form onSubmit={handleSubmit}>
            {Object.keys(formData).map((field) => (
              <input
                key={field}
                type={field.includes("password") ? "password" : field === "dob" ? "date" : "text"}
                name={field}
                placeholder={field.replace(/([A-Z])/g, " $1").trim()} // Format placeholders nicely
                value={formData[field]}
                onChange={handleChange}
                required
              />
            ))}

            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="login-link">
              Already have an account? <a href="/login">Log in here</a>
            </p>
          </form>
        </div>

        <div className="image-container">
          <Lottie options={defaultOptions} height={320} width={320} />
        </div>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

      {/* Styles */}
      <style jsx>{`
        .register-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #ece9e6, #ffffff);
        }

        .register-content {
          display: flex;
          justify-content: space-between;
          width: 85%;
          max-width: 1100px;
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
          transition: all 0.3s ease-in-out;
        }

        .form-container input:focus {
          border-color: #6200ea;
          box-shadow: 0 0 5px rgba(98, 0, 234, 0.3);
          outline: none;
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

        .form-container button:disabled {
          background: #b39ddb;
          cursor: not-allowed;
        }

        .login-link {
          margin-top: 15px;
          font-size: 0.9rem;
          color: #555;
        }

        .login-link a {
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

export default Register;
