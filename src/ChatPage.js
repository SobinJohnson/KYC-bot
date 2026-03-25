import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquareText } from 'lucide-react';
import ChatBox from './ChatBox';

const ChatPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-black overflow-hidden relative">
      {/* Abstract Background Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Navigation */}
      <header className="relative z-20 w-full border-b border-white/10 bg-black/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium text-sm">Back</span>
          </button>
          
          <div className="flex items-center space-x-2 text-white/80">
            <MessageSquareText className="w-5 h-5 text-blue-500" />
            <span className="font-bold tracking-wide">KYC Verification</span>
          </div>
          
          {/* Empty div for flex spacing alignment */}
          <div className="w-20"></div>
        </div>
      </header>

      {/* Main Chat Area Envelope */}
      <main className="flex-1 relative z-10 w-full flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-4xl h-[80vh] bg-[#0A0A0A] border border-white/10 shadow-2xl rounded-3xl overflow-hidden flex neon-border">
          {/* ChatBox injects here and takes over the container */}
          <ChatBox />
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
