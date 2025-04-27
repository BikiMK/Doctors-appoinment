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
        // General physician
        { _id: "1", name: "Dr. Chloe Evans", speciality: "General physician", image: "https://randomuser.me/api/portraits/women/44.jpg" },
        { _id: "2", name: "Dr. John Smith", speciality: "General physician", image: "https://randomuser.me/api/portraits/men/32.jpg" },
        { _id: "3", name: "Dr. Emily Brown", speciality: "General physician", image: "https://randomuser.me/api/portraits/women/68.jpg" },
        { _id: "4", name: "Dr. Michael Lee", speciality: "General physician", image: "https://randomuser.me/api/portraits/men/45.jpg" },
        // Gynecologist
        { _id: "5", name: "Dr. Sarah Davis", speciality: "Gynecologist", image: "https://randomuser.me/api/portraits/women/56.jpg" },
        { _id: "6", name: "Dr. Laura Wilson", speciality: "Gynecologist", image: "https://randomuser.me/api/portraits/women/61.jpg" },
        { _id: "7", name: "Dr. Rachel Green", speciality: "Gynecologist", image: "https://randomuser.me/api/portraits/women/47.jpg" },
        { _id: "8", name: "Dr. Anna Taylor", speciality: "Gynecologist", image: "https://randomuser.me/api/portraits/women/35.jpg" },
        // Dermatologist
        { _id: "9", name: "Dr. James Carter", speciality: "Dermatologist", image: "https://randomuser.me/api/portraits/men/37.jpg" },
        { _id: "10", name: "Dr. Olivia White", speciality: "Dermatologist", image: "https://randomuser.me/api/portraits/women/38.jpg" },
        { _id: "11", name: "Dr. Ethan Black", speciality: "Dermatologist", image: "https://randomuser.me/api/portraits/men/41.jpg" },
        { _id: "12", name: "Dr. Sophia King", speciality: "Dermatologist", image: "https://randomuser.me/api/portraits/women/52.jpg" },
        // Pediatricians
        { _id: "13", name: "Dr. Daniel Scott", speciality: "Pediatricians", image: "https://randomuser.me/api/portraits/men/50.jpg" },
        { _id: "14", name: "Dr. Mia Johnson", speciality: "Pediatricians", image: "https://randomuser.me/api/portraits/women/49.jpg" },
        { _id: "15", name: "Dr. Noah Miller", speciality: "Pediatricians", image: "https://randomuser.me/api/portraits/men/55.jpg" },
        { _id: "16", name: "Dr. Zoe Adams", speciality: "Pediatricians", image: "https://randomuser.me/api/portraits/women/59.jpg" },
        // Neurologist
        { _id: "17", name: "Dr. Liam Turner", speciality: "Neurologist", image: "https://randomuser.me/api/portraits/men/53.jpg" },
        { _id: "18", name: "Dr. Ava Martinez", speciality: "Neurologist", image: "https://randomuser.me/api/portraits/women/57.jpg" },
        { _id: "19", name: "Dr. Lucas Hill", speciality: "Neurologist", image: "https://randomuser.me/api/portraits/men/49.jpg" },
        { _id: "20", name: "Dr. Isabella Clark", speciality: "Neurologist", image: "https://randomuser.me/api/portraits/women/60.jpg" },
        // Gastroenterologist
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
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold text-gray-800">Browse through the doctor specialists.</h1>
      
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Filter Sidebar */}
        <div className="w-full sm:w-1/4">
          <button 
            className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} 
            onClick={() => setShowFilter(prev => !prev)}
          >
            Filters
          </button>
          
          <div className={`flex flex-col gap-4 text-sm text-gray-600 mt-2 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
            {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((spec) => (
              <p 
                key={spec} 
                onClick={() => navigate(`/doctors/${spec}`)}
                className={`w-full pl-3 py-1.5 pr-4 border border-gray-300 rounded transition-all cursor-pointer ${speciality === spec ? 'bg-indigo-100 text-black' : ''}`}
              >
                {spec}
              </p>
            ))}
          </div>
        </div>
        
        {/* Doctors List */}
        <div className="w-full sm:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6">
            {filterDoc.length > 0 ? (
              filterDoc.map((item) => (
                <div 
                  key={item._id} 
                  onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0); }} 
                  className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                >
                  <img className="bg-blue-50 w-full h-40 object-cover" src={item.image} alt={item.name} />
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-center text-green-500">
                      <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                      <p>Available</p>
                    </div>
                    <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                    <p className="text-gray-600 text-sm">{item.speciality}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No doctors available for this category.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
