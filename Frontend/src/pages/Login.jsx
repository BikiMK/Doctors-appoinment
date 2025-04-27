import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "../supabaseClient";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        toast.success("Login successful!");
        navigate("/"); // Redirect to homepage
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Form */}
      <div className="w-1/2 bg-white flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <div className="flex items-center mb-6">
            <svg
              className="w-8 h-8 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">Sign in to your account</h2>
          <p className="text-gray-600 mb-6">Enter your credentials to continue</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-700 text-white p-3 rounded hover:bg-purple-800 transition"
            >
              Sign in
            </button>
            <p className="text-center text-gray-600">
              Don’t have an account?{" "}
              <a href="/register" className="text-purple-600 hover:underline">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="w-1/2 bg-purple-500 flex items-center justify-center p-10">
        <div className="relative">
          <svg
            className="w-full h-auto"
            viewBox="0 0 300 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="50"
              cy="50"
              r="10"
              fill="none"
              stroke="#CBD5E0"
              strokeWidth="2"
            />
            <circle
              cx="150"
              cy="100"
              r="15"
              fill="none"
              stroke="#CBD5E0"
              strokeWidth="2"
            />
            <circle
              cx="250"
              cy="200"
              r="8"
              fill="none"
              stroke="#CBD5E0"
              strokeWidth="2"
            />
            <path
              d="M150 300 A50 50 0 0 1 200 350 A50 50 0 0 1 150 400 A50 50 0 0 1 100 350 A50 50 0 0 1 150 300 Z"
              fill="#4C2E6C"
            />
            <ellipse cx="150" cy="320" rx="30" ry="50" fill="#FFFFFF" />
            <path
              d="M140 280 Q150 260 160 280"
              stroke="#000000"
              strokeWidth="4"
              fill="none"
            />
            <circle cx="150" cy="300" r="10" fill="#000000" />
            <path d="M150 330 L150 370" stroke="#000000" strokeWidth="4" />
            <path d="M140 370 L130 390" stroke="#000000" strokeWidth="4" />
            <path d="M160 370 L170 390" stroke="#000000" strokeWidth="4" />
            <circle
              cx="150"
              cy="340"
              r="20"
              fill="#FFFFFF"
              stroke="#4C2E6C"
              strokeWidth="4"
            />
            <path d="M140 340 L160 340" stroke="#4C2E6C" strokeWidth="4" />
          </svg>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;