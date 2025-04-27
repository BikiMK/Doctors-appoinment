import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { toast } from "react-toastify";

function MyProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [currentView, setCurrentView] = useState("profile"); // "profile", "appointments", "settings"
  const [language, setLanguage] = useState("English");
  const navigate = useNavigate();

  // Collection of anime avatar URLs - these are placeholder URLs
  const animeAvatars = [
    "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Felix",
    "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Lily",
    "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Max",
    "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Mia",
    "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Zoe",
    "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Nova",
    "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Leo",
    "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Luna",
    "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Kai",
    "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Aria",
  ];

  // Available languages
  const languages = ["English", "Hindi", "Spanish", "French", "German"];

  const fetchUserAndAppointments = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (user) {
        setUser(user);
        setName(user.user_metadata.name || "");
        setEmail(user.email || "");
        setMobile(user.user_metadata.mobile || "");
        setLocation(user.user_metadata.location || "");
        setLanguage(user.user_metadata.language || "English");

        // Check if user has a saved avatar selection
        if (user.user_metadata.avatar_index !== undefined) {
          setAvatarUrl(animeAvatars[user.user_metadata.avatar_index]);
        } else {
          // Generate a consistent avatar based on user ID
          const avatarIndex = user.id.charCodeAt(0) % animeAvatars.length;
          setAvatarUrl(animeAvatars[avatarIndex]);
        }

        // Fetch appointments
        const { data: appointmentsData, error: appointmentsError } = await supabase
          .from("appointments")
          .select("*")
          .eq("user_id", user.id)
          .eq("status", "scheduled");
        if (appointmentsError) throw appointmentsError;
        setAppointments(appointmentsData || []);
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Error fetching user or appointments:", err);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAndAppointments();
  }, [navigate]);

  const changeAvatar = async () => {
    try {
      const currentIndex = user.user_metadata.avatar_index !== undefined
        ? user.user_metadata.avatar_index
        : user.id.charCodeAt(0) % animeAvatars.length;

      const nextIndex = (currentIndex + 1) % animeAvatars.length;

      const { error } = await supabase.auth.updateUser({
        data: { avatar_index: nextIndex }
      });

      if (error) throw error;

      setAvatarUrl(animeAvatars[nextIndex]);

      toast.success("Avatar changed successfully", {
        position: "top-center",
        autoClose: 1500
      });
    } catch (err) {
      console.error("Error changing avatar:", err);
      toast.error("Failed to change avatar. Please try again.", {
        position: "top-center",
        autoClose: 3000
      });
    }
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: { name, mobile, location, language },
      });
      if (error) throw error;
      toast.success("Credentials Saved Successfully", {
        position: "top-center",
        autoClose: 3000,
        onClose: () => navigate("/"),
      });
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleBookAppointmentsClick = () => {
    if (appointments.length === 0) {
      navigate("/doctors");
    } else {
      setCurrentView("appointments");
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status: "canceled" })
        .eq("id", appointmentId);
      if (error) throw error;
      toast.success("Appointment canceled successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      await fetchUserAndAppointments();
    } catch (err) {
      console.error("Error canceling appointment:", err);
      toast.error("Failed to cancel appointment. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  if (loading) {
    return <div className="pt-20 text-center text-blue-100">Loading...</div>;
  }

  if (!user) {
    return null; // Redirecting to login
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen pt-20 bg-gradient-to-br from-gray-900 to-blue-950">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
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
          left: 15%;
          top: 30%;
          animation-delay: 0s;
        }

        .pulse-particle-2 {
          left: 50%;
          top: 60%;
          animation-delay: 3s;
        }

        .pulse-particle-3 {
          left: 85%;
          top: 20%;
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

        .gradient-text {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          background-image: linear-gradient(to right, #60A5FA, #34D399);
        }

        .avatar-container:hover {
          transform: scale(1.05);
        }
      `}</style>

      <div className="flex w-full max-w-4xl p-6 bg-gray-900/80 backdrop-blur-md rounded-xl shadow-xl">
        {/* Sidebar */}
        <div className="w-1/4 pr-6">
          <div className="flex flex-col items-center mb-6 p-4 bg-gray-800/50 rounded-lg">
            <div className="relative group mb-4 avatar-container transition-transform duration-300">
              <div
                className="w-24 h-24 rounded-full overflow-hidden cursor-pointer border-4 border-gradient-to-r from-blue-500 to-emerald-500 hover:border-blue-600 transition-colors"
                onClick={changeAvatar}
              >
                <img
                  src={avatarUrl}
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
              </div>
              <div className="text-xs text-blue-200 mt-1">Click to change avatar</div>
            </div>
            <p className="font-medium text-xl gradient-text" style={{ fontFamily: "'Poppins', sans-serif" }}>{name || "Your Name"}</p>
            <p className="text-blue-200 text-sm">{email || "yourname@gmail.com"}</p>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => setCurrentView("profile")}
              className={`flex items-center w-full p-2 rounded ${
                currentView === "profile"
                  ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white"
                  : "text-blue-100 hover:bg-gray-700/50"
              } transition-all duration-300`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804l4.075-4.075m0 0A3 3 0 1117.804 5.121m-4.075 4.075a3 3 0 11-4.075-4.075m4.075 4.075l4.075 4.075" />
              </svg>
              My Profile
            </button>
            <button
              onClick={handleBookAppointmentsClick}
              className={`flex items-center w-full p-2 rounded ${
                currentView === "appointments"
                  ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white"
                  : "text-blue-100 hover:bg-gray-700/50"
              } transition-all duration-300`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Appointments
            </button>
            <button
              onClick={() => setCurrentView("settings")}
              className={`flex items-center w-full p-2 rounded ${
                currentView === "settings"
                  ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white"
                  : "text-blue-100 hover:bg-gray-700/50"
              } transition-all duration-300`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
              </svg>
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-2 text-blue-100 hover:bg-gray-700/50 rounded transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-6 bg-gray-800/50 rounded-lg shadow-md">
          {currentView === "appointments" && (
            <div>
              <h2 className="text-2xl font-bold gradient-text mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Your Appointments
              </h2>
              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 bg-gray-700/50 rounded-lg shadow flex justify-between items-center">
                      <div className="text-blue-100">
                        <p><strong>Doctor:</strong> {appointment.doctor_name}</p>
                        <p><strong>Specialty:</strong> {appointment.specialty}</p>
                        <p><strong>Date:</strong> {new Date(appointment.appointment_date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {appointment.slot_time}</p>
                        <p><strong>Status:</strong> {appointment.status}</p>
                      </div>
                      <button
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-blue-200">No scheduled appointments found.</p>
              )}
              <button
                onClick={() => navigate("/doctors")}
                className="mt-4 bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-300"
              >
                Book Another Appointment
              </button>
            </div>
          )}

          {currentView === "profile" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold gradient-text" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {name || "Your Name"}
                  </h2>
                  <p className="text-blue-200">{email || "yourname@gmail.com"}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-blue-100" style={{ fontFamily: "'Poppins', sans-serif" }}>Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 bg-gray-700/50 text-blue-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-blue-100" style={{ fontFamily: "'Poppins', sans-serif" }}>Email account</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={true}
                    className="w-full p-2 bg-gray-700/50 text-blue-100 border border-gray-600 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-blue-100" style={{ fontFamily: "'Poppins', sans-serif" }}>Mobile number</label>
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full p-2 bg-gray-700/50 text-blue-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add your mobile number"
                  />
                </div>
                <div>
                  <label className="block text-blue-100" style={{ fontFamily: "'Poppins', sans-serif" }}>Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2 bg-gray-700/50 text-blue-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your country"
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-300"
                >
                  Save
                </button>
              </div>
            </>
          )}

          {currentView === "settings" && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold gradient-text mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Settings
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-blue-100 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>Language</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full p-2 bg-gray-700/50 text-blue-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {languages.map((lang) => (
                        <option key={lang} value={lang} className="bg-gray-800">
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold gradient-text mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Notification Preferences
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="emailNotif"
                          className="mr-2 accent-blue-500"
                          defaultChecked
                        />
                        <label htmlFor="emailNotif" className="text-blue-100" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          Email notifications
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="smsNotif"
                          className="mr-2 accent-blue-500"
                          defaultChecked
                        />
                        <label htmlFor="smsNotif" className="text-blue-100" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          SMS notifications
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold gradient-text mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Theme
                    </h3>
                    <div className="flex space-x-3">
                      <button className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full border-2 border-white shadow-md hover:scale-110 transition-all duration-300"></button>
                      <button className="w-8 h-8 bg-blue-500 rounded-full hover:scale-110 transition-all duration-300"></button>
                      <button className="w-8 h-8 bg-purple-500 rounded-full hover:scale-110 transition-all duration-300"></button>
                      <button className="w-8 h-8 bg-gray-800 rounded-full hover:scale-110 transition-all duration-300"></button>
                    </div>
                  </div>

                  <button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-300"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;