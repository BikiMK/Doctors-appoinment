import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  // Log doctors data for debugging
  console.log("Doctors from context:", doctors);

  useEffect(() => {
    // Check if doctors data is available
    if (!doctors || doctors.length === 0) {
      console.warn("Doctors data is empty or not loaded.");
      // Mock data for testing with 4 doctors per specialty
      const mockDoctors = [
        // General physician
        { _id: "1", name: "Dr. Chloe Evans", speciality: "General physician", image: "https://via.placeholder.com/150?text=Dr.+Chloe" },
        { _id: "2", name: "Dr. John Smith", speciality: "General physician", image: "https://via.placeholder.com/150?text=Dr.+John" },
        { _id: "3", name: "Dr. Emily Brown", speciality: "General physician", image: "https://via.placeholder.com/150?text=Dr.+Emily" },
        { _id: "4", name: "Dr. Michael Lee", speciality: "General physician", image: "https://via.placeholder.com/150?text=Dr.+Michael" },
        // Gynecologist
        { _id: "5", name: "Dr. Sarah Davis", speciality: "Gynecologist", image: "https://via.placeholder.com/150?text=Dr.+Sarah" },
        { _id: "6", name: "Dr. Laura Wilson", speciality: "Gynecologist", image: "https://via.placeholder.com/150?text=Dr.+Laura" },
        { _id: "7", name: "Dr. Rachel Green", speciality: "Gynecologist", image: "https://via.placeholder.com/150?text=Dr.+Rachel" },
        { _id: "8", name: "Dr. Anna Taylor", speciality: "Gynecologist", image: "https://via.placeholder.com/150?text=Dr.+Anna" },
        // Dermatologist
        { _id: "9", name: "Dr. James Carter", speciality: "Dermatologist", image: "https://via.placeholder.com/150?text=Dr.+James" },
        { _id: "10", name: "Dr. Olivia White", speciality: "Dermatologist", image: "https://via.placeholder.com/150?text=Dr.+Olivia" },
        { _id: "11", name: "Dr. Ethan Black", speciality: "Dermatologist", image: "https://via.placeholder.com/150?text=Dr.+Ethan" },
        { _id: "12", name: "Dr. Sophia King", speciality: "Dermatologist", image: "https://via.placeholder.com/150?text=Dr.+Sophia" },
        // Pediatricians
        { _id: "13", name: "Dr. Daniel Scott", speciality: "Pediatricians", image: "https://via.placeholder.com/150?text=Dr.+Daniel" },
        { _id: "14", name: "Dr. Mia Johnson", speciality: "Pediatricians", image: "https://via.placeholder.com/150?text=Dr.+Mia" },
        { _id: "15", name: "Dr. Noah Miller", speciality: "Pediatricians", image: "https://via.placeholder.com/150?text=Dr.+Noah" },
        { _id: "16", name: "Dr. Zoe Adams", speciality: "Pediatricians", image: "https://via.placeholder.com/150?text=Dr.+Zoe" },
        // Neurologist
        { _id: "17", name: "Dr. Liam Turner", speciality: "Neurologist", image: "https://via.placeholder.com/150?text=Dr.+Liam" },
        { _id: "18", name: "Dr. Ava Martinez", speciality: "Neurologist", image: "https://via.placeholder.com/150?text=Dr.+Ava" },
        { _id: "19", name: "Dr. Lucas Hill", speciality: "Neurologist", image: "https://via.placeholder.com/150?text=Dr.+Lucas" },
        { _id: "20", name: "Dr. Isabella Clark", speciality: "Neurologist", image: "https://via.placeholder.com/150?text=Dr.+Isabella" },
        // Gastroenterologist
        { _id: "21", name: "Dr. Henry Wright", speciality: "Gastroenterologist", image: "https://via.placeholder.com/150?text=Dr.+Henry" },
        { _id: "22", name: "Dr. Ella Lopez", speciality: "Gastroenterologist", image: "https://via.placeholder.com/150?text=Dr.+Ella" },
        { _id: "23", name: "Dr. Mason Perez", speciality: "Gastroenterologist", image: "https://via.placeholder.com/150?text=Dr.+Mason" },
        { _id: "24", name: "Dr. Lily Young", speciality: "Gastroenterologist", image: "https://via.placeholder.com/150?text=Dr.+Lily" },
      ];
      setFilterDoc(mockDoctors.filter(doc => !speciality || doc.speciality === speciality));
      return;
    }

    // Filter doctors based on selected specialty
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      // Show all doctors if no specialty is selected
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctor specialists.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button 
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} 
          onClick={() => setShowFilter(prev => !prev)}
        >
          Filters
        </button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((spec) => (
            <p 
              key={spec} 
              onClick={() => navigate(`/doctors/${spec}`)}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === spec ? 'bg-indigo-100 text-black' : ''}`}
            >
              {spec}
            </p>
          ))}
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterDoc.length > 0 ? (
            filterDoc.map((item) => (
              <div 
                key={item._id} 
                onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }} 
                className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
              >
                <img className='bg-blue-50' src={item.image} alt={item.name} />
                <div className='p-4'>
                  <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                    <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                    <p>Available</p>
                  </div>
                  <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
              </div>
            ))
          ) : (
            <p className='text-gray-500'>No doctors available for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;