import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Activity } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-black py-8">
      
      {/* Dynamic Interactive Background Base */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-20 animate-pan-grid"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Dynamic Drifting Organic Blooms */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none animate-blob animation-delay-2000" />
      <div className="absolute -bottom-32 left-1/2 w-[600px] h-[600px] bg-pink-600/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none animate-blob animation-delay-4000" />

      {/* Dynamic Multi-color Neon Glow following the cursor (Spotlight) */}
      <div 
        className="absolute w-[800px] h-[800px] pointer-events-none z-0 mix-blend-screen transition-transform duration-75 ease-linear"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)',
          filter: 'blur(100px)',
          left: 0,
          top: 0,
          transform: `translate(${mousePosition.x - 300}px, ${mousePosition.y - 300}px)`
        }}
      />

      {/* Main Grid Wrapper */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
        
        {/* Left Side: Hero Text */}
        <div className="flex flex-col items-start text-left space-y-8 w-full block">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md animate-fade-in-up">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-300 font-bold tracking-widest uppercase">Identity Infrastructure</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 animate-fade-in-up delay-100 pb-2 leading-tight">
            Frictionless KYC <br/> at Global Scale
          </h1>
          
          <p className="max-w-md text-lg text-gray-400 animate-fade-in-up delay-200 leading-relaxed">
            Deploy bank-grade compliance infrastructure in minutes. Turn identity verification from a cost center into a competitive advantage with our AI-native engine.
          </p>

          <div className="pt-6 animate-fade-in-up delay-300">
            <button 
              onClick={() => navigate('/chat')}
              className="group relative flex items-center justify-center px-8 py-4 font-bold text-white uppercase tracking-[0.1em] text-xs transition-all duration-500 overflow-hidden bg-white/5 border border-white/20 rounded-xl hover:border-blue-500/50 hover:bg-white/10 hover:shadow-[0_0_50px_-10px_rgba(59,130,246,0.5)] transform hover:-translate-y-1 active:scale-95"
            >
              {/* Internal glowing gradient reveal */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[length:200%_auto] animate-pan-grid pointer-events-none" />
              
              <span className="relative z-10 flex items-center drop-shadow-lg">
                Access Platform
                <ArrowRight className="w-4 h-4 ml-3 transition-transform duration-500 group-hover:translate-x-1.5 text-blue-400 group-hover:text-white" />
              </span>
            </button>
          </div>
        </div>

        {/* Right Side: 3D Flipping Floating Cards */}
        <div className="flex flex-col space-y-8 animate-fade-in-up delay-400">
          
          {/* Card 1 */}
          <div className="group perspective w-full h-28 cursor-pointer animate-float">
            <div className="relative w-full h-full transition-transform duration-500 preserve-3d group-hover:rotate-y-180">
              {/* Front */}
              <div className="absolute inset-0 backface-hidden glass-panel p-6 rounded-2xl flex items-center border border-white/10 hover:border-blue-500/30">
                <div className="bg-blue-500/20 p-3 rounded-xl mr-5 text-blue-400 transition-colors">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Sub-second Verification</h3>
                </div>
              </div>
              {/* Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-blue-900/40 backdrop-blur-xl border border-blue-500/30 p-6 rounded-2xl flex items-center text-sm text-blue-100 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                Process global identity documents in under 800ms. Eliminate manual bottlenecks with deterministic ML-powered OCR extraction.
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group perspective w-full h-28 cursor-pointer transform md:-translate-x-6 animate-float" style={{ animationDelay: '1.5s' }}>
            <div className="relative w-full h-full transition-transform duration-500 preserve-3d group-hover:rotate-y-180">
              {/* Front */}
              <div className="absolute inset-0 backface-hidden glass-panel p-6 rounded-2xl flex items-center border border-white/10 hover:border-purple-500/30">
                <div className="bg-purple-500/20 p-3 rounded-xl mr-5 text-purple-400 transition-colors">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Dynamic Risk Scoring</h3>
                </div>
              </div>
              {/* Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-purple-900/40 backdrop-blur-xl border border-purple-500/30 p-6 rounded-2xl flex items-center text-sm text-purple-100 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                Continuously adapt to emerging fraud vectors. Synthesize behavior signals and global datasets to execute real-time threat modeling.
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group perspective w-full h-28 cursor-pointer animate-float" style={{ animationDelay: '3s' }}>
            <div className="relative w-full h-full transition-transform duration-500 preserve-3d group-hover:rotate-y-180">
              {/* Front */}
              <div className="absolute inset-0 backface-hidden glass-panel p-6 rounded-2xl flex items-center border border-white/10 hover:border-green-500/30">
                <div className="bg-green-500/20 p-3 rounded-xl mr-5 text-green-400 transition-colors">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">SOC-2 Type II Certified</h3>
                </div>
              </div>
              {/* Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-green-900/40 backdrop-blur-xl border border-green-500/30 p-6 rounded-2xl flex items-center text-sm text-green-100 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                Enterprise-grade encryption at rest and in transit. Your customers' PII is never logged to our persistent storage environments.
              </div>
            </div>
          </div>

        </div>
        
      </div>

      {/* Footer Copyright */}
      <div className="absolute bottom-6 w-full text-center z-20 pointer-events-none animate-fade-in-up" style={{ animationDelay: '1s' }}>
        <p className="text-gray-500/50 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase">
          &copy; {new Date().getFullYear()} Lighthouse Labs. All rights reserved.
        </p>
      </div>

    </div>
  );
};

export default LandingPage;
