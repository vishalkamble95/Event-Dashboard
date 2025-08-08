import React, { useState } from "react";
import { getUsers, saveUsers } from "../utils/storage";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/.test(password);
  };

  const handleRegister = () => {
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 6 characters, contain one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    const users = getUsers();
    if (users.find((u) => u.email === email)) {
      setError("Email already registered.");
      return;
    }

    saveUsers([...users, { email, password }]);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#7AE2CF] to-[#077A7D] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-[#06202B] mb-6">
          Create Account
        </h1>

        <div className="space-y-4">
          {error && (
            <div className="text-red-600 bg-red-100 px-4 py-2 rounded text-sm">
              {error}
            </div>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#077A7D] transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#077A7D] transition"
          />

          <button
            onClick={handleRegister}
            className="w-full bg-[#077A7D] hover:bg-[#065f60] text-white py-3 rounded-lg font-semibold transition duration-300"
          >
            Register
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/" className="text-[#077A7D] font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
