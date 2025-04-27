import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  // Only show hero section on homepage
  const showHero = location.pathname === "/";

  const handleImageError = (e) => {
    console.log('Image failed to load, switching to fallback');
    e.target.src = 'https://placehold.co/600x400?text=Fallback+Image'; // Reliable fallback
  };

  return (
    <>
      {showHero && (
        <div className="relative -mt-20">
          {/* Background with Dark Gradient and Animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-800">
            {/* Subtle radial gradient overlay */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,rgba(0,0,0,0.2)_100%)]" />
            {/* Animated Particles (Healthcare-themed) */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="particle particle-1"></div>
              <div className="particle particle-2"></div>
              <div className="particle particle-3"></div>
              <div className="particle particle-4"></div>
            </div>
          </div>

          <style jsx>{`
            .particle {
              position: absolute;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: rgba(59, 130, 246, 0.3); /* Blue glow for healthcare theme */
              animation: float 15s infinite ease-in-out;
              opacity: 0.5;
            }

            .particle-1 {
              left: 20%;
              top: 30%;
              animation-delay: 0s;
              background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="rgba(59,130,246,0.5)" viewBox="0 0 24 24"><path d="M12 2v8H4v4h8v8h4v-8h8v-4h-8V2h-4z"/></svg>') no-repeat center;
              background-size: contain;
            }

            .particle-2 {
              left: 70%;
              top: 50%;
              animation-delay: 5s;
              background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="rgba(59,130,246,0.5)" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>') no-repeat center;
              background-size: contain;
            }

            .particle-3 {
              left: 40%;
              top: 80%;
              animation-delay: 10s;
              background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="rgba(59,130,246,0.5)" viewBox="0 0 24 24"><path d="M12 2v8H4v4h8v8h4v-8h8v-4h-8V2h-4z"/></svg>') no-repeat center;
              background-size: contain;
            }

            .particle-4 {
              left: 90%;
              top: 20%;
              animation-delay: 2s;
              background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="rgba(59,130,246,0.5)" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>') no-repeat center;
              background-size: contain;
            }

            @keyframes float {
              0% {
                transform: translateY(0) scale(1);
                opacity: 0.5;
              }
              50% {
                transform: translateY(-100px) scale(1.2);
                opacity: 0.8;
              }
              100% {
                transform: translateY(0) scale(1);
                opacity: 0.5;
              }
            }
          `}</style>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center min-h-[calc(100vh-4rem)] py-8">
              <div className="md:w-1/2 flex flex-col items-start justify-center space-y-8 md:pr-12">
                <div className="bg-white/10 backdrop-blur-md rounded-full py-2 px-4 border border-white/20">
                  <span className="text-emerald-400 font-medium">✨ Trusted by 10,000+ Patients</span>
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    Expert Healthcare
                    <span className="block bg-gradient-to-r from-blue-200 to-emerald-200 bg-clip-text text-transparent">
                      At Your Fingertips
                    </span>
                  </h1>
                  <p className="text-lg text-blue-100 leading-relaxed max-w-xl">
                    Connect with top-rated doctors for personalized care.
                    Schedule appointments seamlessly and take control of your health journey.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="text-2xl mb-2">👨‍⚕️</div>
                    <div className="text-white font-semibold">500+ Doctors</div>
                    <div className="text-blue-200 text-sm">Verified Specialists</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="text-2xl mb-2">🏥</div>
                    <div className="text-white font-semibold">100+ Clinics</div>
                    <div className="text-blue-200 text-sm">Premium Locations</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="text-2xl mb-2">⭐️</div>
                    <div className="text-white font-semibold">4.9/5 Rating</div>
                    <div className="text-blue-200 text-sm">Patient Reviews</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="text-2xl mb-2">🕒</div>
                    <div className="text-white font-semibold">24/7 Support</div>
                    <div className="text-blue-200 text-sm">Always Available</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Link
                    to="/doctors"
                    className="relative overflow-hidden rounded-xl bg-white px-8 py-4 text-base font-bold text-blue-900 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Book Appointment
                      <svg
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 mt-12 md:mt-0">
                <div className="relative">
                  <div className="absolute -inset-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-2xl blur-2xl" />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/90 to-indigo-900/90 p-1">
                    <div className="relative rounded-xl overflow-hidden">
                      <img
                        className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                        src="https://www.shutterstock.com/image-photo/laptop-keyboard-stethoscope-on-blue-260nw-1907543080.jpg"
                        alt="Professional doctor consultation"
                        onError={handleImageError}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent" />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 left-4 bg-white rounded-lg shadow-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <p className="text-gray-800 font-medium">Live Consultations Available</p>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      Connect with doctors in real-time
                    </p>
                  </div>
                  <div className="absolute -top-4 right-4 bg-gradient-to-r from-emerald-500 to-blue-500 p-4 rounded-lg shadow-xl text-white">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="font-medium">Quick Appointments</p>
                    </div>
                    <p className="text-sm mt-1">Available within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;