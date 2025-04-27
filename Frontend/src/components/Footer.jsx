import React from "react";
import { assets } from '../assets/assets';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-blue-950 text-blue-100">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radial pulse rings */}
        <div className="pulse-container">
          <div className="pulse-ring"></div>
          <div className="pulse-ring"></div>
          <div className="pulse-ring"></div>
        </div>
        {/* Twinkling star particles */}
        <div className="starfield-container">
          {Array.from({ length: 15 }).map((_, index) => (
            <div key={index} className={`star-particle star-particle-${index + 1}`}></div>
          ))}
        </div>
      </div>

      {/* Inline CSS for animations and styles */}
      <style jsx>{`
        .pulse-container {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
          z-index: 0;
        }
        .pulse-ring {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.6), rgba(16, 185, 129, 0.3));
          animation: pulse 5s infinite ease-out;
          opacity: 0.3;
          border: 2px solid transparent;
        }
        .pulse-ring:nth-child(1) { animation-delay: 0s; }
        .pulse-ring:nth-child(2) { animation-delay: 1.5s; }
        .pulse-ring:nth-child(3) { animation-delay: 3s; }
        @keyframes pulse {
          0% {
            transform: scale(0);
            opacity: 0.6;
          }
          70% {
            opacity: 0.3;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .starfield-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .star-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.8), rgba(59, 130, 246, 0.4));
          border-radius: 50%;
          animation: twinkle 6s infinite ease-in-out;
          opacity: 0.4;
        }
        /* Positions and animation delays for stars */
        .star-particle-1 { top: 15%; left: 10%; animation-delay: 0s; }
        .star-particle-2 { top: 25%; left: 20%; animation-delay: 0.5s; }
        .star-particle-3 { top: 35%; left: 30%; animation-delay: 1s; }
        .star-particle-4 { top: 45%; left: 40%; animation-delay: 1.5s; }
        .star-particle-5 { top: 55%; left: 50%; animation-delay: 2s; }
        .star-particle-6 { top: 65%; left: 60%; animation-delay: 2.5s; }
        .star-particle-7 { top: 75%; left: 70%; animation-delay: 3s; }
        .star-particle-8 { top: 85%; left: 80%; animation-delay: 3.5s; }
        .star-particle-9 { top: 20%; left: 90%; animation-delay: 4s; }
        .star-particle-10 { top: 30%; left: 15%; animation-delay: 4.5s; }
        .star-particle-11 { top: 40%; left: 25%; animation-delay: 5s; }
        .star-particle-12 { top: 50%; left: 35%; animation-delay: 5.5s; }
        .star-particle-13 { top: 60%; left: 45%; animation-delay: 6s; }
        .star-particle-14 { top: 70%; left: 55%; animation-delay: 6.5s; }
        .star-particle-15 { top: 80%; left: 65%; animation-delay: 7s; }
        @keyframes twinkle {
          0% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.5); opacity: 0.8; }
          100% { transform: scale(1); opacity: 0.4; }
        }
        /* Gradient text style */
        .gradient-text {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          background-image: linear-gradient(to right, #60A5FA, #34D399);
        }
        /* Social icon hover effect */
        .social-icon:hover {
          transform: scale(1.2);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        /* Link hover color */
        .link:hover {
          color: #34D399;
          transition: color 0.3s ease;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-32 pb-12 relative z-10">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center mb-6">
              <img
                className="w-12 h-12 object-contain"
                src={assets.logo}
                alt="Cure Nexus Logo"
              />
              <h2
                className="ml-3 text-2xl font-bold gradient-text"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Cure Nexus
              </h2>
            </div>
            <p
              className="text-blue-200 leading-relaxed mb-6"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Cure Nexus is India's leading healthcare technology platform, transforming the way medical professionals manage their practices. We provide cutting-edge solutions for appointment scheduling, patient records management, and seamless healthcare delivery.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Twitter size={20} />, href: "#", color: "hover:bg-blue-500" },
                { icon: <Instagram size={20} />, href: "#", color: "hover:bg-pink-600" },
                { icon: <Facebook size={20} />, href: "#", color: "hover:bg-blue-800" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`social-icon w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 text-blue-100 ${social.color} transition-all duration-300`}
                  aria-label={`Link to ${social.href}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-xl font-semibold gradient-text mb-6"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Our Services", href: "/services" },
                { label: "Contact Us", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms & Conditions", href: "/terms" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="link text-blue-200 hover:text-emerald-400 transition-colors flex items-center"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              className="text-xl font-semibold gradient-text mb-6"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+918391934013"
                  className="group flex items-center text-blue-200 hover:text-emerald-400 transition-colors"
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 group-hover:bg-blue-500/20 mr-3">
                    <Phone size={16} className="group-hover:text-blue-400" />
                  </span>
                  <div style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <p className="font-medium">Call Us</p>
                    <p>+91 83919 34013</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@CureNexus.in"
                  className="group flex items-center text-blue-200 hover:text-emerald-400 transition-colors"
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 group-hover:bg-blue-500/20 mr-3">
                    <Mail size={16} className="group-hover:text-blue-400" />
                  </span>
                  <div style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <p className="font-medium">Email Us</p>
                    <p>info@CureNexus.in</p>
                  </div>
                </a>
              </li>
              <li>
                <div className="group flex items-center text-blue-200">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 group-hover:bg-blue-500/20 mr-3">
                    <MapPin size={16} className="group-hover:text-blue-400" />
                  </span>
                  <div style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <p className="font-medium">Location</p>
                    <p>Kolkata</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="group flex items-center text-blue-200">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 group-hover:bg-blue-500/20 mr-3">
                    <Clock size={16} className="group-hover:text-blue-400" />
                  </span>
                  <div style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <p className="font-medium">Hours</p>
                    <p>Mon - Sat: 9AM - 7PM</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p
              className="text-blue-200 text-sm mb-4 md:mb-0"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              © {new Date().getFullYear()} Cure Nexus. All rights reserved. | Made with ❤️ in India
            </p>
            <div className="flex space-x-6 text-sm">
              {[
                { label: "Terms", href: "/terms" },
                { label: "Privacy", href: "/privacy" },
                { label: "Cookies", href: "/cookies" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="link text-blue-200 hover:text-emerald-400 transition-colors"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
