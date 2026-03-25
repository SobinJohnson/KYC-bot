import React from "react";
import { CheckCircle } from "lucide-react";

const KYCCompletedPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50 animate-fade-in-up">
      <div className="bg-[#09090b] border border-white/10 p-10 rounded-3xl shadow-[0_0_50px_rgba(34,197,94,0.1)] text-center max-w-sm mx-4 neon-border relative overflow-hidden">
        {/* Glow behind icon */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-green-500/20 rounded-full blur-[50px] pointer-events-none" />
        
        <div className="flex justify-center mb-6 relative z-10">
          <div className="p-3 bg-green-500/20 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4 relative z-10 tracking-tight">
          Verification Complete
        </h2>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-8 relative z-10">
          Your identity document has been verified successfully using our secure AI infrastructure.
        </p>
        
        <button
          className="w-full bg-white text-black font-bold px-6 py-4 rounded-xl hover:bg-gray-200 transition-colors shadow-lg relative z-10"
          onClick={onClose}
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default KYCCompletedPopup;
