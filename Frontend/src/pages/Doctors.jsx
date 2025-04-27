import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  useEffect(() => {
    if (!doctors || doctors.length === 0) {
      const mockDoctors = [
        { _id: "1", name: "Dr. Chloe Evans", speciality: "General physician", image: "https://randomuser.me/api/portraits/women/44.jpg" },
        { _id: "2", name: "Dr. John Smith", speciality: "General physician", image: "https://randomuser.me/api/portraits/men/32.jpg" },
        { _id: "3", name: "Dr. Emily Brown", speciality: "General physician", image: "https://randomuser.me/api/portraits/women/68.jpg" },
        { _id: "4", name: "Dr. Michael Lee", speciality: "General physician", image: "https://randomuser.me/api/portraits/men/45.jpg" },
        { _id: "5", name: "Dr. Sarah Davis", speciality: "Gynecologist", image: "https://randomuser.me/api/portraits/women/56.jpg" },
        { _id: "6", name: "Dr. Laura Wilson", speciality: "Gynecologist", image: "https://randomuser.me/api/portraits/women/61.jpg" },
        { _id: "7", name: "Dr. Rachel Green", speciality: "Gynecologist", image: "https://randomuser.me/api/portraits/women/47.jpg" },
        { _id: "8", name: "Dr. Anna Taylor", speciality: "Gynecologist", image: "https://randomuser.me/api/portraits/women/35.jpg" },
        { _id: "9", name: "Dr. James Carter", speciality: "Dermatologist", image: "https://randomuser.me/api/portraits/men/37.jpg" },
        { _id: "10", name: "Dr. Olivia White", speciality: "Dermatologist", image: "https://randomuser.me/api/portraits/women/38.jpg" },
        { _id: "11", name: "Dr. Ethan Black", speciality: "Dermatologist", image: "https://randomuser.me/api/portraits/men/41.jpg" },
        { _id: "12", name: "Dr. Sophia King", speciality: "Dermatologist", image: "https://randomuser.me/api/portraits/women/52.jpg" },
        { _id: "13", name: "Dr. Daniel Scott", speciality: "Pediatricians", image: "https://randomuser.me/api/portraits/men/50.jpg" },
        { _id: "14", name: "Dr. Mia Johnson", speciality: "Pediatricians", image: "https://randomuser.me/api/portraits/women/49.jpg" },
        { _id: "15", name: "Dr. Noah Miller", speciality: "Pediatricians", image: "https://randomuser.me/api/portraits/men/55.jpg" },
        { _id: "16", name: "Dr. Zoe Adams", speciality: "Pediatricians", image: "https://randomuser.me/api/portraits/women/59.jpg" },
        { _id: "17", name: "Dr. Liam Turner", speciality: "Neurologist", image: "https://randomuser.me/api/portraits/men/53.jpg" },
        { _id: "18", name: "Dr. Ava Martinez", speciality: "Neurologist", image: "https://randomuser.me/api/portraits/women/57.jpg" },
        { _id: "19", name: "Dr. Lucas Hill", speciality: "Neurologist", image: "https://randomuser.me/api/portraits/men/49.jpg" },
        { _id: "20", name: "Dr. Isabella Clark", speciality: "Neurologist", image: "https://randomuser.me/api/portraits/women/60.jpg" },
        { _id: "21", name: "Dr. Henry Wright", speciality: "Gastroenterologist", image: "https://randomuser.me/api/portraits/men/42.jpg" },
        { _id: "22", name: "Dr. Ella Lopez", speciality: "Gastroenterologist", image: "https://randomuser.me/api/portraits/women/42.jpg" },
        { _id: "23", name: "Dr. Mason Perez", speciality: "Gastroenterologist", image: "https://randomuser.me/api/portraits/men/43.jpg" },
        { _id: "24", name: "Dr. Lily Young", speciality: "Gastroenterologist", image: "https://randomuser.me/api/portraits/women/41.jpg" },
      ];
      setFilterDoc(mockDoctors.filter(doc => !speciality || doc.speciality === speciality));
      return;
    }

    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  return (
    <div className="relative min-h-screen pt-20 bg-gradient-to-br from-gray-900 to-blue-950">
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

        .doctor-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      <div className="container mx-auto px-4 py-12">
        <h1
          className="text-3xl md:text-4xl font-bold gradient-text mb-8 text-center"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Find Your Specialist
        </h1>

        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Filter Sidebar */}
          <div className="w-full lg:w-1/4 bg-gray-900/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <button
              className={`w-full py-2 px-4 rounded-lg text-sm font-medium text-white transition-all lg:hidden ${
                showFilter
                  ? "bg-gradient-to-r from-blue-500 to-emerald-500"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={() => setShowFilter((prev) => !prev)}
            >
              {showFilter ? "Hide Filters" : "Show Filters"}
            </button>

            <div
              className={`flex flex-col gap-3 mt-4 text-sm ${
                showFilter ? "flex" : "hidden lg:flex"
              }`}
            >
              {[
                "General physician",
                "Gynecologist",
                "Dermatologist",
                "Pediatricians",
                "Neurologist",
                "Gastroenterologist",
              ].map((spec) => (
                <p
                  key={spec}
                  onClick={() => navigate(`/doctors/${spec}`)}
                  className={`py-2 px-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    speciality === spec
                      ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white"
                      : "text-blue-100 hover:bg-gray-700/50"
                  }`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {spec}
                </p>
              ))}
            </div>
          </div>

          {/* Doctors List */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterDoc.length > 0 ? (
                filterDoc.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      navigate(`/appointment/${item._id}`);
                      window.scrollTo(0, 0);
                    }}
                    className="doctor-card bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border border-gray-700 hover:border-gradient-to-r hover:from-blue-500 hover:to-emerald-500"
                  >
                    <div className="relative">
                      <img
                        className="w-full h-48 object-cover"
                        src={item.image}
                        alt={item.name}
                      />
                      <div className="absolute top-4 left-4 flex items-center gap-2 text-xs text-white bg-green-500/80 rounded-full px-2 py-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span>Available</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p
                        className="text-lg font-semibold gradient-text"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="text-blue-200 text-sm mt-1"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {item.speciality}
                      </p>
                      <button
                        className="mt-4 w-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-2 rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-300"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-blue-200 text-center col-span-full">
                  No doctors available for this category.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;