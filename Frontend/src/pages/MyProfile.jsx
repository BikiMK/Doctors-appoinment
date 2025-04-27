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
  const [showAppointments, setShowAppointments] = useState(false);
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
      // Get current avatar index or default to 0
      const currentIndex = user.user_metadata.avatar_index !== undefined 
        ? user.user_metadata.avatar_index 
        : user.id.charCodeAt(0) % animeAvatars.length;
      
      // Select next avatar (circular)
      const nextIndex = (currentIndex + 1) % animeAvatars.length;
      
      // Update user metadata with new avatar index
      const { error } = await supabase.auth.updateUser({
        data: { avatar_index: nextIndex }
      });
      
      if (error) throw error;
      
      // Update avatar in UI
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
      // Refresh appointments
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
    return <div className="pt-20 text-center">Loading...</div>;
  }

  if (!user) {
    return null; // Redirecting to login
  }

  return (
    <div 
      className="flex items-center justify-center min-h-screen pt-20" 
      style={{ 
        backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/023/460/068/non_2x/medical-doctor-background-illustration-ai-generative-free-photo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="flex w-full max-w-4xl p-6 bg-white rounded-xl shadow-lg">
        {/* Sidebar */}
        <div className="w-1/4 pr-6">
          <div className="flex flex-col items-center mb-6 p-4 bg-gray-100 rounded-lg">
            <div className="relative group mb-4">
              <div 
                className="w-24 h-24 rounded-full overflow-hidden cursor-pointer border-4 border-teal-400 hover:border-teal-600 transition-colors"
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
              <div className="text-xs text-center text-gray-500 mt-1">Click to change avatar</div>
            </div>
            <p className="font-medium">{name || "Your name"}</p>
            <p className="text-gray-600 text-sm">{email || "yourname@gmail.com"}</p>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => setCurrentView("profile")}
              className={`flex items-center w-full p-2 rounded ${
                currentView === "profile" 
                  ? "bg-blue-500 text-white" 
                  : "text-gray-700 hover:bg-gray-200"
              }`}
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
                  ? "bg-blue-500 text-white" 
                  : "text-gray-700 hover:bg-gray-200"
              }`}
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
                  ? "bg-blue-500 text-white" 
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
              </svg>
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-200 rounded"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-6 bg-white rounded-lg shadow-md">
          {currentView === "appointments" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Your Appointments</h2>
              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 bg-gray-100 rounded-lg shadow flex justify-between items-center">
                      <div>
                        <p><strong>Doctor:</strong> {appointment.doctor_name}</p>
                        <p><strong>Specialty:</strong> {appointment.specialty}</p>
                        <p><strong>Date:</strong> {new Date(appointment.appointment_date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {appointment.slot_time}</p>
                        <p><strong>Status:</strong> {appointment.status}</p>
                      </div>
                      <button
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No scheduled appointments found.</p>
              )}
              <button
                onClick={() => navigate("/doctors")}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Book Another Appointment
              </button>
            </div>
          )}

          {currentView === "profile" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{name || "Your name"}</h2>
                  <p className="text-gray-600">{email || "yourname@gmail.com"}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email account</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={true}
                    className="w-full p-2 border rounded bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Mobile number</label>
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Add your mobile number"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter your country"
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </>
          )}

          {currentView === "settings" && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Language</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Notification Preferences</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="emailNotif"
                          className="mr-2"
                          defaultChecked
                        />
                        <label htmlFor="emailNotif">Email notifications</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="smsNotif"
                          className="mr-2"
                          defaultChecked
                        />
                        <label htmlFor="smsNotif">SMS notifications</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Theme</h3>
                    <div className="flex space-x-3">
                      <button className="w-8 h-8 bg-teal-500 rounded-full border-2 border-white shadow-md"></button>
                      <button className="w-8 h-8 bg-blue-500 rounded-full"></button>
                      <button className="w-8 h-8 bg-purple-500 rounded-full"></button>
                      <button className="w-8 h-8 bg-gray-800 rounded-full"></button>
                    </div>
                  </div>

                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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