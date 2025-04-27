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
      { _id: "1", name: "Dr. Chloe Evans", degree: "MBBS", speciality: "General physician", image: "https://randomuser.me/api/portraits/women/44.jpg", about: "Dr. Chloe has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.", fees: 49, experience: "4 yrs", slots_booked: {} },
      { _id: "2", name: "Dr. John Smith", degree: "MBBS", speciality: "General physician", image: "https://randomuser.me/api/portraits/men/32.jpg", about: "Dr. John specializes in general health and preventive care with a patient-centered approach.", fees: 49, experience: "5 yrs", slots_booked: {} },
      { _id: "3", name: "Dr. Emily Brown", degree: "MBBS", speciality: "General physician", image: "https://randomuser.me/api/portraits/women/68.jpg", about: "Dr. Emily focuses on comprehensive care and early detection of health issues.", fees: 49, experience: "3 yrs", slots_booked: {} },
      { _id: "4", name: "Dr. Michael Lee", degree: "MBBS", speciality: "General physician", image: "https://randomuser.me/api/portraits/men/45.jpg", about: "Dr. Michael offers expert care with an emphasis on preventive medicine.", fees: 49, experience: "6 yrs", slots_booked: {} },
      { _id: "5", name: "Dr. Sarah Davis", degree: "MBBS", speciality: "Gynecologist", image: "https://randomuser.me/api/portraits/women/56.jpg", about: "Dr. Sarah specializes in women’s health and reproductive care.", fees: 59, experience: "4 yrs", slots_booked: {} },
      { _id: "6", name: "Dr. Laura Wilson", degree: "MBBS", speciality: "Gynecologist", image: "https://randomuser.me/api/portraits/women/61.jpg", about: "Dr. Laura provides expert gynecological and prenatal care.", fees: 59, experience: "5 yrs", slots_booked: {} },
      { _id: "7", name: "Dr. Rachel Green", degree: "MBBS", speciality: "Gynecologist", image: "https://randomuser.me/api/portraits/women/47.jpg", about: "Dr. Rachel focuses on women’s health and surgical interventions.", fees: 59, experience: "3 yrs", slots_booked: {} },
      { _id: "8", name: "Dr. Anna Taylor", degree: "MBBS", speciality: "Gynecologist", image: "https://randomuser.me/api/portraits/women/35.jpg", about: "Dr. Anna offers comprehensive gynecological care.", fees: 59, experience: "6 yrs", slots_booked: {} },
      { _id: "9", name: "Dr. James Carter", degree: "MBBS", speciality: "Dermatologist", image: "https://randomuser.me/api/portraits/men/37.jpg", about: "Dr. James specializes in diagnosing and treating skin disorders with advanced techniques.", fees: 69, experience: "7 yrs", slots_booked: {} },
      { _id: "10", name: "Dr. Olivia White", degree: "MBBS", speciality: "Dermatologist", image: "https://randomuser.me/api/portraits/women/38.jpg", about: "Dr. Olivia offers comprehensive skin care solutions and cosmetic dermatology.", fees: 69, experience: "6 yrs", slots_booked: {} },
      { _id: "11", name: "Dr. Ethan Black", degree: "MBBS", speciality: "Dermatologist", image: "https://randomuser.me/api/portraits/men/41.jpg", about: "Dr. Ethan is an expert in skin surgeries and aesthetic dermatology.", fees: 69, experience: "5 yrs", slots_booked: {} },
      { _id: "12", name: "Dr. Sophia King", degree: "MBBS", speciality: "Dermatologist", image: "https://randomuser.me/api/portraits/women/52.jpg", about: "Dr. Sophia focuses on treating chronic skin conditions with innovative methods.", fees: 69, experience: "4 yrs", slots_booked: {} },
      { _id: "13", name: "Dr. Daniel Scott", degree: "MBBS", speciality: "Pediatricians", image: "https://randomuser.me/api/portraits/men/50.jpg", about: "Dr. Daniel is dedicated to providing compassionate healthcare for children and adolescents.", fees: 54, experience: "5 yrs", slots_booked: {} },
      { _id: "14", name: "Dr. Mia Johnson", degree: "MBBS", speciality: "Pediatricians", image: "https://randomuser.me/api/portraits/women/49.jpg", about: "Dr. Mia specializes in pediatric wellness and chronic disease management.", fees: 54, experience: "4 yrs", slots_booked: {} },
      { _id: "15", name: "Dr. Noah Miller", degree: "MBBS", speciality: "Pediatricians", image: "https://randomuser.me/api/portraits/men/55.jpg", about: "Dr. Noah provides expert care in pediatric emergency and preventive care.", fees: 54, experience: "6 yrs", slots_booked: {} },
      { _id: "16", name: "Dr. Zoe Adams", degree: "MBBS", speciality: "Pediatricians", image: "https://randomuser.me/api/portraits/women/59.jpg", about: "Dr. Zoe emphasizes healthy development and pediatric nutrition.", fees: 54, experience: "5 yrs", slots_booked: {} },
      { _id: "17", name: "Dr. Liam Turner", degree: "MBBS", speciality: "Neurologist", image: "https://randomuser.me/api/portraits/men/53.jpg", about: "Dr. Liam specializes in diagnosing and treating disorders of the nervous system.", fees: 79, experience: "8 yrs", slots_booked: {} },
      { _id: "18", name: "Dr. Ava Martinez", degree: "MBBS", speciality: "Neurologist", image: "https://randomuser.me/api/portraits/women/57.jpg", about: "Dr. Ava is an expert in treating epilepsy, stroke, and neurodegenerative diseases.", fees: 79, experience: "7 yrs", slots_booked: {} },
      { _id: "19", name: "Dr. Lucas Hill", degree: "MBBS", speciality: "Neurologist", image: "https://randomuser.me/api/portraits/men/49.jpg", about: "Dr. Lucas focuses on neurodiagnostics and innovative therapies.", fees: 79, experience: "6 yrs", slots_booked: {} },
      { _id: "20", name: "Dr. Isabella Clark", degree: "MBBS", speciality: "Neurologist", image: "https://randomuser.me/api/portraits/women/60.jpg", about: "Dr. Isabella is dedicated to comprehensive neurological care and rehabilitation.", fees: 79, experience: "5 yrs", slots_booked: {} },
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
    <div className="relative min-h-screen pt-20 bg-gradient-to-br from-gray-950 to-indigo-950">
      {/* Holographic Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="holographic-bg"></div>
        <div className="heartbeat-particle heartbeat-particle-1"></div>
        <div className="heartbeat-particle heartbeat-particle-2"></div>
        <div className="heartbeat-particle heartbeat-particle-3"></div>
      </div>
      <style jsx>{`
        .holographic-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1), transparent 70%);
          animation: shimmer 15s infinite linear;
          opacity: 0.3;
        }

        @keyframes shimmer {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 200% 200%;
          }
        }

        .heartbeat-particle {
          position: absolute;
          width: 24px;
          height: 24px;
          background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="rgba(236,72,153,0.5)" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>') no-repeat center;
          background-size: contain;
          animation: heartbeat 8s infinite ease-in-out;
          opacity: 0.5;
        }

        .heartbeat-particle-1 {
          left: 20%;
          top: 25%;
          animation-delay: 0s;
        }

        .heartbeat-particle-2 {
          left: 55%;
          top: 65%;
          animation-delay: 2s;
        }

        .heartbeat-particle-3 {
          left: 80%;
          top: 15%;
          animation-delay: 4s;
        }

        @keyframes heartbeat {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
        }

        .gradient-text {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          background-image: linear-gradient(to right, #60A5FA, #EC4899);
        }

        .glow-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5), 0 0 30px rgba(236, 72, 153, 0.3);
        }

        .book-button:hover {
          animation: pulse-button 1.5s infinite;
        }

        @keyframes pulse-button {
          0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7), 0 0 0 0 rgba(236, 72, 153, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0), 0 0 0 10px rgba(236, 72, 153, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0), 0 0 0 0 rgba(236, 72, 153, 0);
          }
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Doctor Details */}
        <div className="flex flex-col md:flex-row gap-6 bg-gray-900/30 backdrop-blur-md rounded-2xl p-6 border border-blue-500/50 glow-card transition-all duration-300">
          <div className="w-full md:w-1/3 relative">
            <img
              className="w-full rounded-xl object-cover h-64 hover:scale-105 transition-all duration-500"
              src={docInfo.image}
              alt={docInfo.name}
            />
            <div className="absolute top-4 right-4 bg-pink-500/80 rounded-full px-2 py-1 text-xs text-white flex items-center gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Available
            </div>
          </div>

          <div className="w-full md:w-2/3 space-y-4">
            <p
              className="flex items-center gap-2 text-2xl font-medium gradient-text"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="Verified" />
            </p>
            <p
              className="text-blue-200 text-sm"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <p
              className="text-blue-200 text-xs"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {docInfo.experience}
            </p>

            <div>
              <p
                className="flex items-center gap-1 text-sm font-medium gradient-text"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                About
                <img src={assets.info_icon} alt="Info" className="w-4" />
              </p>
              <p
                className="text-blue-200 text-sm mt-1"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {docInfo.about}
              </p>
            </div>

            <p
              className="text-blue-100 font-medium"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Appointment fee:{' '}
              <span className="gradient-text font-bold">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="mt-8 p-6 bg-gray-900/30 backdrop-blur-md rounded-2xl border border-blue-500/50 glow-card transition-all duration-300">
          <p
            className="text-2xl font-semibold gradient-text mb-6"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Schedule Your Appointment
          </p>

          <div className="flex gap-3 items-center overflow-x-auto mt-4">
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-4 px-4 min-w-[70px] rounded-xl cursor-pointer flex flex-col items-center transition-all duration-300 ${
                    slotIndex === index
                      ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg'
                      : 'border border-blue-500/50 text-blue-200 hover:bg-blue-500/20'
                  }`}
                  key={index}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  <p className="text-sm font-medium">
                    {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                  </p>
                  <p className="text-lg">{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-3 overflow-x-auto mt-6 flex-wrap">
            {docSlots.length > 0 &&
              docSlots[slotIndex]?.map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                    item.time === slotTime
                      ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg'
                      : 'text-blue-200 border border-blue-500/50 hover:bg-blue-500/20'
                  }`}
                  key={index}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          <button
            onClick={bookAppointment}
            className={`book-button mt-8 bg-gradient-to-r from-blue-500 to-pink-500 text-white text-sm font-medium px-12 py-3 rounded-full transition-all duration-300 ${
              !slotTime ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
            }`}
            disabled={!slotTime}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Book Appointment
          </button>
        </div>

        {/* Listing Related Doctors */}
        {/* <RelatedDoctor docId={docId} speciality={docInfo.speciality} /> */}
      </div>
    </div>
  );
};

export default Appointment;