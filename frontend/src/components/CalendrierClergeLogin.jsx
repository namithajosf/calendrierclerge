import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CalendrierClergeLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // Can be used later for "refresh token"
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // New: for error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login/",
        {
          email,
          password,
        },
        {
          withCredentials: true, // Required for cookies
        }
      );

      console.log("Login success:", response.data);
      navigate("/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.error || "Login failed. Please try again.";
      setError(message);
      console.error("Login error:", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative">
      {/* Background Stained Glass */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 w-1/2 h-full">
          <img
            src="/stained-glass.jpg"
            alt="Stained Glass Window"
            className="w-full h-full object-cover blur-sm opacity-60"
          />
        </div>
      </div>

      <div className="flex w-full max-w-6xl mx-auto relative z-10">
        {/* Left side (optional image/illustration) */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative" />

        {/* Right - Login Form */}
        <div className="relative w-full max-w-md ml-auto">
          <div className="bg-white text-black rounded-2xl p-8 w-full">
            {/* Logo */}
            <div className="flex items-center justify-center p-6">
              <img src="/logo.svg" alt="Calendrier Clergé Logo" className="h-20" />
            </div>

            {/* Heading */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Let's get you signed in
              </h2>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
