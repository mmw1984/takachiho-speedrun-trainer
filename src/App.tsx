import React, { useState, useEffect } from 'react';
import { Timer, Zap, MousePointer2, Calendar, User, CheckCircle, ChevronRight, Trophy } from 'lucide-react';

const TARGET_DATE = new Date('2026-07-16T08:00:00+08:00');

function App() {
  const [step, setStep] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [clicks, setClicks] = useState(0);
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [results, setResults] = useState<{ time: number; apm: number; rank: string } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = TARGET_DATE.getTime() - now.getTime();
      if (diff > 0) {
        setCountdown({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / 1000 / 60) % 60),
          s: Math.floor((diff / 1000) % 60)
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const startTraining = () => {
    setStep(1);
    setStartTime(Date.now());
    setClicks(0);
    setResults(null);
  };

  const nextStep = () => {
    setClicks(prev => prev + 1);
    if (step === 5) {
      const end = Date.now();
      const totalTime = (end - (startTime || 0)) / 1000;
      const apm = Math.round((clicks + 1) / (totalTime / 60));
      let rank = "Jester";
      if (totalTime < 3) rank = "Grandmaster";
      else if (totalTime < 5) rank = "Master";
      else if (totalTime < 8) rank = "Diamond";
      else if (totalTime < 12) rank = "Platinum";
      
      setResults({ time: totalTime, apm, rank });
      setStep(6);
    } else {
      setStep(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 font-mono selection:bg-[#00f2ff] selection:text-black">
      <header className="max-w-4xl mx-auto flex justify-between items-center mb-12 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] to-[#bc13fe]">
            TAKACHIHO GORGE TRAINER
          </h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest">Kyushu Booking Speedrun System v1.0</p>
        </div>
        <div className="text-right">
          <div className="flex gap-4 text-xs font-bold text-[#00f2ff]">
            <div>{countdown.d}D</div>
            <div>{countdown.h}H</div>
            <div>{countdown.m}M</div>
            <div>{countdown.s}S</div>
          </div>
          <p className="text-[10px] text-slate-600 mt-1 uppercase">Until 07.16 08:00 HKT</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto">
        {step === 0 && (
          <div className="text-center space-y-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-[#00f2ff] blur-3xl opacity-20 animate-pulse"></div>
              <MousePointer2 className="w-16 h-16 mx-auto mb-4 text-[#00f2ff] relative" />
            </div>
            <h2 className="text-4xl font-black">ARE YOU READY?</h2>
            <p className="text-slate-400 max-w-sm mx-auto text-sm">
              The booking window opens in July. Every millisecond counts. 
              Train your muscle memory for the Tablecheck flow.
            </p>
            <button 
              onClick={startTraining}
              className="bg-white text-black px-12 py-4 font-black rounded-full hover:bg-[#00f2ff] transition-colors duration-300 transform hover:scale-105 active:scale-95"
            >
              INITIALIZE SPEEDRUN
            </button>
          </div>
        )}

        {step > 0 && step <= 5 && (
          <div className="bg-zinc-900/50 border border-white/10 p-8 rounded-2xl space-y-6">
             <div className="flex justify-between items-center mb-8">
               <div className="flex gap-2">
                 {[1,2,3,4,5].map(i => (
                   <div key={i} className={`w-12 h-1 rounded-full ${step >= i ? 'bg-[#00f2ff] shadow-[0_0_8px_rgba(0,242,255,0.5)]' : 'bg-white/10'}`}></div>
                 ))}
               </div>
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Phase {step} of 5</span>
             </div>

             {step === 1 && (
               <div className="space-y-6">
                 <h3 className="text-xl font-bold flex items-center gap-2"><Calendar className="text-[#00f2ff]"/> SELECT DATE</h3>
                 <div className="grid grid-cols-4 gap-2">
                   {[14, 15, 16, 17].map(d => (
                     <button key={d} onClick={nextStep} className="p-4 border border-white/10 rounded-lg hover:bg-white hover:text-black transition-all">Aug {d}</button>
                   ))}
                 </div>
               </div>
             )}

             {step === 2 && (
               <div className="space-y-6">
                 <h3 className="text-xl font-bold flex items-center gap-2"><Timer className="text-[#00f2ff]"/> SELECT TIME</h3>
                 <div className="grid grid-cols-3 gap-2">
                   {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map(t => (
                     <button key={t} onClick={nextStep} className="p-4 border border-white/10 rounded-lg hover:bg-white hover:text-black transition-all">{t}</button>
                   ))}
                 </div>
               </div>
             )}

             {step === 3 && (
               <div className="space-y-6">
                 <h3 className="text-xl font-bold flex items-center gap-2"><User className="text-[#00f2ff]"/> CONTACT INFO</h3>
                 <input type="text" placeholder="DUMMY NAME" className="w-full bg-black border border-white/10 p-4 rounded-lg focus:border-[#00f2ff] outline-none" />
                 <button onClick={nextStep} className="w-full bg-white text-black p-4 font-bold rounded-lg flex justify-between items-center">CONTINUE <ChevronRight /></button>
               </div>
             )}

             {step === 4 && (
               <div className="space-y-6">
                 <h3 className="text-xl font-bold flex items-center gap-2"><CheckCircle className="text-[#00f2ff]"/> TERMS & CONDITIONS</h3>
                 <div className="h-24 bg-black/40 border border-white/5 p-2 text-[10px] text-slate-500 overflow-hidden">
                   I agree to row the boat correctly and follow all safety protocols...
                 </div>
                 <button onClick={nextStep} className="w-full bg-[#00f2ff] text-black p-4 font-bold rounded-lg">I AGREE</button>
               </div>
             )}

             {step === 5 && (
               <div className="space-y-6">
                 <h3 className="text-xl font-bold flex items-center gap-2"><Zap className="text-[#39ff14]"/> VERIFICATION</h3>
                 <p className="text-sm text-slate-400">Click the green square to confirm you are human</p>
                 <div className="flex justify-center p-8">
                   <button onClick={nextStep} className="w-16 h-16 bg-[#39ff14] shadow-[0_0_20px_rgba(57,255,20,0.4)] rounded-lg hover:scale-110 active:scale-90 transition-transform"></button>
                 </div>
               </div>
             )}
          </div>
        )}

        {step === 6 && results && (
          <div className="text-center space-y-12">
            <div className="relative inline-block">
              <Trophy className="w-20 h-20 mx-auto text-[#00f2ff]" />
              <div className="absolute -top-4 -right-4 bg-[#bc13fe] text-[10px] font-black px-2 py-1 rounded">LVL. MAX</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-zinc-900 p-4 rounded-xl border border-white/5">
                <div className="text-[10px] text-slate-500 uppercase">Total Time</div>
                <div className="text-2xl font-black">{results.time.toFixed(2)}s</div>
              </div>
              <div className="bg-zinc-900 p-4 rounded-xl border border-white/5">
                <div className="text-[10px] text-slate-500 uppercase">APM</div>
                <div className="text-2xl font-black">{results.apm}</div>
              </div>
              <div className="bg-zinc-900 p-4 rounded-xl border border-white/5">
                <div className="text-[10px] text-slate-500 uppercase">Rank</div>
                <div className={`text-xl font-black ${results.rank === 'Grandmaster' ? 'text-[#39ff14]' : 'text-[#bc13fe]'}`}>{results.rank}</div>
              </div>
            </div>

            <button 
              onClick={() => setStep(0)}
              className="border-2 border-white/10 hover:border-white px-8 py-3 rounded-full text-sm font-bold transition-all"
            >
              REBOOT TRAINING
            </button>
          </div>
        )}
      </main>

      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-700 uppercase tracking-[0.2em]">
        Handcrafted for tactile perfection • Low Latency Engine v1.0
      </footer>
    </div>
  );
}

export default App;