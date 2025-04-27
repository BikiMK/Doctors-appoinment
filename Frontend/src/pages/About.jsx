import React from 'react';
import { assets } from '../assets/assets';
import { Clock, Heart, Activity, Check, Users, Hospital } from 'lucide-react';

const About = () => {
  const stats = [
    { number: "10K+", text: "Active Users" },
    { number: "500+", text: "Doctors" },
    { number: "50+", text: "Specialties" },
  ];

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

        .stat-card:hover,
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section with Stats */}
        <div className="text-center mb-20">
          <h1
            className="text-4xl md:text-5xl font-bold gradient-text mb-6"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            About Cure Nexus
          </h1>
          <p
            className="text-blue-200 max-w-2xl mx-auto mb-12 text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Revolutionizing healthcare access through technology and compassionate care
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card bg-gray-800/50 backdrop-blur-md p-6 rounded-xl border border-gray-700 hover:border-gradient-to-r hover:from-blue-500 hover:to-emerald-500 transition-all duration-300"
              >
                <h3
                  className="text-3xl font-bold gradient-text mb-2"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {stat.number}
                </h3>
                <p
                  className="text-blue-100"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {stat.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* About Section with Image */}
        <div className="flex flex-col lg:flex-row gap-16 mb-20 items-center">
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-3xl blur-xl"></div>
            <img
              className="relative rounded-3xl shadow-2xl object-cover w-full h-[500px] hover:scale-105 transition-all duration-500"
              src={assets.about_image}
              alt="Healthcare professionals"
            />
          </div>

          <div className="lg:w-1/2 space-y-8">
            <h2
              className="text-3xl md:text-4xl font-bold gradient-text leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Transforming Healthcare For A Better Tomorrow
            </h2>

            <p
              className="text-blue-200 text-lg leading-relaxed"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              At Cure Nexus, we're revolutionizing the way you access healthcare services. Our platform combines cutting-edge technology with compassionate care to provide you with an unparalleled medical appointment experience.
            </p>

            {/* Key Features */}
            <div className="space-y-4">
              {[
                "Easy online appointment booking",
                "24/7 customer support",
                "Secure medical records",
                "Instant doctor consultations",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="bg-blue-500/20 rounded-full p-2">
                    <Check className="w-4 h-4 text-blue-400" />
                  </div>
                  <span
                    className="text-blue-100"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Vision Card */}
            <div className="bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl border-l-4 border-gradient-to-b from-blue-500 to-emerald-500">
              <h3
                className="text-2xl font-bold gradient-text mb-4"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Our Vision
              </h3>
              <p
                className="text-blue-200 leading-relaxed"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Our vision at Cure Nexus is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold gradient-text mb-6"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Why Choose Cure Nexus
            </h2>
            <p
              className="text-blue-200 max-w-2xl mx-auto text-lg"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Experience healthcare that's designed around you and your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-8 h-8 text-blue-400" />,
                title: "Efficiency",
                description:
                  "Streamlined appointment scheduling that fits into your busy lifestyle, with smart reminders and instant confirmations.",
              },
              {
                icon: <Users className="w-8 h-8 text-blue-400" />,
                title: "Convenience",
                description:
                  "Access to a network of trusted healthcare professionals in your area, with easy online booking and management.",
              },
              {
                icon: <Heart className="w-8 h-8 text-blue-400" />,
                title: "Personalization",
                description:
                  "Tailored recommendations and reminders to help you stay on top of your health, with personalized care plans.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="feature-card bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl border border-gray-700 hover:border-gradient-to-r hover:from-blue-500 hover:to-emerald-500 transition-all duration-300"
              >
                <div className="bg-blue-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3
                  className="text-2xl font-bold gradient-text mb-4"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-blue-200 leading-relaxed"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;