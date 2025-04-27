import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PaymentPage from "./pages/PaymentPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HealthcareBot from "./components/Chatbot";
import { useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function App() {
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      console.log('App Auth Check:', data);
    };
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer position="top-center" autoClose={5000} />
      <Navbar />
      <HealthcareBot />
      <main className="flex-1 pt-16"> {/* Added padding-top to account for fixed navbar height */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/appointment/:docId" element={<Appointment />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/my-account" element={<MyProfile />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}