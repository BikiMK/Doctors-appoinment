import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { Mail, Phone, MapPin, Clock, Building2, ArrowRight, Globe } from 'lucide-react';

const ContactInfoCard = ({ icon: Icon, title, children }) => (
  <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-lg border border-gray-700 hover:border-gradient-to-r hover:from-blue-500 hover:to-emerald-500 transition-all duration-300">
    <div className="flex items-start gap-4">
      <div className="p-3 bg-blue-500/20 rounded-full">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
      <div>
        <h3
          className="font-semibold gradient-text mb-2"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {title}
        </h3>
        {children}
      </div>
    </div>
  </div>
);

const PopupModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800/80 backdrop-blur-md p-6 rounded-lg shadow-xl max-w-sm w-full border border-gray-700">
        <h3
          className="text-lg font-semibold text-blue-100 mb-4"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {message}
        </h3>
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-300"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Contact = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleOpenPopup = () => {
    setPopupMessage("No openings available right now");
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

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

        .contact-card:hover,
        .info-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1
            className="text-4xl md:text-5xl font-bold gradient-text mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Connect with Cure Nexus
          </h1>
          <p
            className="text-blue-200 max-w-2xl mx-auto"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Located at Acharya Prafulla Chandra College Campus (APC College)
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Contact Image */}
          <div className="relative">
            <div className="absolute -z-10 w-full h-full bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-2xl blur-3xl"></div>
            <img
              className="w-full rounded-2xl shadow-xl hover:scale-105 transition-all duration-500"
              src={assets.contact_image}
              alt="Contact Us at SIT"
            />
          </div>

          {/* Contact Information Grid */}
          <div className="grid gap-6">
            <ContactInfoCard icon={Building2} title="Our Location" className="contact-card">
              <p
                className="text-blue-200 leading-relaxed"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <strong>Acharya Prafulla Chandra College (APC College)</strong>
                <br />
                New Barrackpore, Dist : 24 pgs(N),
                <br />
                Kolkata - 700131, West Bengal
              </p>
            </ContactInfoCard>

            <ContactInfoCard icon={Clock} title="OPD Timings" className="contact-card">
              <p
                className="text-blue-200"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Monday - Saturday: 9:00 AM - 7:00 PM
                <br />
                Sunday: 9:00 AM - 1:00 PM
                <br />
                <span className="gradient-text font-medium">Emergency Services: 24/7</span>
              </p>
            </ContactInfoCard>

            <ContactInfoCard icon={Phone} title="Contact Numbers" className="contact-card">
              <p
                className="text-blue-200"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Reception: +91 83919 34013
                <br />
                Emergency: +91 98312 72570
                <br />
                Ambulance: 102
              </p>
            </ContactInfoCard>

            <ContactInfoCard icon={Mail} title="Email & Web" className="contact-card">
              <p
                className="text-blue-200"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Appointments: CureNexus.apc@symbiosis.ac.in
                <br />
                General Enquiries: info.CureNexus@apc.symbiosis.ac.in
                <br />
                Website: www.apc.com/CureNexus
              </p>
            </ContactInfoCard>
          </div>
        </div>

        {/* Map Integration */}
        <div className="mb-20">
          <div className="bg-gray-800/50 backdrop-blur-md p-4 rounded-2xl shadow-lg">
            <div className="text-blue-100 mb-4 flex items-center">
              <MapPin className="w-5 h-5 text-blue-400 mr-2" />
              <span
                className="font-medium"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Acharya Prafulla Chandra College - Cure Nexus Center
              </span>
            </div>
            <iframe
              className="w-full h-[450px] rounded-lg border-0"
              src="https://www.google.com/maps?q=Acharya+Prafulla+Chandra+College&output=embed"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Getting Here Section */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 shadow-lg mb-20">
          <h3
            className="text-2xl font-bold gradient-text mb-6"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Getting Here
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4
                className="font-semibold text-blue-100 mb-3"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                From Kolkata
              </h4>
              <ul
                className="space-y-2 text-blue-200"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <li>• 45 minutes drive from Sealdaha Railway Station</li>
                <li>• New Barrackpore, Dist : 24 pgs(N)</li>
                <li>• Kolkata - 700131, West Bengal</li>
              </ul>
            </div>
            <div>
              <h4
                className="font-semibold text-blue-100 mb-3"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Landmarks
              </h4>
              <ul
                className="space-y-2 text-blue-200"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <li>• Adjacent to Acharya Prafulla Chandra College</li>
                <li>• Near Sealdaha Station</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Careers Section
        <div className="bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-3xl font-bold gradient-text mb-6"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Join Our Medical Team
            </h2>
            <p
              className="text-blue-200 mb-8"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Be part of our prestigious healthcare facility at Acharya Prafulla Chandra College. We're looking for dedicated healthcare professionals to serve our academic community.
            </p>
            <button
              onClick={handleOpenPopup}
              className="group bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 flex items-center gap-2 mx-auto"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              View Current Openings
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div> */}

        {/* Additional Information */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Globe className="w-6 h-6 text-blue-400" />,
              title: "Language Support",
              text: "English, Hindi, Bengali",
            },
            {
              icon: <MapPin className="w-6 h-6 text-blue-400" />,
              title: "Campus Location",
              text: "Inside Acharya Prafulla Chandra College Campus",
            },
            {
              icon: <Phone className="w-6 h-6 text-blue-400" />,
              title: "Toll Free",
              text: "123 456 789",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="info-card text-center p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 hover:border-gradient-to-r hover:from-blue-500 hover:to-emerald-500 transition-all duration-300"
            >
              <div className="bg-blue-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>
              <h3
                className="font-semibold gradient-text mb-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {item.title}
              </h3>
              <p
                className="text-blue-200"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Popup Modal */}
        <PopupModal
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          message={popupMessage}
        />
      </div>
    </div>
  );
};

export default Contact;