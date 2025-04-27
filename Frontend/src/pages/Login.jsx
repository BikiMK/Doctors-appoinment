import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "../supabaseClient";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Login submit:", { email, password });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      if (data.user) {
        toast.success("Login successful!", {
          position: "top-center",
        });
        
        // Navigate to home page
        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.message || "Login failed. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const goToRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-purple-900 via-indigo-900 to-indigo-700">
      {/* Left side - illustration */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute w-96 h-96 -top-20 -left-20 bg-indigo-500/20 rounded-full blur-3xl"></div>
          <div className="absolute w-96 h-96 bottom-10 right-10 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute w-32 h-32 top-1/4 left-1/4 bg-pink-500/30 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">Welcome Back!</h2>
            <p className="text-indigo-200 text-lg mb-6">Great to see you again. Log in to access your account.</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 p-8 rounded-2xl backdrop-blur-sm border border-white/10 shadow-xl">
            <svg
              className="w-full h-auto"
              viewBox="0 0 300 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Abstract elements */}
              <circle cx="150" cy="150" r="100" stroke="white" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="10 5" />
              <circle cx="150" cy="150" r="70" stroke="white" strokeOpacity="0.3" strokeWidth="2" />
              <circle cx="150" cy="150" r="40" fill="#fff" fillOpacity="0.1" />
              
              {/* Lock illustration */}
              <rect x="125" y="130" width="50" height="60" rx="8" fill="#7c3aed" />
              <rect x="135" y="110" width="30" height="40" rx="15" stroke="white" strokeWidth="4" fill="none" />
              <circle cx="150" cy="150" r="8" fill="white" />
              <line x1="150" y1="150" x2="150" y2="165" stroke="white" strokeWidth="4" />
              
              {/* Decorative icons */}
              <circle cx="80" cy="70" r="10" fill="#f472b6" fillOpacity="0.6" />
              <circle cx="220" cy="70" r="15" fill="#7c3aed" fillOpacity="0.6" />
              <circle cx="70" cy="200" r="12" fill="#7c3aed" fillOpacity="0.6" />
              <circle cx="230" cy="200" r="8" fill="#f472b6" fillOpacity="0.6" />
              
              {/* Connection lines */}
              <path d="M150 100 L80 70" stroke="white" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="4 2" />
              <path d="M150 100 L220 70" stroke="white" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="4 2" />
              <path d="M110 180 L70 200" stroke="white" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="4 2" />
              <path d="M190 180 L230 200" stroke="white" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="4 2" />
            </svg>
          </div>
          
          <div className="mt-8 flex justify-center space-x-4">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm flex flex-col items-center">
              <div className="text-3xl font-bold text-white mb-1">Fast</div>
              <div className="text-sm text-indigo-200">Access</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm flex flex-col items-center">
              <div className="text-3xl font-bold text-white mb-1">Secure</div>
              <div className="text-sm text-indigo-200">Protection</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm flex flex-col items-center">
              <div className="text-3xl font-bold text-white mb-1">Easy</div>
              <div className="text-sm text-indigo-200">Login</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-10 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            {/* Logo */}
            <div className="inline-flex justify-center items-center mb-4 bg-gradient-to-r from-purple-500 to-indigo-600 p-3 rounded-xl shadow-lg">
              <svg
                className="w-10 h-10 text-white"
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
            <h2 className="text-3xl font-extrabold text-white mb-2">Sign in to Your Account</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full mb-4"></div>
            <p className="text-indigo-200">Enter your credentials to continue</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="pl-10 w-full p-4 bg-white/5 text-white border border-indigo-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-indigo-300"
                  required
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 w-full p-4 bg-white/5 text-white border border-indigo-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-indigo-300"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-indigo-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-indigo-200">
                  Remember me
                </label>
              </div>
              
              <a href="#" className="text-sm font-medium text-purple-400 hover:text-purple-300">
                Forgot password?
              </a>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-lg font-bold hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex justify-center items-center overflow-hidden group"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full opacity-10 group-hover:w-full group-hover:h-56"></span>
              <span className="relative">
                {isLoading ? "Signing In..." : "Sign In"}
              </span>
            </button>

            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-indigo-300/30"></div>
              <p className="px-3 text-sm text-indigo-200">OR</p>
              <div className="flex-1 h-px bg-indigo-300/30"></div>
            </div>

            <div className="space-y-3">
              <button type="button" className="w-full bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg flex items-center justify-center border border-white/20 transition-all duration-300">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <button type="button" className="w-full bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg flex items-center justify-center border border-white/20 transition-all duration-300">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0014.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"/>
                </svg>
                Continue with Facebook
              </button>
            </div>

            <p className="text-center text-indigo-200 mt-6">
              Don't have an account?{" "}
              <a 
                href="/register" 
                className="text-purple-400 hover:text-purple-300 font-medium hover:underline transition-all duration-300"
                onClick={goToRegister}
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;