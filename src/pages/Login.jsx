import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("No user found. Please sign up first.");
      return;
    }

    if (
      storedUser.email === email.trim() &&
      storedUser.password === password.trim()
    ) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-800 to-purple-700 p-6">
      <div className="bg-white bg-opacity-20 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-md text-black animate-fadeIn">
        <h2 className="text-4xl font-bold mb-6 text-center">🔐 Login</h2>

        {error && (
          <div className="mb-4 text-red-300 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-semibold">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-black text-white bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-black bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-pink-500 hover:bg-pink-600 rounded-lg font-bold text-black transition duration-300 transform hover:scale-105 shadow-md"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="underline cursor-pointer text-pink-300 hover:text-pink-100"
          >
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
