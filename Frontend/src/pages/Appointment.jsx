import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctor from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import { supabase } from '../supabaseClient';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, getDoctorsData } = useContext(AppContext);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = () => {
    const mockDoctors = [
      // General physician
      { _id: "1", name: "Dr. Chloe Evans", degree: "MBBS", speciality: "General physician", image: "https://randomuser.me/api/portraits/women/44.jpg", about: "Dr. Chloe has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 49, experience: "4 yrs", slots_booked: {} },
      { _id: "2", name: "Dr. John Smith", degree: "MBBS", speciality: "General physician", image: "https://randomuser.me/api/portraits/men/32.jpg", about: "Dr. John specializes in general health and preventive care with a patient-centered approach.", fees: 49, experience: "5 yrs", slots_booked: {} },
      { _id: "3", name: "Dr. Emily Brown", degree: "MBBS", speciality: "General physician", image: "https://randomuser.me/api/portraits/women/68.jpg", about: "Dr. Emily focuses on comprehensive care and early detection of health issues.", fees: 49, experience: "3 yrs", slots_booked: {} },
      { _id: "4", name: "Dr. Michael Lee", degree: "MBBS", speciality: "General physician", image: "https://randomuser.me/api/portraits/men/45.jpg", about: "Dr. Michael offers expert care with an emphasis on preventive medicine.", fees: 49, experience: "6 yrs", slots_booked: {} },
    
      // Gynecologist
      { _id: "5", name: "Dr. Sarah Davis", degree: "MBBS", speciality: "Gynecologist", image: "https://randomuser.me/api/portraits/women/56.jpg", about: "Dr. Sarah specializes in women’s health and reproductive care.", fees: 59, experience: "4 yrs", slots_booked: {} },
      { _id: "6", name: "Dr. Laura Wilson", degree: "MBBS", speciality: "Gynecologist", image: "https://randomuser.me/api/portraits/women/61.jpg", about: "Dr. Laura provides expert gynecological and prenatal care.", fees: 59, experience: "5 yrs", slots_booked: {} },
      { _id: "7", name: "Dr. Rachel Green", degree: "MBBS", speciality: "Gynecologist", image: "https://randomuser.me/api/portraits/women/47.jpg", about: "Dr. Rachel focuses on women’s health and surgical interventions.", fees: 59, experience: "3 yrs", slots_booked: {} },
      { _id: "8", name: "Dr. Anna Taylor", degree: "MBBS", speciality: "Gynecologist", image: "https://randomuser.me/api/portraits/women/35.jpg", about: "Dr. Anna offers comprehensive gynecological care.", fees: 59, experience: "6 yrs", slots_booked: {} },
    
      // Dermatologist
      { _id: "9", name: "Dr. James Carter", degree: "MBBS", speciality: "Dermatologist", image: "https://randomuser.me/api/portraits/men/37.jpg", about: "Dr. James specializes in diagnosing and treating skin disorders with advanced techniques.", fees: 69, experience: "7 yrs", slots_booked: {} },
      { _id: "10", name: "Dr. Olivia White", degree: "MBBS", speciality: "Dermatologist", image: "https://randomuser.me/api/portraits/women/38.jpg", about: "Dr. Olivia offers comprehensive skin care solutions and cosmetic dermatology.", fees: 69, experience: "6 yrs", slots_booked: {} },
      { _id: "11", name: "Dr. Ethan Black", degree: "MBBS", speciality: "Dermatologist", image: "https://randomuser.me/api/portraits/men/41.jpg", about: "Dr. Ethan is an expert in skin surgeries and aesthetic dermatology.", fees: 69, experience: "5 yrs", slots_booked: {} },
      { _id: "12", name: "Dr. Sophia King", degree: "MBBS", speciality: "Dermatologist", image: "https://randomuser.me/api/portraits/women/52.jpg", about: "Dr. Sophia focuses on treating chronic skin conditions with innovative methods.", fees: 69, experience: "4 yrs", slots_booked: {} },
    
      // Pediatricians
      { _id: "13", name: "Dr. Daniel Scott", degree: "MBBS", speciality: "Pediatricians", image: "https://randomuser.me/api/portraits/men/50.jpg", about: "Dr. Daniel is dedicated to providing compassionate healthcare for children and adolescents.", fees: 54, experience: "5 yrs", slots_booked: {} },
      { _id: "14", name: "Dr. Mia Johnson", degree: "MBBS", speciality: "Pediatricians", image: "https://randomuser.me/api/portraits/women/49.jpg", about: "Dr. Mia specializes in pediatric wellness and chronic disease management.", fees: 54, experience: "4 yrs", slots_booked: {} },
      { _id: "15", name: "Dr. Noah Miller", degree: "MBBS", speciality: "Pediatricians", image: "https://randomuser.me/api/portraits/men/55.jpg", about: "Dr. Noah provides expert care in pediatric emergency and preventive care.", fees: 54, experience: "6 yrs", slots_booked: {} },
      { _id: "16", name: "Dr. Zoe Adams", degree: "MBBS", speciality: "Pediatricians", image: "https://randomuser.me/api/portraits/women/59.jpg", about: "Dr. Zoe emphasizes healthy development and pediatric nutrition.", fees: 54, experience: "5 yrs", slots_booked: {} },
    
      // Neurologist
      { _id: "17", name: "Dr. Liam Turner", degree: "MBBS", speciality: "Neurologist", image: "https://randomuser.me/api/portraits/men/53.jpg", about: "Dr. Liam specializes in diagnosing and treating disorders of the nervous system.", fees: 79, experience: "8 yrs", slots_booked: {} },
      { _id: "18", name: "Dr. Ava Martinez", degree: "MBBS", speciality: "Neurologist", image: "https://randomuser.me/api/portraits/women/57.jpg", about: "Dr. Ava is an expert in treating epilepsy, stroke, and neurodegenerative diseases.", fees: 79, experience: "7 yrs", slots_booked: {} },
      { _id: "19", name: "Dr. Lucas Hill", degree: "MBBS", speciality: "Neurologist", image: "https://randomuser.me/api/portraits/men/49.jpg", about: "Dr. Lucas focuses on neurodiagnostics and innovative therapies.", fees: 79, experience: "6 yrs", slots_booked: {} },
      { _id: "20", name: "Dr. Isabella Clark", degree: "MBBS", speciality: "Neurologist", image: "https://randomuser.me/api/portraits/women/60.jpg", about: "Dr. Isabella is dedicated to comprehensive neurological care and rehabilitation.", fees: 79, experience: "5 yrs", slots_booked: {} },
    
      // Gastroenterologist
      { _id: "21", name: "Dr. Henry Wright", degree: "MBBS", speciality: "Gastroenterologist", image: "https://randomuser.me/api/portraits/men/42.jpg", about: "Dr. Henry specializes in digestive health, liver diseases, and endoscopic procedures.", fees: 74, experience: "7 yrs", slots_booked: {} },
      { _id: "22", name: "Dr. Ella Lopez", degree: "MBBS", speciality: "Gastroenterologist", image: "https://randomuser.me/api/portraits/women/42.jpg", about: "Dr. Ella focuses on gastrointestinal wellness and preventive treatments.", fees: 74, experience: "6 yrs", slots_booked: {} },
      { _id: "23", name: "Dr. Mason Perez", degree: "MBBS", speciality: "Gastroenterologist", image: "https://randomuser.me/api/portraits/men/43.jpg", about: "Dr. Mason provides advanced care for digestive disorders and GI cancers.", fees: 74, experience: "5 yrs", slots_booked: {} },
      { _id: "24", name: "Dr. Lily Young", degree: "MBBS", speciality: "Gastroenterologist", image: "https://randomuser.me/api/portraits/women/41.jpg", about: "Dr. Lily offers personalized care for digestive and liver conditions.", fees: 74, experience: "4 yrs", slots_booked: {} },
    ];
    
    
    

    const foundDoc = mockDoctors.find(doc => doc._id === docId) || doctors.find(doc => doc._id === docId);
    setDocInfo(foundDoc || null);
  };

  const getAvailableSlots = () => {
    if (!docInfo) return;

    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

        if (isSlotAvailable) {
          timeSlots.push({ datetime: new Date(currentDate), time: formattedTime });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots(prev => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      console.log('Book Appointment Auth Check:', data);
      if (error || !data || !data.user) {
        toast.warn('Please login to book an appointment');
        navigate('/login');
        return;
      }

      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const { user } = data;
      const { error: insertError } = await supabase.from('appointments').insert({
        user_id: user.id,
        doctor_id: docId,
        doctor_name: docInfo.name,
        specialty: docInfo.speciality,
        appointment_date: date,
        slot_time: slotTime,
        status: 'scheduled',
      });
      console.log("Inserted Appointment Data:", { user_id: user.id, doctor_id: docId, slot_time: slotTime });

      if (insertError) throw insertError;

      const updatedDocInfo = { ...docInfo };
      if (!updatedDocInfo.slots_booked[slotDate]) updatedDocInfo.slots_booked[slotDate] = [];
      updatedDocInfo.slots_booked[slotDate].push(slotTime);
      setDocInfo(updatedDocInfo);

      toast.success('Appointment booked', {
        position: 'top-center',
        autoClose: 3000,
        onClose: () => {
          navigate('/my-account');
          window.location.reload();
        },
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Failed to book appointment. Please try again.');
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return docInfo && (
    <div className="max-w-4xl mx-auto p-4">
      {/* ---------- Header ---------- */}

      {/* ---------- Doctor Details ---------- */}
      <div className="flex flex-col md:flex-row gap-6 bg-white border border-gray-200 rounded-lg p-6 shadow-md">
        <div className="w-full md:w-1/3">
          <img className="w-full rounded-lg bg-blue-500" src={docInfo.image} alt={docInfo.name} />
        </div>

        <div className="w-full md:w-2/3">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name} <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </p>
          <p className="text-gray-600 text-sm mt-1">{docInfo.degree} - {docInfo.speciality}</p>
          <p className="text-gray-600 text-xs mt-1">{docInfo.experience}</p>

          <div className="mt-4">
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900">
              About <img src={assets.info_icon} alt="Info" className="w-4" />
            </p>
            <p className="text-sm text-gray-500 mt-1">{docInfo.about}</p>
          </div>

          <p className="text-gray-500 font-medium mt-4">
            Appointment fee: <span className="text-gray-600 font-bold">{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* ---------- Booking Slots ---------- */}
      <div className="mt-6 p-6 bg-white border border-gray-200 rounded-lg">
        <p className="text-gray-700 font-medium">Booking slots</p>

        <div className="flex gap-3 items-center overflow-x-auto mt-4">
          {docSlots.length > 0 && docSlots.map((item, index) => (
            <div
              onClick={() => setSlotIndex(index)}
              className={`text-center py-4 px-3 min-w-[60px] rounded-full cursor-pointer flex flex-col items-center ${slotIndex === index ? 'bg-blue-500 text-white' : 'border border-gray-200 text-gray-700'}`}
              key={index}
            >
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 overflow-x-auto mt-4">
          {docSlots.length > 0 && docSlots[slotIndex]?.map((item, index) => (
            <p
              onClick={() => setSlotTime(item.time)}
              className={`text-sm font-light px-4 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-blue-500 text-white' : 'text-gray-400 border border-gray-300'}`}
              key={index}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button
          onClick={bookAppointment}
          className={`bg-blue-500 text-white text-sm font-light px-10 py-2 rounded-full mt-6 ${!slotTime ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          disabled={!slotTime}
        >
          Book appointment
        </button>
      </div>

      {/* Listing Related Doctors */}
      <RelatedDoctor docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;