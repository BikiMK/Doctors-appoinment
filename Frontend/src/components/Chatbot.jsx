import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, MessageCircle, X, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const chatContainerRef = useRef(null);

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

  return (
    <>
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition"
          whileTap={{ scale: 0.9 }}
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-lg shadow-xl flex flex-col z-50"
          >
            <div className="bg-blue-500 p-4 rounded-t-lg flex justify-between items-center">
              <div className="text-white">
                <h2 className="font-semibold">Healthcare Assistant</h2>
                <p className="text-sm opacity-75">Always here to help</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-600 rounded-full p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                  <div className={`max-w-[80%] rounded-lg px-4 py-2 ${msg.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100 text-gray-800 italic">Typing...</div>
                </div>
              )}
            </div>

            <div className="border-t bg-white p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type your symptoms..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(message);
                    }
                  }}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
                <button
                  onClick={() => handleSendMessage(message)}
                  disabled={isLoading || !message.trim()}
                  className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HealthcareBot;