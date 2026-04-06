import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Play, Pause, StopCircle, Settings, Volume2, X } from 'lucide-react';

const pickVoice = (voices) => {
  if (!voices?.length) return null;
  return (
    voices.find(v => v.lang === 'en-IN') ||
    voices.find(v => v.name.toLowerCase().includes('ravi')) ||
    voices.find(v => v.lang === 'en-GB') ||
    voices.find(v => v.lang.startsWith('en-US') && v.name.includes('Google')) ||
    voices.find(v => v.lang.startsWith('en')) ||
    voices[0]
  );
};

export default function VoiceReader({ currentSlide = 0, slideTexts = [] }) {
  const [isPlaying,    setIsPlaying]    = useState(false);
  const [isPaused,     setIsPaused]     = useState(false);
  const [isVisible,    setIsVisible]    = useState(false);
  const [progress,     setProgress]     = useState(0);
  const [autoPlay,     setAutoPlay]     = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [rate,         setRate]         = useState(1.0);
  const [pitch,        setPitch]        = useState(1.1);
  const [voices,       setVoices]       = useState([]);
  const [selVoice,     setSelVoice]     = useState(null);

  const audioRef  = useRef(null);
  const utterRef  = useRef(null);
  const prevSlide = useRef(-1);
  const audioType = useRef(''); // 'ogg' | 'tts'

  // Load TTS voices
  useEffect(() => {
    const load = () => {
      const v = window.speechSynthesis?.getVoices() || [];
      if (v.length) { setVoices(v); setSelVoice(pickVoice(v)); }
    };
    load();
    window.speechSynthesis?.addEventListener('voiceschanged', load);
    return () => {
      window.speechSynthesis?.removeEventListener('voiceschanged', load);
      stopAll();
    };
  }, []);

  // ── Stop all audio ────────────────────────────────────────────────────────
  const stopAll = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = '';
    }
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    audioType.current = '';
  }, []);

  // ── Audio mapping helper ──────────────────────────────────────────────────
  // Slide index → audio file ID (matches /audio/audio/slide_<id>.ogg)
  const getAudioId = (idx) => {
    // Slides 0-5: slide_0.ogg … slide_5.ogg
    if (idx <= 5) return idx.toString();
    // Chapter 6 group (slides 6-9)
    if (idx === 6)  return '6.1.1';  // Variables
    if (idx === 7)  return '6.1';    // Booleans
    if (idx === 8)  return '6.2';    // Local & Global Variables
    if (idx === 9)  return '6.3';    // Instance vs Class Variables
    // Chapter 7 group (slides 10-12)
    if (idx === 10) return '7.1.1';  // Data Types overview
    if (idx === 11) return '7.1';    // Primitive Data Types
    if (idx === 12) return '7.2';    // Non-Primitive Data Types
    // Chapter 8 group (slides 13-18)
    if (idx === 13) return '8.1.1';  // Operators overview
    if (idx === 14) return '8.1';    // Arithmetic Operators
    if (idx === 15) return '8.2';    // Conditional (Ternary) Operator
    if (idx === 16) return '8.3';    // Logical Operators
    if (idx === 17) return '8.4';    // Bitwise Operators
    if (idx === 18) return '8.5';    // Relational Operators
    // Chapter 9 group (slides 19-24)
    if (idx === 19) return '9.1.1';  // Conditional Statements overview
    if (idx === 20) return '9.1';    // if statement
    if (idx === 21) return '9.2';    // if-else
    if (idx === 22) return '9.3';    // Nested if
    if (idx === 23) return '9.4';    // elif ladder
    if (idx === 24) return '9.5';    // Ternary
    // Chapter 10 group (slides 25-30)
    if (idx === 25) return '10.1.1'; // Loops overview
    if (idx === 26) return '10.1';   // For Loops
    if (idx === 27) return '10.2';   // While Loops
    if (idx === 28) return '10.3';   // For-Each
    if (idx === 29) return '10.4';   // Do-While simulation
    if (idx === 30) return '10.5';   // Loop Control
    // Chapters 11-51 (slides 31-71) → slide_11.ogg … slide_51.ogg
    if (idx >= 31 && idx <= 71) return (idx - 20).toString();
    // Final congratulations slide (72) → slide_52.ogg
    if (idx === 72) return '52';
    return idx.toString();
  };

  // ── TTS setup ──────────────────────────────────────────────────────────
  const playTTS = useCallback((idx) => {
    const text = slideTexts[idx];
    if (!text || !('speechSynthesis' in window)) return;
    stopAll();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = rate; u.pitch = pitch; u.volume = 1;
    const v = selVoice || pickVoice(window.speechSynthesis.getVoices());
    if (v) u.voice = v;
    u.onboundary = e => { if (e.name === 'word') setProgress(Math.round((e.charIndex / text.length) * 100)); };
    u.onstart = () => { setIsPlaying(true);  setIsPaused(false); audioType.current = 'tts'; };
    u.onend   = () => { 
      setIsPlaying(false); setIsPaused(false); setProgress(100); audioType.current = '';
    };
    u.onerror = () => { setIsPlaying(false); audioType.current = ''; };
    utterRef.current = u;
    window.speechSynthesis.speak(u);
  }, [rate, pitch, selVoice, slideTexts, stopAll]);



  // ── Play OGG recorded audio ───────────────────────────────────────────────
  const playOgg = useCallback((idx) => {
    stopAll();
    const audioId = getAudioId(idx);
    if (audioId.startsWith('fallback_')) {
      playTTS(idx);
      return;
    }
    if (!audioRef.current) audioRef.current = new Audio();
    const a = audioRef.current;
    
    a.src = `/audio/audio/slide_${audioId}.ogg`;
    a.onplay       = () => { setIsPlaying(true);  setIsPaused(false); audioType.current = 'ogg'; };
    a.onpause      = () => { if (!a.ended) setIsPaused(true); };
    a.onended      = () => { 
      setIsPlaying(false); setIsPaused(false); setProgress(100); audioType.current = '';
    };
    a.onerror      = () => { audioType.current = ''; playTTS(idx); };
    a.ontimeupdate = () => { if (a.duration) setProgress(Math.round((a.currentTime / a.duration) * 100)); };
    a.play().catch(() => playTTS(idx));
  }, [stopAll, playTTS]);

  // ── Master play ───────────────────────────────────────────────────────────
  const playSlide = useCallback((idx) => { playOgg(idx); }, [playOgg]);

  // ── Pause / Resume ────────────────────────────────────────────────────────
  const pauseResume = useCallback(() => {
    if (audioType.current === 'ogg' && audioRef.current) {
      if (isPaused) { audioRef.current.play(); setIsPaused(false); }
      else          { audioRef.current.pause(); setIsPaused(true); }
    } else {
      if (isPaused) { window.speechSynthesis.resume(); setIsPaused(false); }
      else          { window.speechSynthesis.pause();  setIsPaused(true); }
    }
  }, [isPaused]);

  // ── Auto-play on slide change ─────────────────────────────────────────────
  useEffect(() => {
    if (!autoPlay || currentSlide === prevSlide.current) return;
    prevSlide.current = currentSlide;
    const t = setTimeout(() => playSlide(currentSlide), 700);
    return () => clearTimeout(t);
  }, [currentSlide, autoPlay, playSlide]);

  const chapterLabel = slideTexts[currentSlide]
    ?.split('.')[0]
    ?.replace(/^(Chapter \d+: |Bonus Chapter \d+: )/, '')
    ?.substring(0, 32) || 'Python Masterclass';

  return (
    <>
      {/* ── Floating button ── */}
      <motion.button
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        onClick={() => setIsVisible(v => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center"
        style={{ background: isPlaying
          ? 'linear-gradient(135deg,#f59e0b,#d97706)'
          : 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
        title="Voice Player"
      >
        <AnimatePresence mode="wait">
          {isPlaying
            ? <motion.div key="on" animate={{ scale: [1,1.3,1] }} transition={{ repeat: Infinity, duration: 0.7 }}>
                <Volume2 size={24} className="text-white" />
              </motion.div>
            : <motion.div key="off" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <Mic size={24} className="text-white" />
              </motion.div>
          }
        </AnimatePresence>
        {isPlaying && (
          <motion.span animate={{ scale: [1,1.5,1] }} transition={{ repeat: Infinity, duration: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white" />
        )}
      </motion.button>

      {/* ── Voice panel ── */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ type: 'spring', bounce: 0.3 }}
            className="fixed bottom-24 right-6 z-50 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
            style={{ width: 330 }}
          >
            {/* Header */}
            <div className="p-4 pb-3" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Mic size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-black text-white text-sm">🎙️ Voice Player</p>
                    <p className="text-indigo-200 text-xs">Slide {currentSlide + 1} / {slideTexts.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => setShowSettings(s => !s)}
                    className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                    <Settings size={13} className="text-white" />
                  </button>
                  <button onClick={() => setIsVisible(false)}
                    className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-red-400/60 transition-colors"
                    title="Close">
                    <X size={14} className="text-white" />
                  </button>
                </div>
              </div>
              {/* Progress bar */}
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div className="h-full bg-white rounded-full"
                  animate={{ width: `${progress}%` }} transition={{ duration: 0.15 }} />
              </div>
            </div>

            <div className="p-4 space-y-3">

              {/* Settings panel */}
              <AnimatePresence>
                {showSettings && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="bg-slate-50 rounded-2xl p-3 space-y-2 text-xs">
                      <p className="font-bold text-slate-500 uppercase tracking-wider">Fallback TTS Settings</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-700">Speed</span>
                        <span className="font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{rate.toFixed(2)}x</span>
                      </div>
                      <input type="range" min="0.6" max="1.5" step="0.05" value={rate}
                        onChange={e => setRate(+e.target.value)} className="w-full accent-indigo-600" />
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-700">Pitch</span>
                        <span className="font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{pitch.toFixed(2)}</span>
                      </div>
                      <input type="range" min="0.5" max="2.0" step="0.05" value={pitch}
                        onChange={e => setPitch(+e.target.value)} className="w-full accent-indigo-600" />
                      {voices.length > 0 && (
                        <select value={selVoice?.name || ''} onChange={e => setSelVoice(voices.find(v => v.name === e.target.value))}
                          className="w-full p-1.5 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none">
                          {voices.filter(v => v.lang.startsWith('en')).map(v =>
                            <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
                          )}
                        </select>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Auto-play toggle — always visible, prominent */}
              <div className={`flex items-center justify-between p-3 rounded-2xl border-2 cursor-pointer transition-all
                ${autoPlay
                  ? 'bg-emerald-50 border-emerald-300'
                  : 'bg-slate-50 border-slate-200'}`}
                onClick={() => setAutoPlay(a => !a)}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-5 rounded-full relative transition-all ${autoPlay ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                    <motion.div
                      animate={{ x: autoPlay ? 20 : 2 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
                    />
                  </div>
                  <span className={`text-xs font-black ${autoPlay ? 'text-emerald-700' : 'text-slate-500'}`}>
                    Auto-play
                  </span>
                </div>
                <span className={`text-xs font-black px-2 py-0.5 rounded-full ${autoPlay ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {autoPlay ? 'ON' : 'OFF'}
                </span>
              </div>

              {/* Current slide info */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-3">
                <p className="text-xs text-indigo-500 font-bold uppercase tracking-wider mb-0.5">Now on Slide {currentSlide + 1}</p>
                <p className="text-sm font-semibold text-slate-800 line-clamp-1">{chapterLabel}</p>
              </div>

              {/* Sound bars — visible when playing */}
              <AnimatePresence>
                {isPlaying && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-3">
                    <div className="flex items-end gap-1 h-9 mb-1">
                      {[...Array(16)].map((_, i) => (
                        <motion.div key={i} className="flex-1 rounded-full"
                          style={{ background: `hsl(${250 + i * 6}, 75%, ${isPaused ? 75 : 55}%)` }}
                          animate={isPaused ? { height: 3 } : { height: [3, 9 + Math.sin(i * 1.1) * 18 + 8, 3] }}
                          transition={{ repeat: Infinity, duration: 0.38 + i * 0.04, delay: i * 0.03 }}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-amber-700 font-bold text-center">
                      {isPaused ? '⏸ Paused' : '🎙️ Playing recorded voice...'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Controls */}
              <div className="space-y-2">
                {!isPlaying ? (
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={() => playSlide(currentSlide)}
                    className="w-full py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg text-sm"
                    style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                    <Play size={18} /> ▶ Play This Slide
                  </motion.button>
                ) : (
                  <div className="flex gap-2">
                    {/* Pause / Resume */}
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={pauseResume}
                      className="flex-1 py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2 text-sm"
                      style={{ background: isPaused
                        ? 'linear-gradient(135deg,#10b981,#059669)'
                        : 'linear-gradient(135deg,#f59e0b,#d97706)' }}>
                      {isPaused
                        ? <><Play size={16} /> Resume</>
                        : <><Pause size={16} /> Pause</>
                      }
                    </motion.button>
                    {/* Stop button — always visible when playing */}
                    <motion.button whileHover={{ scale: 1.05, backgroundColor: '#fee2e2' }} whileTap={{ scale: 0.95 }}
                      onClick={stopAll}
                      className="py-3.5 px-5 rounded-2xl bg-rose-100 text-rose-600 font-bold flex items-center gap-1.5 text-sm border-2 border-rose-200 transition-colors"
                      title="Stop">
                      <StopCircle size={18} />
                      Stop
                    </motion.button>
                  </div>
                )}
              </div>

              {/* All slides list */}
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">All Slides</p>
                <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
                  {slideTexts.map((text, i) => (
                    <button key={i} onClick={() => playSlide(i)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center gap-2
                        ${currentSlide === i && isPlaying
                          ? 'bg-amber-50 text-amber-800 font-bold border border-amber-200'
                          : currentSlide === i
                          ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100'
                          : 'text-slate-600 hover:bg-slate-50'}`}>
                      <span className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black
                        ${currentSlide === i ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                        {i + 1}
                      </span>
                      <span className="flex-1 line-clamp-1">
                        {text?.split('.')[0]?.replace(/^(Chapter \d+: |Bonus Chapter \d+: )/, '')?.substring(0, 28) || 'Slide ' + (i + 1)}
                      </span>
                      {isPlaying && currentSlide === i && (
                        <Volume2 size={11} className="text-amber-500 animate-pulse flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
