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
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Make "Cure Nexus" clickable to redirect to homepage */}
            <Link to="/" className="text-2xl font-bold text-purple-700 hover:text-purple-600">
              Cure Nexus
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-purple-700">Home</Link>
            <Link to="/doctors" className="text-gray-700 hover:text-purple-700">Doctors</Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-700">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-purple-700">Contact</Link>
            {user ? (
              <button
                onClick={() => navigate("/my-account")}
                className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
              >
                My Account
              </button>
            ) : (
              <button
                onClick={() => navigate("/register")}
                className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
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