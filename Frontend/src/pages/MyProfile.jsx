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
  const navigate = useNavigate();

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
        // Generate avatar initials
        const initials = user.user_metadata.name
          ? user.user_metadata.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)
          : "NN";
        setAvatarUrl(`https://via.placeholder.com/50/${initialsBg(initials)}/ffffff?text=${initials}`);

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

  // Generate a random background color for initials avatar
  const initialsBg = (initials) => {
    const colors = ["FF6B6B", "4ECDC4", "45B7D1", "96CEB4", "FFEEAD"];
    const index = initials.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: { name, mobile, location },
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
      setShowAppointments(true);
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
    <div className="flex items-center justify-center min-h-screen bg-teal-600 pt-20">
      <div className="flex w-full max-w-4xl p-6 bg-white rounded-xl shadow-lg">
        {/* Sidebar */}
        <div className="w-1/4 pr-6">
          <div className="flex items-center mb-6 p-4 bg-gray-100 rounded-lg">
            <img
              src={avatarUrl}
              alt="User avatar"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="font-medium">{name || "Your name"}</p>
              <p className="text-gray-600 text-sm">{email || "yourname@gmail.com"}</p>
            </div>
          </div>
          <div className="space-y-2">
            <button
              className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-200 rounded"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804l4.075-4.075m0 0A3 3 0 1117.804 5.121m-4.075 4.075a3 3 0 11-4.075-4.075m4.075 4.075l4.075 4.075" />
              </svg>
              My Profile
            </button>
            <button
              onClick={handleBookAppointmentsClick}
              className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-200 rounded"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Appointments
            </button>
            <button
              className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-200 rounded"
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
          {showAppointments ? (
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
          ) : (
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
        </div>
      </div>
    </div>
  );
}

export default MyProfile;