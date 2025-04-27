import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check initial user session
    const fetchUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Navbar: Error fetching user:", error);
        } else {
          setUser(user);
        }
      } catch (err) {
        console.error("Navbar: Error in fetchUser:", err);
      }
    };

    fetchUser();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    // Cleanup listener
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-20 bg-gradient-to-r from-gray-900 to-blue-950 shadow-lg">
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="pulse-particle pulse-particle-1"></div>
        <div className="pulse-particle pulse-particle-2"></div>
        <div className="pulse-particle pulse-particle-3"></div>
      </div>
      <style jsx>{`
        .pulse-particle {
          position: absolute;
          width: 20px;
          height: 20px;
          background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="rgba(59,130,246,0.4)" viewBox="0 0 24 24"><path d="M12 2v8H4v4h8v8h4v-8h8v-4h-8V2h-4z"/></svg>') no-repeat center;
          background-size: contain;
          animation: pulse 10s infinite ease-in-out;
          opacity: 0.4;
        }

        .pulse-particle-1 {
          left: 10%;
          top: 50%;
          animation-delay: 0s;
        }

        .pulse-particle-2 {
          left: 50%;
          top: 50%;
          animation-delay: 3s;
        }

        .pulse-particle-3 {
          left: 90%;
          top: 50%;
          animation-delay: 6s;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 0.4;
          }
        }

        .logo-text:hover {
          letter-spacing: 0.05em;
          transform: scale(1.05);
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="logo-text text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 transition-all duration-300"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Cure Nexus
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-blue-100 hover:text-blue-300 transition">Home</Link>
            <Link to="/doctors" className="text-blue-100 hover:text-blue-300 transition">Doctors</Link>
            <Link to="/about" className="text-blue-100 hover:text-blue-300 transition">About</Link>
            <Link to="/contact" className="text-blue-100 hover:text-blue-300 transition">Contact</Link>
            {user ? (
              <button
                onClick={() => navigate("/my-account")}
                className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-300"
              >
                My Account
              </button>
            ) : (
              <button
                onClick={() => navigate("/register")}
                className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-300"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;