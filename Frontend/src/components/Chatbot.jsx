import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Activity, Zap, User, Brain } from 'lucide-react';

const HealthcareBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "👋 Hello! I'm your healthcare assistant. Please enter your symptoms, and I'll suggest the right doctor for you."
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isLaunching, setIsLaunching] = useState(false);
  const chatContainerRef = useRef(null);
  const chatWrapperRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const symptomDoctorMap = {
    "fever": "General Physician",
    "cough": "Pulmonologist",
    "sore throat": "ENT Specialist",
    "runny or stuffy nose": "ENT Specialist",
    "muscle aches": "Rheumatologist",
    "headache": "Neurologist",
    "fatigue": "General Physician",
    "mucus production": "Pulmonologist",
    "shortness of breath": "Pulmonologist",
    "chest pain": "Cardiologist",
    "back pain": "Orthopedic Specialist",
    "joint pain": "Rheumatologist",
    "abdominal pain": "Gastroenterologist",
    "bloating": "Gastroenterologist",
    "diarrhea": "Gastroenterologist",
    "constipation": "Gastroenterologist",
    "nausea": "Gastroenterologist",
    "vomiting": "Gastroenterologist",
    "heartburn": "Gastroenterologist",
    "loss of appetite": "General Physician",
    "weight loss": "Endocrinologist",
    "weight gain": "Endocrinologist",
    "dizziness": "Neurologist",
    "fainting": "Neurologist",
    "numbness or tingling": "Neurologist",
    "weakness": "Neurologist",
    "memory loss": "Neurologist",
    "confusion": "Neurologist",
    "blurred vision": "Ophthalmologist",
    "double vision": "Ophthalmologist",
    "eye pain": "Ophthalmologist",
    "red eyes": "Ophthalmologist",
    "hearing loss": "ENT Specialist",
    "ear pain": "ENT Specialist",
    "ringing in ears": "ENT Specialist",
    "toothache": "Dentist",
    "gum bleeding": "Dentist",
    "mouth sores": "Dentist",
    "difficulty swallowing": "ENT Specialist",
    "sore tongue": "Dentist",
    "skin rash": "Dermatologist",
    "itchy skin": "Dermatologist",
    "dry skin": "Dermatologist",
    "acne": "Dermatologist",
    "hair loss": "Dermatologist",
    "excessive sweating": "Endocrinologist",
    "cold hands and feet": "Endocrinologist",
    "hot flashes": "Endocrinologist",
    "increased thirst": "Endocrinologist",
    "increased urination": "Endocrinologist",
    "frequent infections": "Immunologist",
    "slow wound healing": "Endocrinologist",
    "allergies": "Allergist",
    "asthma": "Pulmonologist",
    "snoring": "ENT Specialist",
    "sleep apnea": "Pulmonologist",
    "insomnia": "Sleep Specialist",
    "night sweats": "General Physician",
    "depression": "Psychiatrist",
    "anxiety": "Psychiatrist",
    "panic attacks": "Psychiatrist",
    "mood swings": "Psychiatrist",
    "hallucinations": "Psychiatrist",
    "paranoia": "Psychiatrist",
    "low libido": "Endocrinologist",
    "erectile dysfunction": "Urologist",
    "irregular periods": "Gynecologist",
    "heavy menstrual bleeding": "Gynecologist",
    "menstrual cramps": "Gynecologist",
    "menopause symptoms": "Gynecologist",
    "breast pain": "Gynecologist",
    "lump in breast": "Oncologist",
    "pelvic pain": "Gynecologist",
    "painful urination": "Urologist",
    "blood in urine": "Urologist",
    "frequent urination": "Urologist",
    "urinary incontinence": "Urologist",
    "kidney pain": "Nephrologist",
    "testicular pain": "Urologist",
    "swollen lymph nodes": "General Physician",
    "anemia": "Hematologist",
    "bruising easily": "Hematologist",
    "bleeding gums": "Dentist",
    "bone pain": "Orthopedic Specialist",
    "fractures": "Orthopedic Specialist",
    "spinal pain": "Orthopedic Specialist",
    "limping": "Orthopedic Specialist",
    "muscle cramps": "Rheumatologist",
    "tremors": "Neurologist",
    "seizures": "Neurologist",
    "yellowing of skin": "Hepatologist",
    "dark urine": "Hepatologist",
    "pale stools": "Hepatologist",
    "swelling in legs": "Cardiologist",
    "varicose veins": "Vascular Surgeon",
    "cold intolerance": "Endocrinologist",
    "heat intolerance": "Endocrinologist",
    "high blood pressure": "Cardiologist",
    "low blood pressure": "Cardiologist"
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { type: 'user', content: text }]);
    setMessage('');
    setIsLoading(true);
    setIsTyping(true);

    setTimeout(() => {
      let responseMessage = "I'm sorry, I couldn't find a doctor for your symptoms. Please consult a general physician.";
      for (const symptom in symptomDoctorMap) {
        if (text.toLowerCase().includes(symptom)) {
          responseMessage = `Based on your symptoms, you should consult a ${symptomDoctorMap[symptom]}.`;
          break;
        }
      }
      setIsTyping(false);
      setMessages(prev => [...prev, { type: 'bot', content: responseMessage }]);
      setIsLoading(false);
    }, 2000);
  };

  // Animation for the pulse effect
  const [pulse, setPulse] = useState(false);
  
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulse(prev => !prev);
    }, 2000);
    
    return () => clearInterval(pulseInterval);
  }, []);

  // Handle the macOS-style bounce animation when opening
  const handleOpenChat = () => {
    setIsLaunching(true);
    
    // After the bounce animation completes, show the chat window
    setTimeout(() => {
      setIsOpen(true);
      setIsLaunching(false);
    }, 800); // This timing aligns with our bounce animation duration
  };

  // Dragging functionality
  const handleMouseDown = (e) => {
    if (chatWrapperRef.current && e.target.closest('.drag-handle')) {
      setIsDragging(true);
      const rect = chatWrapperRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && chatWrapperRef.current) {
      const maxX = window.innerWidth - chatWrapperRef.current.offsetWidth;
      const maxY = window.innerHeight - chatWrapperRef.current.offsetHeight;
      
      let newX = e.clientX - dragOffset.x;
      let newY = e.clientY - dragOffset.y;
      
      // Keep the chat window within viewport bounds
      newX = Math.max(0, Math.min(maxX, newX));
      newY = Math.max(0, Math.min(maxY, newY));
      
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Set initial position based on window size
  useEffect(() => {
    setPosition({
      x: window.innerWidth - 420,
      y: window.innerHeight - 650
    });
  }, []);

  return (
    <>
      {!isOpen && (
        <button
          onClick={handleOpenChat}
          className={`fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 group z-50 ${isLaunching ? 'animate-macos-bounce' : ''}`}
          style={{
            boxShadow: pulse ? '0 0 20px 5px rgba(79, 70, 229, 0.6)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'all 1s ease-in-out'
          }}
        >
          <Activity className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute w-full h-full rounded-full border-4 border-indigo-300 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
        </button>
      )}

      {isOpen && (
        <div 
          ref={chatWrapperRef}
          className="fixed w-96 h-[500px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg shadow-2xl flex flex-col z-50 overflow-hidden border border-indigo-500/30 animate-window-appear"
          style={{ 
            left: `${position.x}px`, 
            top: `${position.y}px`,
            cursor: isDragging ? 'grabbing' : 'auto'
          }}
          onMouseDown={handleMouseDown}
        >
          {/* Decorative elements for futuristic feel */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 animate-gradient-x"></div>
          <div className="absolute top-10 right-4 w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
          <div className="absolute top-14 right-6 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-75"></div>
          
          {/* Header - draggable */}
          <div className="relative bg-slate-800 p-4 rounded-t-lg flex justify-between items-center border-b border-indigo-500/20 drag-handle cursor-grab">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Brain className="w-6 h-6 text-indigo-400" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"></span>
              </div>
              <div className="text-white">
                <h2 className="font-bold tracking-wide">MediAssist AI</h2>
                <div className="flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  <p className="text-xs text-slate-300">Active & Ready</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                className="text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-700"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat area */}
          <div 
            ref={chatContainerRef} 
            className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-slate-800"
            style={{
              backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0) 90%)'
            }}
          >
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}
              >
                {msg.type === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-2 shrink-0">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                )}
                <div 
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-tr-none' 
                      : 'bg-slate-700 text-slate-100 rounded-tl-none border-l-2 border-indigo-500'
                  }`}
                >
                  {msg.content}
                </div>
                {msg.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center ml-2 shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-2 shrink-0">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-slate-700 text-slate-100 rounded-tl-none border-l-2 border-indigo-500">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="border-t border-indigo-500/20 bg-slate-800 p-4">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Describe your symptoms..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(message);
                  }
                }}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-slate-700 text-white border border-indigo-500/30 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 placeholder-slate-400"
              />
              <button
                onClick={() => handleSendMessage(message)}
                disabled={isLoading || !message.trim()}
                className={`absolute right-2 p-2 ${
                  message.trim() ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-slate-600'
                } rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-glow`}
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
            
            {/* Decorated footer */}
            <div className="mt-2 flex justify-center">
              <div className="text-xs text-slate-500 flex items-center">
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent mr-2"></div>
                <span>Powered by AI Healthcare</span>
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent ml-2"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global styles */}
      <style jsx global>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 200% 200%;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .shadow-glow {
          box-shadow: 0 0 15px rgba(79, 70, 229, 0.7);
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #1f2937;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #4f46e5;
          border-radius: 20px;
        }
        
        /* macOS-style bounce animation */
        @keyframes macos-bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          20% { transform: translateY(-20px) scale(1.1); }
          40% { transform: translateY(0) scale(0.95); }
          60% { transform: translateY(-10px) scale(1.05); }
          80% { transform: translateY(0) scale(0.98); }
        }
        .animate-macos-bounce {
          animation: macos-bounce 0.8s ease-in-out forwards;
        }
        
        /* Window appear animation */
        @keyframes window-appear {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.05); }
          75% { transform: scale(0.98); }
          100% { transform: scale(1); }
        }
        .animate-window-appear {
          animation: window-appear 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default HealthcareBot;