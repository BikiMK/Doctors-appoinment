import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { Mail, Phone, MapPin, Clock, Building2, ArrowRight, Globe } from 'lucide-react';

const ContactInfoCard = ({ icon: Icon, title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-start gap-4">
      <div className="p-3 bg-blue-50 rounded-full">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
        {children}
      </div>
    </div>
  </div>
);

// Popup Modal Component
const PopupModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{message}</h3>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Contact = () => {
  // State to manage popup visibility
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Function to open popup
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  // Function to close popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Connect with <span className="text-blue-600">Cure Nexus</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Located at Acharya Prafulla Chandra College Campus (APC College)
        </p>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        {/* Contact Image */}
        <div className="relative">
          <div className="absolute -z-10 w-full h-full bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <img
            className="w-full rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
            src={assets.contact_image}
            alt="Contact Us at SIT"
          />
        </div>

        {/* Contact Information Grid */}
        <div className="grid gap-6">
          <ContactInfoCard icon={Building2} title="Our Location">
            <p className="text-gray-600 leading-relaxed">
              <strong>Acharya Prafulla Chandra College (APC College)</strong><br />
              New Barrackpore, Dist : 24 pgs(N),<br />
              Kolkata - 700131, West Bengal
            </p>
          </ContactInfoCard>

          <ContactInfoCard icon={Clock} title="OPD Timings">
            <p className="text-gray-600">
              Monday - Saturday: 9:00 AM - 7:00 PM<br />
              Sunday: 9:00 AM - 1:00 PM<br />
              <span className="text-blue-600 font-medium">Emergency Services: 24/7</span>
            </p>
          </ContactInfoCard>

          <ContactInfoCard icon={Phone} title="Contact Numbers">
            <p className="text-gray-600">
              Reception: +91 20 2867 1234<br />
              Emergency: +91 20 2867 5555<br />
              Ambulance: 102
            </p>
          </ContactInfoCard>

          <ContactInfoCard icon={Mail} title="Email & Web">
            <p className="text-gray-600">
              Appointments: CureNexus.apc@symbiosis.ac.in<br />
              General Enquiries: info.CureNexus@apc.symbiosis.ac.in<br />
              Website: www.apc.com/CureNexus
            </p>
          </ContactInfoCard>
        </div>
      </div>

      {/* Map Integration with SIT Marker */}
      <div className="mb-20">
        <div className="bg-white p-4 rounded-2xl shadow-lg">
          <div className="text-gray-700 mb-4">
            <MapPin className="inline-block w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium">Acharya Prafulla Chandra College - Cure Nexus Center</span>
          </div>
          <iframe
            className="w-full h-[450px] rounded-lg border-0"
            src="https://www.google.com/maps?q=Acharya+Prafulla+Chandra+College&output=embed
"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Getting Here Section */}
      <div className="bg-white rounded-2xl p-8 shadow-lg mb-20">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Getting Here</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">From Kolkata</h4>
            <ul className="space-y-2 text-gray-600">
              <li>• 45 minutes drive from Sealdaha Railway Station</li>
              <li>• New Barrackpore, Dist : 24 pgs(N)</li>
              <li>• Kolkata - 700131, West Bengal</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Landmarks</h4>
            <ul className="space-y-2 text-gray-600">
              <li>• Adjacent to Acharya Prafulla Chandra College</li>
              <li>• Near Sealdaha Station</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Careers Section */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Join Our Medical Team
          </h2>
          <p className="text-gray-600 mb-8">
            Be part of our prestigious healthcare facility at Acharya Prafulla Chandra College.
            We're looking for dedicated healthcare professionals to serve our academic community.
          </p>
          <button
            onClick={handleOpenPopup}
            className="group bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            View Current Openings
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Popup Modal */}
      <PopupModal
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        message="No openings available right now"
      />

      {/* Additional Information */}
      <div className="mt-20 grid md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-gray-50 rounded-xl">
          <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold mb-2">Language Support</h3>
          <p className="text-gray-600">English, Hindi, Bengali</p>
        </div>

        <div className="text-center p-6 bg-gray-50 rounded-xl">
          <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold mb-2">Campus Location</h3>
          <p className="text-gray-600">Inside Acharya Prafulla Chandra College Campus</p>
        </div>

        <div className="text-center p-6 bg-gray-50 rounded-xl">
          <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold mb-2">Toll Free</h3>
          <p className="text-gray-600">1800 2000 108</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;