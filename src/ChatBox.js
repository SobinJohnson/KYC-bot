import React, { useState, useEffect, useRef } from "react";
import MainComponent from "./MainComponent";
import KYCCompletedPopup from "./KYCCompletedPopup";
import { Send, Bot, User, Camera, ShieldAlert } from "lucide-react";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [showCapturePhoto, setShowCapturePhoto] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [showKYCCompletedPopup, setShowKYCCompletedPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const endOfMessagesRef = useRef(null);

  const questions = [
    {
      type: "text",
      text: "To begin with, could you provide me with your name?",
      validation: /^[a-zA-Z\s]+$/,
      error: "Please enter a valid name.",
    },
    {
      type: "text",
      text: "Hey there, can you tell me your date of birth? (dd/mm/yyyy)",
      validation: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/,
      error: "Please enter a valid date of birth in the format dd/mm/yyyy.",
    },
    {
      type: "text",
      text: "Now, your address as well...",
      validation: /.+/,
      error: "Please enter a valid address.",
    },
    {
      type: "text",
      text: "What is your Aadhaar number? (12 digits without any spaces)",
      validation: /^\d{12}$/,
      error: "Please enter a valid 12-digit Aadhaar number.",
    },
    {
      type: "info",
      text: "Please orient your ID card or face to complete identity capture.",
    },
  ];

  useEffect(() => {
    if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      setMessages((prev) => {
        // Prevent duplicate consecutive bot messages (React 18 StrictMode fix)
        const lastMessage = prev[prev.length - 1];
        if (lastMessage && lastMessage.sender === "bot" && lastMessage.text === currentQuestion.text) {
          return prev;
        }
        return [...prev, { sender: "bot", text: currentQuestion.text }];
      });
      if (currentQuestionIndex === 4) {
        setShowCapturePhoto(true);
      }
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, errorMessage]);

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.validation && !currentQuestion.validation.test(answer)) {
      setErrorMessage(currentQuestion.error);
      return;
    }
    setErrorMessage("");
    setAnswers({ ...answers, [questions[currentQuestionIndex].text]: answer });
    setMessages((prev) => [...prev, { sender: "user", text: answer }]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setInputValue("");
    setShowCapturePhoto(false);
  };

  const handleSendInfo = () => {
    if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      setMessages((prev) => [...prev, { sender: "bot", text: currentQuestion.text }]);
      if (currentQuestionIndex === 4) {
        setShowCapturePhoto(true);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      handleAnswer(inputValue);
    }
  };

  const handleDocumentVerified = () => {
    setVerificationStatus("Document Verified with AI Matching");
    setShowKYCCompletedPopup(true);
  };

  const handleCloseKYCCompletedPopup = () => {
    setShowKYCCompletedPopup(false);
    window.location.reload();
  };

  return (
    <div className="flex flex-col h-full w-full bg-transparent text-gray-200">
      
      {/* Messages Scroll Area */}
      <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-end space-x-3 w-full animate-pop-message ${
              message.sender === "user" ? "justify-end origin-bottom-right" : "justify-start origin-bottom-left"
            }`}
          >
            {message.sender === "bot" && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center animate-avatar">
                <Bot className="w-4 h-4 text-blue-400" />
              </div>
            )}
            
            <div
              className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed transition-all duration-300 ${
                message.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  : "bg-white/5 border border-white/10 text-gray-300 rounded-bl-none shadow-lg backdrop-blur-sm"
              }`}
            >
              {message.text}
            </div>

            {message.sender === "user" && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center animate-avatar shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <User className="w-4 h-4 text-blue-200" />
              </div>
            )}
          </div>
        ))}
        {errorMessage && (
          <div className="flex justify-start items-center space-x-2 animate-fade-in-up text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-lg max-w-[80%]">
             <ShieldAlert className="w-4 h-4" />
             <span className="text-xs">{errorMessage}</span>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Verification Status */}
      {verificationStatus && (
        <div className="px-6 py-2 bg-green-500/10 border-t border-green-500/20 text-green-400 text-sm flex items-center justify-center glass-panel">
          <ShieldAlert className="w-4 h-4 mr-2" />
          {verificationStatus}
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 sm:p-6 bg-black/60 backdrop-blur-xl border-t border-white/10">
        {questions[currentQuestionIndex] && questions[currentQuestionIndex].type === "text" && (
          <div className="relative flex items-center group">
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-inner"
              value={inputValue}
              onKeyDown={handleKeyDown}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your response securely..."
            />
            <button
              className={`absolute right-2 p-2 rounded-lg transition-all duration-300 ease-out ${
                inputValue.trim()
                  ? "bg-blue-600 text-white hover:bg-blue-500 hover:scale-[1.15] active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.6)]"
                  : "bg-white/5 hover:bg-white/10 text-gray-500 opacity-50 cursor-not-allowed"
              }`}
              onClick={() => handleAnswer(inputValue)}
              disabled={!inputValue.trim()}
            >
              <Send className={`w-4 h-4 ${inputValue.trim() ? "animate-pulse" : ""}`} />
            </button>
          </div>
        )}
        
        {questions[currentQuestionIndex] && questions[currentQuestionIndex].type === "info" && !showCapturePhoto && (
          <button
            className="w-full flex items-center justify-center py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-blue-400 transition-colors"
            onClick={handleSendInfo}
          >
            <Camera className="w-5 h-5 mr-2" />
            <span className="font-semibold text-sm">Open Secure Camera</span>
          </button>
        )}
      </div>

      {showCapturePhoto && (
        <div className="absolute inset-0 z-50 rounded-3xl overflow-hidden">
          <MainComponent onDocumentAnalyzed={handleDocumentVerified} />
        </div>
      )}

      {showKYCCompletedPopup && (
        <KYCCompletedPopup onClose={handleCloseKYCCompletedPopup} />
      )}
    </div>
  );
};

export default ChatBox;
