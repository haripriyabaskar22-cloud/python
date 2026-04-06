import React from 'react';
import { motion } from 'motion/react';
import Slide, { SlideItem } from '../components/Slide';
import Diagram from '../components/Diagram';
import SidePanel from '../components/SidePanel';
import VoiceReader from '../components/VoiceReader';
import { SLIDE_TEXTS } from '../data/slideContent';
import ProgressBar from '../components/ProgressBar';
import InteractiveBackground from '../components/InteractiveBackground';
import '../styles/course.css';

// Hook for click-glow effect
function useClickGlow() {
  const handleClick = (e) => {
    const el = e.currentTarget;
    el.classList.remove('clicked');
    void el.offsetWidth; // reflow
    el.classList.add('clicked');
    setTimeout(() => el.classList.remove('clicked'), 800);
  };
  return handleClick;
}

const CodeBlock = ({ filename, code }) => {
  const handleClick = useClickGlow();
  return (
    <div
      className="bg-[#0d1117] rounded-3xl overflow-hidden shadow-2xl text-left w-full max-w-4xl code-block-hover"
      onClick={handleClick}
      style={{ border: '1px solid rgba(56,189,248,0.15)' }}
    >
      <div className="bg-[#161b22] px-6 py-4 flex items-center gap-2 border-b border-[#30363d]">
        <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
        <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
        <span className="text-[#8b949e] ml-4 font-mono text-sm">{filename}</span>
      </div>
      <pre className="p-8 text-base font-mono leading-relaxed overflow-x-auto text-[#e6edf3] whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const InfoCard = ({ icon, title, desc, color }) => {
  const handleClick = useClickGlow();
  return (
    <div
      className={`p-6 rounded-2xl border-2 text-left h-full info-card-hover dark-card`}
      onClick={handleClick}
      style={{ color: '#e2e8f0' }}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-base opacity-80 leading-relaxed text-slate-300">{desc}</p>
    </div>
  );
};

const ChapterBadge = ({ num, color = 'bg-blue-100 text-blue-800' }) => (
  <span
    className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-6 chapter-badge-hover"
    style={{
      background: 'rgba(56,189,248,0.15)',
      color: '#93c5fd',
      border: '1px solid rgba(56,189,248,0.35)',
    }}
  >
    Chapter {num}
  </span>
);

// Dark styled small grid card
const DarkCard = ({ children, onClick }) => {
  const handleClick = useClickGlow();
  return (
    <div
      className="p-4 rounded-2xl border-2 text-center dark-card"
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default function PythonCourse() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const slides = container.querySelectorAll('.slide-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Array.from(slides).indexOf(entry.target);
            if (idx !== -1) setCurrentSlide(idx);
          }
        });
      },
      { root: container, threshold: 0.2 }
    );
    slides.forEach(slide => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  const slideStyle = { background: 'transparent' };

  return (
    <div ref={containerRef} className="course-container font-sans selection:bg-yellow-200 relative overflow-hidden" style={{ background: '#05091a' }}>
      {/* Dark Interactive Background from C project */}
      <InteractiveBackground />

      <ProgressBar />
      <SidePanel currentSlide={currentSlide} />
      <VoiceReader currentSlide={currentSlide} slideTexts={SLIDE_TEXTS} />

      <div className="relative z-10">

        {/* Slide 0: Title */}
        <Slide style={{ background: 'transparent', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.10, 0.20, 0.10] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="absolute top-10 left-10 w-96 h-96 rounded-full"
              style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)' }} />
            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.18, 0.08] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 2 }}
              className="absolute bottom-10 right-10 w-80 h-80 rounded-full"
              style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }} />
          </div>
          <div className="flex flex-col items-center justify-center w-full max-w-6xl z-10 px-6 gap-10">
            {/* Left Box: SVG and Title */}
            <div className="flex flex-col items-center text-center">
              <SlideItem>
                <motion.div animate={{ y: [0, -10, 0], rotate: [-1, 1, -1] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }} className="mb-6 drop-shadow-2xl">
                  <svg width="120" height="120" viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="pyBlue" x1="12%" y1="12%" x2="88%" y2="88%"><stop offset="0%" stopColor="#387EB8" /><stop offset="100%" stopColor="#366994" /></linearGradient>
                      <linearGradient id="pyYellow" x1="12%" y1="12%" x2="88%" y2="88%"><stop offset="0%" stopColor="#FFE052" /><stop offset="100%" stopColor="#FFC331" /></linearGradient>
                    </defs>
                    <path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z" fill="url(#pyBlue)" />
                    <path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21H100.472s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.76 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z" fill="url(#pyYellow)" />
                  </svg>
                </motion.div>
              </SlideItem>
              <SlideItem delay={0.1}><h1 className="text-6xl md:text-8xl font-black text-white mb-2 tracking-tight" style={{ textShadow: '0 0 60px rgba(56,189,248,0.5), 0 4px 20px rgba(0,0,0,0.4)' }}>PYTHON</h1></SlideItem>
              <SlideItem delay={0.2}><h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: '#38bdf8' }}>MASTERCLASS</h2></SlideItem>
              <SlideItem delay={0.3}><p className="text-lg md:text-xl text-blue-100/90 font-medium max-w-lg leading-relaxed mb-8">From Basics to Advanced projects — everything you need in <strong className="text-white">51 Chapters</strong>.</p></SlideItem>
            </div>

            {/* Right Box: Hero Image & Play Button */}
            <div className="flex flex-col items-center">
              <SlideItem delay={0.4}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative group rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(56,189,248,0.3)] border-2 border-white/10 w-64 h-64 md:w-80 md:h-80 mx-auto"
                >
                  <img src="/python_hero.png" alt="Python Hero" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
                    <motion.button
                      onClick={() => window.dispatchEvent(new CustomEvent('open-side-modal', { detail: { modal: 'youtube' } }))}
                      className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white active:scale-95 transition-transform"
                    >
                      <div className="ml-1 w-0 h-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-white"></div>
                    </motion.button>
                  </div>
                </motion.div>
              </SlideItem>
              <SlideItem delay={0.5}>
                <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Watch Main Content
                </p>
              </SlideItem>
            </div>
          </div>

          <div className="w-full max-w-6xl z-10 px-6 mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <SlideItem delay={0.6}>
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center hover:bg-slate-800/80 transition-colors shadow-lg active:scale-95 cursor-pointer">
                <span className="text-3xl mb-4 block">🤖</span>
                <h3 className="text-white font-bold text-lg mb-2">AI Coding Tutor</h3>
                <p className="text-slate-400 text-sm">Instant answers to any Python coding question, 24/7.</p>
              </div>
            </SlideItem>
            <SlideItem delay={0.7}>
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center hover:bg-slate-800/80 transition-colors shadow-lg active:scale-95 cursor-pointer">
                <span className="text-3xl mb-4 block">🎙️</span>
                <h3 className="text-white font-bold text-lg mb-2">Voice Narrator</h3>
                <p className="text-slate-400 text-sm">Every slide is professionally narrated for better learning.</p>
              </div>
            </SlideItem>
            <SlideItem delay={0.8}>
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center hover:bg-slate-800/80 transition-colors shadow-lg active:scale-95 cursor-pointer">
                <span className="text-3xl mb-4 block">🧪</span>
                <h3 className="text-white font-bold text-lg mb-2">Code Examples</h3>
                <p className="text-slate-400 text-sm">Interactive code snippets you can copy and try instantly.</p>
              </div>
            </SlideItem>
          </div>

          {/* Re-added Start Masterclass button per user feedback */}
          <SlideItem delay={1.0}>
            <div className="flex justify-center mt-12 mb-16 px-4">
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const slides = document.querySelectorAll('.slide-section');
                  if (slides[1]) slides[1].scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-4 px-12 rounded-full font-black text-xl text-white shadow-[0_0_30px_rgba(59,130,246,0.3)] flex items-center justify-center gap-3 transition-all"
                style={{ background: 'linear-gradient(135deg, #2563eb, #1e40af)', border: '1px solid rgba(59,130,246,0.5)' }}>
                <span>🚀</span> Start Masterclass
              </motion.button>
            </div>
          </SlideItem>
          <SlideItem delay={0.6}>
            <div className="flex gap-3 flex-wrap justify-center mb-8">
              {['🟡 Python 3.x', '🟢 Beginner Friendly', '🔵 Full OOP', '🟣 Advanced Topics'].map((b, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: 'rgba(255,255,255,0.08)', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.15)' }}>{b}</span>
              ))}
            </div>
          </SlideItem>
          {/* Removed Start Course and Watch Videos buttons */}
          <SlideItem delay={0.8}>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="flex flex-col items-center">
              <div className="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center pt-1.5 mb-1.5">
                <motion.div animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1 h-2.5 bg-white/70 rounded-full" />
              </div>
              <p className="text-white/50 text-[10px] font-bold tracking-widest uppercase">Scroll down</p>
            </motion.div>
          </SlideItem>
        </Slide>

        {/* Ch1: Introduction */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="1" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Introduction to Python</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">A <strong className="text-yellow-400">high-level, interpreted</strong> language with clean readable syntax. Perfect for beginners and experts alike!</p></SlideItem>
          <SlideItem delay={0.4}>
            <div className="rounded-3xl w-full max-w-4xl text-left mb-8 p-8 dark-card" style={{ border: '2px solid rgba(56,189,248,0.25)' }}>
              <h3 className="text-2xl font-bold text-white mb-4">🌍 Real World Uses:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[['🌐', 'Web Dev'], ['📊', 'Data Science'], ['🤖', 'AI & ML'], ['🔧', 'Automation'], ['🎮', 'Game Dev'], ['📱', 'Mobile Apps'], ['🔬', 'Research'], ['☁️', 'Cloud/DevOps']].map(([icon, label], i) => {
                  const handleClick = useClickGlow();
                  return (
                    <div key={i} onClick={handleClick} className="text-center p-3 rounded-2xl dark-card">
                      <div className="text-3xl mb-1">{icon}</div>
                      <div className="font-bold text-sky-300 text-xs">{label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </SlideItem>
          <SlideItem delay={0.6}><Diagram type="intro" /></SlideItem>
        </Slide>

        {/* Ch2: History */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="2" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">History of Python</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Created by <strong className="text-orange-400">Guido van Rossum</strong> in 1989 as a Christmas hobby project. Named after <strong className="text-orange-400">Monty Python</strong>, not the snake!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full"><Diagram type="timeline" /></SlideItem>
          <SlideItem delay={0.6}>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full">
              {[['1989', 'Guido starts Python'], ['1991', 'Python 1.0 released'], ['2008', 'Python 3.0 launch'], ['2024', "World's #1 language"]].map(([yr, ev], i) => {
                const handleClick = useClickGlow();
                return (
                  <div key={i} onClick={handleClick} className="rounded-2xl p-4 text-center dark-card">
                    <div className="text-2xl font-black text-sky-400">{yr}</div>
                    <div className="text-sm text-slate-300 font-medium mt-1">{ev}</div>
                  </div>
                );
              })}
            </div>
          </SlideItem>
        </Slide>

        {/* Ch3: Features */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="3" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Features of Python</h2></SlideItem>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
            {[
              { icon: '📖', title: 'Simple Syntax', desc: 'Reads like plain English — indentation instead of curly braces.' },
              { icon: '⚡', title: 'Interpreted', desc: 'Runs line by line — no compilation step, fast development cycle.' },
              { icon: '🔀', title: 'Dynamically Typed', desc: 'No type declarations needed — Python infers types at runtime.' },
              { icon: '🌍', title: 'Platform Independent', desc: 'Write once, run on Windows, Mac, and Linux without changes.' },
              { icon: '📦', title: 'Extensive Libraries', desc: '300,000+ packages on PyPI — NumPy, Django, TensorFlow and more.' },
              { icon: '🎯', title: 'Multi-paradigm', desc: 'Procedural, object-oriented, and functional — choose your style.' },
            ].map((f, i) => (<SlideItem key={i} delay={0.1 + i * 0.1}><InfoCard {...f} /></SlideItem>))}
          </div>
        </Slide>

        {/* Ch4: Architecture */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="4" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Python Architecture</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Python source is compiled to <strong className="text-purple-400">bytecode</strong> and executed by the <strong className="text-purple-400">PVM</strong> (Python Virtual Machine)!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full"><Diagram type="architecture" /></SlideItem>
          <SlideItem delay={0.6}>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full">
              {[
                { icon: '📄', title: 'Source .py', desc: 'Human-readable Python code you write' },
                { icon: '⚙️', title: 'Compiler', desc: 'Translates to platform-independent bytecode' },
                { icon: '💾', title: 'Bytecode .pyc', desc: 'Cached in __pycache__ for speed' },
                { icon: '🖥️', title: 'PVM', desc: 'Python Virtual Machine executes bytecode' },
              ].map((item, i) => {
                const handleClick = useClickGlow();
                return (
                  <SlideItem key={i} delay={0.6 + i * 0.1}>
                    <div onClick={handleClick} className="rounded-2xl p-4 text-center dark-card">
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <h3 className="font-bold text-sky-300 text-sm">{item.title}</h3>
                      <p className="text-slate-400 text-xs mt-1">{item.desc}</p>
                    </div>
                  </SlideItem>
                );
              })}
            </div>
          </SlideItem>
        </Slide>

        {/* Ch5: Hello World */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="5" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Hello World</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Your first Python program — just <strong className="text-sky-400">one line</strong>! Install Python, open terminal, run <code className="bg-sky-900/40 px-2 py-0.5 rounded font-mono text-sky-300">python hello.py</code></p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="hello.py" code={`# My first Python program\nprint("Hello, World!")\nprint("Welcome to Python! 🐍")\n\n# Variables and print\nname = "Ravi"\nage = 21\nprint(f"My name is {name} and I am {age} years old.")`} />
          </SlideItem>
          <SlideItem delay={0.6}>
            <div className="mt-6 rounded-2xl px-8 py-4 font-mono text-green-400 text-lg terminal-dark">
              <span className="text-slate-500">$ </span>python hello.py<br />
              <span className="text-green-400">Hello, World!</span><br />
              <span className="text-green-400">Welcome to Python! 🐍</span>
            </div>
          </SlideItem>
        </Slide>

        {/* Ch6.1.1: Variables */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="6.1.1" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Variables</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">A variable is a <strong className="text-emerald-400">named memory container</strong> — no type declaration needed! Python figures it out automatically.</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="variables.py" code={`age = 21              # Integer\nname = "Ravi"         # String\nprice = 9.99          # Float\nx, y, z = 1, 2, 3    # Multiple assignment\nprint(id(age))        # Memory address\nprint(type(name))     # <class 'str'>`} />
          </SlideItem>
          <SlideItem delay={0.6}><Diagram type="variable" /></SlideItem>
          <SlideItem delay={0.8}>
            <div className="mt-4 p-5 rounded-2xl max-w-3xl dark-card">
              <p className="text-slate-300 font-medium">Use <strong className="text-sky-400">snake_case</strong>: <code className="bg-sky-900/30 px-2 py-0.5 rounded font-mono text-sky-300">student_age</code>, <code className="bg-sky-900/30 px-2 py-0.5 rounded font-mono text-sky-300">total_marks</code></p>
            </div>
          </SlideItem>
        </Slide>
        {/* Ch6.1: Booleans (bool) */}
        <Slide style={{ background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)' }}>
          <SlideItem><ChapterBadge num="6.1" color="bg-red-100 text-red-800" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-green-900">Booleans (<code className="text-red-600">bool</code>)</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-600 leading-relaxed max-w-4xl mb-8">Booleans represent truth values: <code className="bg-white px-2 py-0.5 rounded font-mono">True</code> or <code className="bg-white px-2 py-0.5 rounded font-mono">False</code>. Used in conditions, comparisons, and logical operations. Subclass of <code>int</code> (True = 1, False = 0).</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="booleans.py" code={`# Boolean literals
is_python_fun = True
is_raining = False

# Comparisons return booleans
age = 18
can_vote = age >= 18    # True

# Logical operators
result = is_python and not is_raining

# Numeric values
print(int(True))        # 1
print(True + 5)         # 6 (but don't do this)`} />
          </SlideItem>
          <SlideItem delay={0.6}><div className="p-5 bg-red-50 border-2 border-red-200 rounded-2xl max-w-3xl"><p className="text-red-800">✅ <strong>Truthy/Falsy:</strong> In conditions, empty sequences, zero, None are falsy; everything else is truthy.</p></div></SlideItem>
        </Slide>
        {/* Ch6.2: Variable Scope - Local & Global */}
        <Slide style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)' }}>
          <SlideItem><ChapterBadge num="6.2" color="bg-indigo-100 text-indigo-800" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-slate-900">Local &amp; Global Variables</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-white-600 leading-relaxed max-w-4xl mb-8"><strong>Local variables</strong> are defined inside a function and exist only there.<br /><strong>Global variables</strong> are defined at the top level and are accessible everywhere. Use <code className="bg-white px-2 py-0.5 rounded font-mono">global</code> keyword to modify a global variable inside a function.</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="scope.py" code={`# Global variable
counter = 0

def increment():
    global counter   # needed to modify global
    counter += 1

def show():
    local_var = 10   # local to show()
    print(f"Local: {local_var}")
    print(f"Global: {counter}")

increment()
increment()
show()
# Output: Local: 10, Global: 2`} />
          </SlideItem>
          <SlideItem delay={0.6}><div className="p-5 bg-indigo-50 border-2 border-indigo-200 rounded-2xl max-w-3xl"><p className="text-indigo-800">🌐 <strong>Remember:</strong> Inside a function, if you assign to a variable, it becomes local by default. To modify a global variable, you must use the <code>global</code> keyword.</p></div></SlideItem>
        </Slide>

        {/* Ch6.3: Instance & Class (Static) Variables */}
        <Slide style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' }}>
          <SlideItem><ChapterBadge num="6.3" color="bg-amber-100 text-amber-800" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white-900">Instance vs Class Variables</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-white-600 leading-relaxed max-w-4xl mb-8"><strong>Instance variables</strong> belong to individual objects; each object has its own copy.<br /><strong>Class variables</strong> (similar to static) are shared across all instances of the class.</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="class_vars.py" code={`class Student:
    school = "ABC School"       # class variable (shared)
    count = 0                   # class variable for tracking

    def __init__(self, name):
        self.name = name        # instance variable (unique)
        Student.count += 1      # modify class variable

    def display(self):
        print(f"{self.name} studies at {self.school}")

# Creating instances
s1 = Student("Ravi")
s2 = Student("Priya")
s1.display()    # Ravi studies at ABC School
s2.display()    # Priya studies at ABC School

print(Student.count)   # 2 (shared across all objects)

# Changing class variable affects all instances
Student.school = "XYZ School"
s1.display()    # Ravi studies at XYZ School`} />
          </SlideItem>
          <SlideItem delay={0.6}><div className="p-5 bg-amber-50 border-2 border-amber-200 rounded-2xl max-w-3xl"><p className="text-amber-800">🏷️ <strong>Key insight:</strong> Use class variables for constants or data that should be common across all instances; use instance variables for data that is unique per object.</p></div></SlideItem>
        </Slide>


        {/* Code block using plain <pre> with Tailwind */}
        <SlideItem delay={0.3} className="w-full max-w-4xl mt-4">
          <div className="bg-slate-800 rounded-xl shadow-xl overflow-hidden">
            <div className="flex items-center px-4 py-2 bg-slate-700 border-b border-slate-600">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="ml-4 text-slate-300 text-sm font-mono">list_operations.py</span>
            </div>
            <pre className="p-5 font-mono text-sm overflow-x-auto bg-slate-800 text-slate-200">
              {`# Create and access
scores = [85, 92, 78, 96, 88]

print(scores[0])    # 85
print(scores[-1])   # 88 (last)

# Loop through list
for score in scores:
    print(score)`}
            </pre>
          </div>
        </SlideItem>
        {/* Ch7.1.1: Data Types */}
        <Slide style={{ background: 'linear-gradient(135deg, #fdf4ff 0%, #fce7f3 100%)' }}>
          <SlideItem>
            <ChapterBadge num="7.1.1" color="bg-pink-100 text-pink-800" />
            <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-slate-900">Data Types</h2>
          </SlideItem>

          {/* Definition */}
          <SlideItem delay={0.2}>
            <p className="text-xl text-slate-600 leading-relaxed max-w-4xl mb-6">
              Python is <strong className="text-pink-600">dynamically typed</strong> — types are determined at runtime.
              Types fall into <strong className="text-blue-600">primitive (immutable)</strong> and
              <strong className="text-emerald-600"> non‑primitive (container)</strong> categories.
              Use <code className="bg-pink-50 px-2 py-0.5 rounded font-mono text-pink-700">type()</code> to check!
            </p>
          </SlideItem>

          {/* Visual Type Grid (like a diagram) */}
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              {[
                { name: 'int', desc: 'Whole numbers', color: 'bg-blue-100 text-blue-800' },
                { name: 'float', desc: 'Decimals', color: 'bg-emerald-100 text-emerald-800' },
                { name: 'str', desc: 'Text', color: 'bg-amber-100 text-amber-800' },
                { name: 'bool', desc: 'True/False', color: 'bg-rose-100 text-rose-800' },
                { name: 'list', desc: 'Ordered, mutable', color: 'bg-purple-100 text-purple-800' },
                { name: 'tuple', desc: 'Ordered, immutable', color: 'bg-cyan-100 text-cyan-800' },
                { name: 'dict', desc: 'Key‑value', color: 'bg-orange-100 text-orange-800' },
                { name: 'set', desc: 'Unique items', color: 'bg-indigo-100 text-indigo-800' },
              ].map((t, i) => (
                <div key={i} className={`p-3 rounded-xl border ${t.color} border-opacity-30`}>
                  <div className="font-mono font-bold text-lg">{t.name}</div>
                  <div className="text-xs opacity-70">{t.desc}</div>
                </div>
              ))}
            </div>
          </SlideItem>

          {/* Code Block */}
          <SlideItem delay={0.6} className="w-full max-w-4xl mt-6">
            <CodeBlock
              filename="types.py"
              code={`# Primitive types
age = 25          # int
name = "Ravi"     # str
is_student = True # bool

# Non‑primitive types
scores = [85, 92, 78]      # list
person = {"name": "Ravi"}  # dict

# Check types
print(type(age))    # <class 'int'>
print(type(scores)) # <class 'list'>`}
            />
          </SlideItem>
        </Slide>
        {/* Ch7.1: Primitive Data Types */}
        <Slide style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)' }}>
          <SlideItem>
            <ChapterBadge num="7.1" color="bg-indigo-100 text-indigo-800" />
            <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white-900">Primitive Data Types</h2>
          </SlideItem>

          <SlideItem delay={0.2}>
            <p className="text-xl text-slate-600 leading-relaxed max-w-4xl">
              Primitive types hold a <strong>single immutable value</strong>. Python determines the type at runtime.
              They include numbers, text, booleans, and the special <code>None</code> value.
            </p>
          </SlideItem>

          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
              {[
                { name: 'int', desc: 'Whole numbers', color: 'bg-blue-100 text-blue-800' },
                { name: 'float', desc: 'Decimals', color: 'bg-emerald-100 text-emerald-800' },
                { name: 'str', desc: 'Text', color: 'bg-amber-100 text-amber-800' },
                { name: 'bool', desc: 'True/False', color: 'bg-rose-100 text-rose-800' },
                { name: 'NoneType', desc: 'No value', color: 'bg-slate-100 text-slate-800' },
              ].map((t, i) => (
                <div key={i} className={`p-3 rounded-xl border ${t.color} border-opacity-30`}>
                  <div className="font-mono font-bold text-lg">{t.name}</div>
                  <div className="text-xs opacity-70">{t.desc}</div>
                </div>
              ))}
            </div>
          </SlideItem>

          <SlideItem delay={0.6} className="w-full max-w-4xl mt-6">
            <CodeBlock
              filename="primitive.py"
              code={`age = 25          # int
name = "Ravi"     # str
is_student = True # bool
nothing = None    # NoneType

print(type(age))  # <class 'int'>`}
            />
          </SlideItem>
        </Slide>

        {/* Ch7.2: Non‑Primitive (Container) Data Types */}
        <Slide style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)' }}>
          <SlideItem>
            <ChapterBadge num="7.2" color="bg-emerald-100 text-emerald-800" />
            <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-slate-900">Non‑Primitive Data Types</h2>
          </SlideItem>

          <SlideItem delay={0.2}>
            <p className="text-xl text-slate-600 leading-relaxed max-w-4xl">
              Non‑primitive (container) types can hold <strong>multiple values</strong> and are usually mutable.
              They are built from primitive types and provide powerful data structures.
            </p>
          </SlideItem>

          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              {[
                { name: 'list', desc: 'Ordered, mutable', color: 'bg-purple-100 text-purple-800' },
                { name: 'tuple', desc: 'Ordered, immutable', color: 'bg-cyan-100 text-cyan-800' },
                { name: 'dict', desc: 'Key‑value', color: 'bg-orange-100 text-orange-800' },
                { name: 'set', desc: 'Unique items', color: 'bg-indigo-100 text-indigo-800' },
              ].map((t, i) => (
                <div key={i} className={`p-3 rounded-xl border ${t.color} border-opacity-30`}>
                  <div className="font-mono font-bold text-lg">{t.name}</div>
                  <div className="text-xs opacity-70">{t.desc}</div>
                </div>
              ))}
            </div>
          </SlideItem>

          <SlideItem delay={0.6} className="w-full max-w-4xl mt-6">
            <CodeBlock
              filename="non_primitive.py"
              code={`fruits = ["apple", "banana"]   # list
person = {"name": "Ravi"}        # dict
unique = {1, 2, 3}               # set

print(type(fruits))  # <class 'list'>`}
            />
          </SlideItem>
        </Slide>
        {/* Ch8.1.1: Operators */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="8.1.1" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Operators</h2></SlideItem>
          <SlideItem delay={0.2} className="w-full"><Diagram type="operators" /></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl mt-6">
            <CodeBlock filename="operators.py" code={`a, b = 10, 3\nprint(a + b)    # 13 (add)\nprint(a ** b)   # 1000 (power)\nprint(a // b)   # 3 (floor div)\nprint(a % b)    # 1 (modulo)\nprint(a > b and b > 0)  # True`} />
          </SlideItem>
        </Slide>
        {/* Ch8.1: Arithmetic Operators */}
        <Slide style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%)' }}>
          <SlideItem>
            <ChapterBadge num="8.1" color="bg-amber-100 text-amber-800" />
            <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white-900">Arithmetic Operators</h2>
          </SlideItem>
          <SlideItem delay={0.2}>
            <p className="text-xl text-slate-600 leading-relaxed max-w-4xl">
              Arithmetic operators perform mathematical calculations: addition, subtraction, multiplication, division, floor division, modulus, and exponentiation.
            </p>
          </SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              {['+', '-', '*', '/', '//', '%', '**'].map(op => (
                <div key={op} className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <div className="font-mono font-bold text-2xl">{op}</div>
                  <div className="text-xs text-slate-500">
                    {op === '+' && 'Addition'}
                    {op === '-' && 'Subtraction'}
                    {op === '*' && 'Multiplication'}
                    {op === '/' && 'Division'}
                    {op === '//' && 'Floor division'}
                    {op === '%' && 'Modulus'}
                    {op === '**' && 'Exponent'}
                  </div>
                </div>
              ))}
            </div>
          </SlideItem>
          <SlideItem delay={0.6} className="w-full max-w-4xl mt-6">
            <CodeBlock filename="arithmetic.py" code={`a, b = 10, 3
print(a + b)   # 13
print(a ** b)  # 1000
print(a // b)  # 3
print(a % b)   # 1`} />
          </SlideItem>
        </Slide>

        {/* Ch8.2: Conditional (Ternary) Operator */}
        <Slide style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)' }}>
          <SlideItem>
            <ChapterBadge num="8.2" color="bg-emerald-100 text-emerald-800" />
            <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white-900">Conditional (Ternary) Operator</h2>
          </SlideItem>
          <SlideItem delay={0.2}>
            <p className="text-xl text-slate-600 leading-relaxed max-w-4xl">
              The ternary operator provides a concise way to write an <code>if-else</code> expression. It evaluates a condition and returns one of two values.
            </p>
          </SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <div className="bg-white/60 rounded-2xl p-5 border border-emerald-200 text-center">
              <code className="font-mono text-lg">x if condition else y</code>
            </div>
          </SlideItem>
          <SlideItem delay={0.6} className="w-full max-w-4xl mt-6">
            <CodeBlock filename="conditional.py" code={`age = 20
status = "Adult" if age >= 18 else "Minor"
print(status)  # Adult`} />
          </SlideItem>
        </Slide>

        {/* Ch8.3: Logical Operators */}
        <Slide style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)' }}>
          <SlideItem>
            <ChapterBadge num="8.3" color="bg-indigo-100 text-indigo-800" />
            <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white-900">Logical Operators</h2>
          </SlideItem>
          <SlideItem delay={0.2}>
            <p className="text-xl text-slate-600 leading-relaxed max-w-4xl">
              Logical operators combine boolean values: <code>and</code> (True if both true), <code>or</code> (True if at least one true), <code>not</code> (inverts truth value).
            </p>
          </SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <div className="grid grid-cols-3 gap-3 text-center">
              {['and', 'or', 'not'].map(op => (
                <div key={op} className="bg-indigo-50 border border-indigo-200 rounded-xl p-3">
                  <div className="font-mono font-bold text-2xl">{op}</div>
                  <div className="text-xs text-slate-500">
                    {op === 'and' && 'Both True → True'}
                    {op === 'or' && 'One True → True'}
                    {op === 'not' && 'Inverts'}
                  </div>
                </div>
              ))}
            </div>
          </SlideItem>
          <SlideItem delay={0.6} className="w-full max-w-4xl mt-6">
            <CodeBlock filename="logical.py" code={`a, b = True, False
print(a and b)   # False
print(a or b)    # True
print(not a)     # False`} />
          </SlideItem>
        </Slide>

        {/* Ch8.4: Bitwise Operators */}
        <Slide style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)' }}>
          <SlideItem>
            <ChapterBadge num="8.4" color="bg-purple-100 text-purple-800" />
            <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white-900">Bitwise Operators</h2>
          </SlideItem>
          <SlideItem delay={0.2}>
            <p className="text-xl text-slate-600 leading-relaxed max-w-4xl">
              Bitwise operators work on integers at the bit level: <code>&</code> (AND), <code>|</code> (OR), <code>^</code> (XOR), <code>~</code> (NOT), <code>&lt;&lt;</code> (left shift), <code>&gt;&gt;</code> (right shift).
            </p>
          </SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-center">
              {['&', '|', '^', '~', '<<', '>>'].map(op => (
                <div key={op} className="bg-purple-50 border border-purple-200 rounded-xl p-3">
                  <div className="font-mono font-bold text-2xl">{op}</div>
                  <div className="text-xs text-slate-500">
                    {op === '&' && 'Bitwise AND'}
                    {op === '|' && 'Bitwise OR'}
                    {op === '^' && 'Bitwise XOR'}
                    {op === '~' && 'Bitwise NOT'}
                    {op === '<<' && 'Left shift'}
                    {op === '>>' && 'Right shift'}
                  </div>
                </div>
              ))}
            </div>
          </SlideItem>
          <SlideItem delay={0.6} className="w-full max-w-4xl mt-6">
            <CodeBlock filename="bitwise.py" code={`x, y = 60, 13   # 60=00111100, 13=00001101
print(x & y)     # 12
print(x | y)     # 61
print(x ^ y)     # 49
print(x << 2)    # 240`} />
          </SlideItem>
        </Slide>

        {/* Ch8.5: Relational (Comparison) Operators */}
        <Slide style={{ background: 'linear-gradient(135deg, #fff1f0 0%, #ffe4e2 100%)' }}>
          <SlideItem>
            <ChapterBadge num="8.5" color="bg-rose-100 text-rose-800" />
            <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white-900">Relational Operators</h2>
          </SlideItem>
          <SlideItem delay={0.2}>
            <p className="text-xl text-slate-600 leading-relaxed max-w-4xl">
              Relational (comparison) operators compare values and return a boolean: <code>==</code>, <code>!=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>.
            </p>
          </SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-center">
              {['==', '!=', '>', '<', '>=', '<='].map(op => (
                <div key={op} className="bg-rose-50 border border-rose-200 rounded-xl p-3">
                  <div className="font-mono font-bold text-2xl">{op}</div>
                  <div className="text-xs text-slate-500">
                    {op === '==' && 'Equal to'}
                    {op === '!=' && 'Not equal'}
                    {op === '>' && 'Greater than'}
                    {op === '<' && 'Less than'}
                    {op === '>=' && 'Greater or equal'}
                    {op === '<=' && 'Less or equal'}
                  </div>
                </div>
              ))}
            </div>
          </SlideItem>
          <SlideItem delay={0.6} className="w-full max-w-4xl mt-6">
            <CodeBlock filename="relational.py" code={`a, b = 10, 3
print(a > b)    # True
print(a == b)   # False
print(a <= b)   # False`} />
          </SlideItem>
        </Slide>

        {/* Ch9.1.1: Conditionals */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="9.1.1" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Conditional Statements</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Make decisions with <strong className="text-cyan-400">if / elif / else</strong> — clean and readable!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full"><Diagram type="flowchart" /></SlideItem>
          <SlideItem delay={0.6} className="w-full max-w-4xl mt-6">
            <CodeBlock filename="conditionals.py" code={`age = 18\nif age >= 18:\n    print("Can vote!")\nelif age >= 16:\n    print("Can drive!")\nelse:\n    print("Too young")`} />
          </SlideItem>
        </Slide>{/* Ch9.1: if statement */}
        <Slide style={{ background: 'linear-gradient(135deg, #fef9e3 0%, #fef3c7 100%)' }}>
          <SlideItem>
            <ChapterBadge num="9.1" color="bg-amber-100 text-amber-800" />
            <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-slate-900">if Statement</h2>
          </SlideItem>
          <SlideItem delay={0.2}>
            <p className="text-xl text-slate-600 leading-relaxed max-w-4xl">
              The <code>if</code> statement executes a block of code only if a condition is true.
              If the condition is false, the block is skipped. It’s the simplest form of decision‑making.
            </p>
          </SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <code className="font-mono">
                if condition:<br />
                &nbsp;&nbsp;&nbsp;# code runs only if true
              </code>
            </div>
          </SlideItem>

          <SlideItem delay={0.6} className="w-full max-w-4xl mt-6">
            <CodeBlock
              filename="if_statement.py"
              code={`num = 10

if num > 5:
    print("Number is greater than 5")`}
            />
          </SlideItem>
        </Slide>

        {/* Ch9.2: if-else statement */}
        <Slide style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)' }}>
          <SlideItem>
            <ChapterBadge num="9.2" color="bg-emerald-100 text-emerald-800" />
            <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white-900">if‑else Statement</h2>
          </SlideItem>
          <SlideItem delay={0.2}>
            <p className="text-xl text-slate-600 leading-relaxed max-w-4xl">
              <code>if-else</code> provides two alternative paths: one for when the condition is true, and another for when it’s false.
              Exactly one of the blocks executes.
            </p>
          </SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 text-center">
              <code className="font-mono">if condition:<br />   # true block<br />else:<br />   # false block</code>
            </div>
          </SlideItem>
          <SlideItem delay={0.6} className="w-full max-w-4xl mt-6">
            <CodeBlock filename="if_else.py" code={`num = 7
if num % 2 == 0:
    print("Even")
else:
    print("Odd")`} />
          </SlideItem>
        </Slide>



        {/* Ch9.3: Nested if */}
        <Slide style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)' }}>
          <SlideItem>
            <ChapterBadge num="9.3" color="bg-indigo-100 text-indigo-800" />
            <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white-900">Nested if</h2>
          </SlideItem>
          <SlideItem delay={0.2}>
            <p className="text-xl text-slate-600 leading-relaxed max-w-4xl">
              A nested <code>if</code> is an <code>if</code> statement inside another <code>if</code> (or <code>else</code>) block.
              It allows checking multiple conditions in a hierarchical way.
            </p>
          </SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-200 text-center">
              <code className="font-mono">if outer_condition:<br />   if inner_condition:<br />      # inner block</code>
            </div>
          </SlideItem>
          <SlideItem delay={0.6} className="w-full max-w-4xl mt-6">
            <CodeBlock filename="nested_if.py" code={`x = 15
if x > 0:
    print("Positive")
    if x % 2 == 0:
        print("Even")
    else:
        print("Odd")`} />
          </SlideItem>
        </Slide>

        {/* Ch9.4: elif ladder */}
        <Slide style={{ background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)' }}>
          <SlideItem>
            <ChapterBadge num="9.4" color="bg-rose-100 text-rose-800" />
            <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white-900">elif Ladder</h2>
          </SlideItem>
          <SlideItem delay={0.2}>
            <p className="text-xl text-slate-600 leading-relaxed max-w-4xl">
              The <code>elif</code> ladder (short for “else if”) lets you chain multiple conditions.
              Python checks each condition in order; the first true condition’s block executes, and the rest are skipped.
            </p>
          </SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <div className="bg-rose-50 rounded-2xl p-5 border border-rose-200 text-center">
              <code className="font-mono">if cond1:<br />   # block1<br />elif cond2:<br />   # block2<br />else:<br />   # default</code>
            </div>
          </SlideItem>
          <SlideItem delay={0.6} className="w-full max-w-4xl mt-6">
            <CodeBlock filename="elif_ladder.py" code={`score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
print(grade)`} />
          </SlideItem>
        </Slide>

        {/* Ch9.5: Ternary Operator */}
        <Slide style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)' }}>
          <SlideItem>
            <ChapterBadge num="9.5" color="bg-purple-100 text-pink-800" />
            <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white-1000">Ternary Operator</h2>
          </SlideItem>
          <SlideItem delay={0.2}>
            <p className="text-xl text-slate-600 leading-relaxed max-w-4xl">
              The ternary operator (conditional expression) is a shorthand for <code>if-else</code>.
              It returns one of two values based on a condition, making code concise.
            </p>
          </SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200 text-center">
              <code className="font-mono">value_if_true if condition else value_if_false</code>
            </div>
          </SlideItem>
          <SlideItem delay={0.6} className="w-full max-w-4xl mt-6">
            <CodeBlock filename="ternary.py" code={`age = 20
status = "Adult" if age >= 18 else "Minor"
print(status)
# Also in expressions:
print("Even" if 7 % 2 == 0 else "Odd")`} />
          </SlideItem>
        </Slide>
        {/* Slide 1: Chapter 10.1.1 - Introduction to Loops */}
        <Slide style={slideStyle}>
          <SlideItem>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <ChapterBadge num="10.1.1" />
              <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Loops in Python</h2>
            </motion.div>
          </SlideItem>

          <SlideItem delay={0.1}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mx-auto mb-8">
                Loops allow us to <strong className="text-violet-400">repeat code blocks</strong> efficiently.
                Python provides powerful looping mechanisms including <strong className="text-violet-400">for loops</strong>,
                <strong className="text-violet-400"> while loops</strong>, and special iteration patterns.
              </p>
            </motion.div>
          </SlideItem>

          <SlideItem delay={0.2} className="w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <Diagram type="loop" />
            </motion.div>
          </SlideItem>
        </Slide>

        {/* Slide 2: Chapter 10.1 - Python For Loop */}
        <Slide style={slideStyle}>
          <SlideItem>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <ChapterBadge num="10.1" />
              <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">For Loop</h2>
            </motion.div>
          </SlideItem>

          <SlideItem delay={0.2} className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-10%' }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 rounded-2xl p-6 mb-6 border-l-4 border-blue-500"
            >
              <h3 className="text-3xl font-bold text-blue-300 mb-4">10.1 Python For Loop</h3>

              {/* Visual Diagram */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4 }}
                className="bg-black/40 rounded-xl p-4 mb-5"
              >
                <h4 className="text-lg font-bold text-yellow-300 mb-3 text-center">🔄 For Loop Flow Diagram</h4>
                <div className="flex flex-col items-center">
                  <div className="bg-blue-600 px-6 py-2 rounded-full text-white font-mono text-sm">START</div>
                  <div className="text-white text-xl my-1">↓</div>
                  <div className="bg-purple-600 px-6 py-2 rounded-full text-white font-mono text-sm">Initialize: i = 0</div>
                  <div className="text-white text-xl my-1">↓</div>
                  <div className="bg-amber-600 px-6 py-2 rounded-full text-white font-mono text-sm">Condition: i &lt; 5 ?</div>
                  <div className="flex gap-8 mt-2 mb-2">
                    <div className="text-center">
                      <div className="text-green-400 text-sm">✓ TRUE</div>
                      <div className="text-white text-xl">↓</div>
                      <div className="bg-green-600 px-4 py-1 rounded text-white text-sm">Execute Code Block</div>
                      <div className="text-white text-xl">↓</div>
                      <div className="bg-cyan-600 px-4 py-1 rounded text-white text-sm">Increment: i++</div>
                      <div className="text-white text-xl mt-1">↺</div>
                      <div className="text-xs text-gray-400">Back to Condition</div>
                    </div>
                    <div className="text-center">
                      <div className="text-red-400 text-sm">✗ FALSE</div>
                      <div className="text-white text-xl">↓</div>
                      <div className="bg-red-600 px-4 py-1 rounded text-white text-sm">Exit Loop</div>
                    </div>
                  </div>
                  <div className="bg-blue-600 px-6 py-2 rounded-full text-white font-mono text-sm mt-2">END</div>
                </div>
              </motion.div>

              {/* Theory */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4 }}
                className="bg-black/40 rounded-xl p-5 mb-5"
              >
                <h4 className="text-xl font-bold text-yellow-300 mb-3">📖 Theory</h4>
                <p className="text-blue-200 mb-3">
                  The <code className="bg-black/50 px-2 py-1 rounded text-cyan-300">for</code> loop iterates over sequences.
                  It executes the code block for each item in the sequence.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-blue-300 font-semibold">📌 Key Points:</p>
                    <ul className="list-disc list-inside text-blue-200 text-sm mt-2 space-y-1">
                      <li>Iterates through each element automatically</li>
                      <li>No need to manage index manually</li>
                      <li>Works with lists, strings, ranges, etc.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-blue-300 font-semibold">📝 Syntax:</p>
                    <pre className="bg-black/50 rounded-lg p-2 text-sm font-mono text-green-300 mt-2">
                      {`for variable in sequence:
    # Code to repeat
    print(variable)`}
                    </pre>
                  </div>
                </div>
              </motion.div>

              {/* Interactive Code Runner */}
              <h4 className="text-xl font-bold text-pink-300 mb-3">💻 Run the Code</h4>
              {(() => {
                const [output, setOutput] = React.useState('');
                const [isRunning, setIsRunning] = React.useState(false);
                const [showOutput, setShowOutput] = React.useState(false);

                const runCode = () => {
                  setIsRunning(true);
                  setShowOutput(true);
                  setOutput('⏳ Running Python code...\n');
                  setTimeout(() => {
                    setOutput(`Fruits:
  - apple
  - banana
  - cherry

Numbers 0 to 4:
  0
  1
  2
  3
  4

Even numbers 0 to 8:
  0
  2
  4
  6
  8`);
                    setIsRunning(false);
                  }, 800);
                };

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="bg-black/50 rounded-xl overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-cyan-400 ml-2 font-mono text-sm">for_loop_demo.py</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={runCode}
                        disabled={isRunning}
                        className={`px-4 py-1 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${isRunning ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                          } text-white`}
                      >
                        {isRunning ? (
                          <>
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Running...
                          </>
                        ) : (
                          <>
                            <span>▶️</span>
                            Run Code
                          </>
                        )}
                      </motion.button>
                    </div>
                    <div className="p-4 bg-[#0d1117]">
                      <pre className="text-sm font-mono text-green-300 overflow-x-auto whitespace-pre-wrap">
                        {`# For loop example - Print fruits
fruits = ["apple", "banana", "cherry"]
print("Fruits:")
for fruit in fruits:
    print(f"  - {fruit}")

print("\\nNumbers 0 to 4:")
for i in range(5):
    print(f"  {i}")

print("\\nEven numbers 0 to 8:")
for i in range(0, 10, 2):
    print(f"  {i}")`}
                      </pre>
                    </div>
                    {showOutput && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="border-t border-gray-700"
                      >
                        <div className="bg-black/60 px-4 py-2">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-yellow-400 text-sm font-mono">📤 Output:</span>
                            <button
                              onClick={() => setShowOutput(false)}
                              className="text-gray-400 hover:text-white text-xs"
                            >
                              Clear
                            </button>
                          </div>
                          <pre className="text-sm font-mono text-green-400 whitespace-pre-wrap bg-black/30 p-3 rounded-lg">
                            {output}
                          </pre>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })()}
            </motion.div>
          </SlideItem>
        </Slide>

        {/* Slide 3: Chapter 10.2 - Python While Loop */}
        <Slide style={slideStyle}>
          <SlideItem>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <ChapterBadge num="10.2" />
              <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">While Loop</h2>
            </motion.div>
          </SlideItem>

          <SlideItem delay={0.3} className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-10%' }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-2xl p-6 mb-6 border-l-4 border-green-500"
            >
              <h3 className="text-3xl font-bold text-green-300 mb-4">10.2 Python While Loop</h3>

              {/* Visual Diagram */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4 }}
                className="bg-black/40 rounded-xl p-4 mb-5"
              >
                <h4 className="text-lg font-bold text-yellow-300 mb-3 text-center">🔁 While Loop Flow Diagram</h4>
                <div className="flex flex-col items-center">
                  <div className="bg-blue-600 px-6 py-2 rounded-full text-white font-mono text-sm">START</div>
                  <div className="text-white text-xl my-1">↓</div>
                  <div className="bg-amber-600 px-6 py-2 rounded-full text-white font-mono text-sm">Check Condition: i &lt; 5 ?</div>
                  <div className="flex gap-8 mt-2 mb-2">
                    <div className="text-center">
                      <div className="text-green-400 text-sm">✓ TRUE</div>
                      <div className="text-white text-xl">↓</div>
                      <div className="bg-green-600 px-4 py-1 rounded text-white text-sm">Execute Code Block</div>
                      <div className="text-white text-xl">↓</div>
                      <div className="bg-cyan-600 px-4 py-1 rounded text-white text-sm">Update Condition: i++</div>
                      <div className="text-white text-xl mt-1">↺</div>
                      <div className="text-xs text-gray-400">Back to Condition</div>
                    </div>
                    <div className="text-center">
                      <div className="text-red-400 text-sm">✗ FALSE</div>
                      <div className="text-white text-xl">↓</div>
                      <div className="bg-red-600 px-4 py-1 rounded text-white text-sm">Exit Loop</div>
                    </div>
                  </div>
                  <div className="bg-blue-600 px-6 py-2 rounded-full text-white font-mono text-sm mt-2">END</div>
                  <p className="text-gray-400 text-xs mt-3">⚠️ Always ensure condition becomes False to avoid infinite loop!</p>
                </div>
              </motion.div>

              {/* Theory */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4 }}
                className="bg-black/40 rounded-xl p-5 mb-5"
              >
                <h4 className="text-xl font-bold text-yellow-300 mb-3">📖 Theory</h4>
                <p className="text-green-200 mb-3">
                  The <code className="bg-black/50 px-2 py-1 rounded text-cyan-300">while</code> loop executes as long as the condition is <code className="bg-black/50 px-2 py-1 rounded">True</code>.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-green-300 font-semibold">📌 Key Points:</p>
                    <ul className="list-disc list-inside text-green-200 text-sm mt-2 space-y-1">
                      <li>Condition checked BEFORE each iteration</li>
                      <li>May execute 0 times if condition is False</li>
                      <li>Must update condition inside loop</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-green-300 font-semibold">📝 Syntax:</p>
                    <pre className="bg-black/50 rounded-lg p-2 text-sm font-mono text-green-300 mt-2">
                      {`while condition:
    # Code to repeat
    # Update condition`}
                    </pre>
                  </div>
                </div>
              </motion.div>

              {/* Interactive Code Runner */}
              <h4 className="text-xl font-bold text-pink-300 mb-3">💻 Run the Code</h4>
              {(() => {
                const [output, setOutput] = React.useState('');
                const [isRunning, setIsRunning] = React.useState(false);
                const [showOutput, setShowOutput] = React.useState(false);

                const runCode = () => {
                  setIsRunning(true);
                  setShowOutput(true);
                  setOutput('⏳ Running Python code...\n');
                  setTimeout(() => {
                    setOutput(`Countdown:
  5
  4
  3
  2
  1
  Blast off!

Sum of 1 to 10:
  Sum = 55`);
                    setIsRunning(false);
                  }, 800);
                };

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="bg-black/50 rounded-xl overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-cyan-400 ml-2 font-mono text-sm">while_loop_demo.py</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={runCode}
                        disabled={isRunning}
                        className={`px-4 py-1 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${isRunning ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                          } text-white`}
                      >
                        {isRunning ? (
                          <>
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Running...
                          </>
                        ) : (
                          <>
                            <span>▶️</span>
                            Run Code
                          </>
                        )}
                      </motion.button>
                    </div>
                    <div className="p-4 bg-[#0d1117]">
                      <pre className="text-sm font-mono text-green-300 overflow-x-auto whitespace-pre-wrap">
                        {`# While loop example - Countdown
count = 5
print("Countdown:")
while count > 0:
    print(f"  {count}")
    count -= 1
print("  Blast off!")

print("\\nSum of 1 to 10:")
total = 0
num = 1
while num <= 10:
    total += num
    num += 1
print(f"  Sum = {total}")`}
                      </pre>
                    </div>
                    {showOutput && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="border-t border-gray-700"
                      >
                        <div className="bg-black/60 px-4 py-2">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-yellow-400 text-sm font-mono">📤 Output:</span>
                            <button
                              onClick={() => setShowOutput(false)}
                              className="text-gray-400 hover:text-white text-xs"
                            >
                              Clear
                            </button>
                          </div>
                          <pre className="text-sm font-mono text-green-400 whitespace-pre-wrap bg-black/30 p-3 rounded-lg">
                            {output}
                          </pre>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })()}
            </motion.div>
          </SlideItem>
        </Slide>

        {/* Slide 4: Chapter 10.3 - For-Each Loop (Iteration Patterns) */}
        <Slide style={slideStyle}>
          <SlideItem>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <ChapterBadge num="10.3" />
              <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">For-Each Loop</h2>
            </motion.div>
          </SlideItem>

          <SlideItem delay={0.4} className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-10%' }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-2xl p-6 mb-6 border-l-4 border-purple-500"
            >
              <h3 className="text-3xl font-bold text-purple-300 mb-4">10.3 For Each (Iteration Patterns)</h3>

              {/* Visual Diagram */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4 }}
                className="bg-black/40 rounded-xl p-4 mb-5"
              >
                <h4 className="text-lg font-bold text-yellow-300 mb-3 text-center">📦 Iteration Patterns Visualization</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center bg-blue-900/30 p-3 rounded-lg">
                    <div className="bg-blue-600 p-2 rounded text-white text-sm">List: ["a","b","c"]</div>
                    <div className="text-white text-lg my-1">↓</div>
                    <div className="bg-green-600 p-2 rounded text-white text-sm">for item in list:</div>
                    <div className="text-cyan-300 text-sm mt-1">a → b → c</div>
                  </div>
                  <div className="text-center bg-purple-900/30 p-3 rounded-lg">
                    <div className="bg-purple-600 p-2 rounded text-white text-sm">enumerate(list)</div>
                    <div className="text-white text-lg my-1">↓</div>
                    <div className="bg-green-600 p-2 rounded text-white text-sm">(0,a) → (1,b) → (2,c)</div>
                  </div>
                  <div className="text-center bg-cyan-900/30 p-3 rounded-lg">
                    <div className="bg-cyan-600 p-2 rounded text-white text-sm">zip(list1, list2)</div>
                    <div className="text-white text-lg my-1">↓</div>
                    <div className="bg-green-600 p-2 rounded text-white text-sm">(a,1) → (b,2) → (c,3)</div>
                  </div>
                  <div className="text-center bg-orange-900/30 p-3 rounded-lg">
                    <div className="bg-orange-600 p-2 rounded text-white text-sm">dict.items()</div>
                    <div className="text-white text-lg my-1">↓</div>
                    <div className="bg-green-600 p-2 rounded text-white text-sm">(key,value) pairs</div>
                  </div>
                </div>
              </motion.div>

              {/* Theory */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4 }}
                className="bg-black/40 rounded-xl p-5 mb-5"
              >
                <h4 className="text-xl font-bold text-yellow-300 mb-3">📖 Theory</h4>
                <p className="text-purple-200 mb-3">
                  Python's "for-each" style traverses through iterable objects without managing indices.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-purple-300 font-semibold">📌 Common Patterns:</p>
                    <ul className="list-disc list-inside text-purple-200 text-sm mt-2 space-y-1">
                      <li><code>for item in list</code> - Direct iteration</li>
                      <li><code>enumerate()</code> - Get index and value</li>
                      <li><code>zip()</code> - Iterate multiple sequences</li>
                      <li><code>items()</code> - Dictionary key-value pairs</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-purple-300 font-semibold">📝 Examples:</p>
                    <pre className="bg-black/50 rounded-lg p-2 text-sm font-mono text-green-300 mt-2">
                      {`for item in list:
for i, item in enumerate(list):
for a, b in zip(list1, list2):
for k, v in dict.items():`}
                    </pre>
                  </div>
                </div>
              </motion.div>

              {/* Interactive Code Runner */}
              <h4 className="text-xl font-bold text-pink-300 mb-3">💻 Run the Code</h4>
              {(() => {
                const [output, setOutput] = React.useState('');
                const [isRunning, setIsRunning] = React.useState(false);
                const [showOutput, setShowOutput] = React.useState(false);

                const runCode = () => {
                  setIsRunning(true);
                  setShowOutput(true);
                  setOutput('⏳ Running Python code...\n');
                  setTimeout(() => {
                    setOutput(`Fruits:
  apple
  banana
  cherry

With indices:
  0: apple
  1: banana
  2: cherry

Person details:
  name: Alice
  age: 25
  city: NYC

Name and Age:
  Alice is 25 years old
  Bob is 30 years old`);
                    setIsRunning(false);
                  }, 800);
                };

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="bg-black/50 rounded-xl overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-cyan-400 ml-2 font-mono text-sm">for_each_demo.py</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={runCode}
                        disabled={isRunning}
                        className={`px-4 py-1 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${isRunning ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                          } text-white`}
                      >
                        {isRunning ? (
                          <>
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Running...
                          </>
                        ) : (
                          <>
                            <span>▶️</span>
                            Run Code
                          </>
                        )}
                      </motion.button>
                    </div>
                    <div className="p-4 bg-[#0d1117]">
                      <pre className="text-sm font-mono text-green-300 overflow-x-auto whitespace-pre-wrap">
                        {`# 1. Basic iteration
fruits = ["apple", "banana", "cherry"]
print("Fruits:")
for fruit in fruits:
    print(f"  {fruit}")

# 2. Enumerate (with index)
print("\\nWith indices:")
for i, fruit in enumerate(fruits):
    print(f"  {i}: {fruit}")

# 3. Dictionary iteration
person = {"name": "Alice", "age": 25, "city": "NYC"}
print("\\nPerson details:")
for key, value in person.items():
    print(f"  {key}: {value}")

# 4. Zip (multiple sequences)
names = ["Alice", "Bob"]
ages = [25, 30]
print("\\nName and Age:")
for name, age in zip(names, ages):
    print(f"  {name} is {age} years old")`}
                      </pre>
                    </div>
                    {showOutput && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="border-t border-gray-700"
                      >
                        <div className="bg-black/60 px-4 py-2">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-yellow-400 text-sm font-mono">📤 Output:</span>
                            <button
                              onClick={() => setShowOutput(false)}
                              className="text-gray-400 hover:text-white text-xs"
                            >
                              Clear
                            </button>
                          </div>
                          <pre className="text-sm font-mono text-green-400 whitespace-pre-wrap bg-black/30 p-3 rounded-lg">
                            {output}
                          </pre>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })()}
            </motion.div>
          </SlideItem>
        </Slide>

        {/* Slide 5: Chapter 10.4 - Do-While Equivalent */}
        <Slide style={slideStyle}>
          <SlideItem>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <ChapterBadge num="10.4" />
              <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Do-while Loop</h2>
            </motion.div>
          </SlideItem>

          <SlideItem delay={0.5} className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-10%' }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-orange-900/40 to-red-900/40 rounded-2xl p-6 mb-6 border-l-4 border-orange-500"
            >
              <h3 className="text-3xl font-bold text-orange-300 mb-4">10.4 Do-While Equivalent</h3>

              {/* Visual Diagram */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4 }}
                className="bg-black/40 rounded-xl p-4 mb-5"
              >
                <h4 className="text-lg font-bold text-yellow-300 mb-3 text-center">🔄 Do-While Simulation Diagram</h4>
                <div className="flex flex-col items-center">
                  <div className="bg-blue-600 px-6 py-2 rounded-full text-white font-mono text-sm">START</div>
                  <div className="text-white text-xl my-1">↓</div>
                  <div className="bg-green-600 px-6 py-2 rounded-full text-white font-mono text-sm">Execute Code Block (at least once)</div>
                  <div className="text-white text-xl my-1">↓</div>
                  <div className="bg-amber-600 px-6 py-2 rounded-full text-white font-mono text-sm">Check Condition</div>
                  <div className="flex gap-8 mt-2">
                    <div className="text-center">
                      <div className="text-green-400 text-sm">✓ TRUE</div>
                      <div className="text-white text-xl">↺</div>
                      <div className="text-xs text-gray-400">Repeat</div>
                    </div>
                    <div className="text-center">
                      <div className="text-red-400 text-sm">✗ FALSE</div>
                      <div className="text-white text-xl">↓</div>
                      <div className="bg-red-600 px-4 py-1 rounded text-white text-sm">Exit Loop</div>
                    </div>
                  </div>
                  <div className="bg-blue-600 px-6 py-2 rounded-full text-white font-mono text-sm mt-2">END</div>
                  <p className="text-orange-300 text-xs mt-3">💡 Python doesn't have do-while, but we simulate with while True + break</p>
                </div>
              </motion.div>

              {/* Theory */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4 }}
                className="bg-black/40 rounded-xl p-5 mb-5"
              >
                <h4 className="text-xl font-bold text-yellow-300 mb-3">📖 Theory</h4>
                <p className="text-orange-200 mb-3">
                  Python <strong className="text-orange-300">does not have a built-in do-while loop</strong>. We simulate it using <code className="bg-black/50 px-2 py-1 rounded">while True: ... break</code> pattern.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-orange-300 font-semibold">📌 When to Use:</p>
                    <ul className="list-disc list-inside text-orange-200 text-sm mt-2 space-y-1">
                      <li>Menu systems (show at least once)</li>
                      <li>Input validation</li>
                      <li>Game loops</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-orange-300 font-semibold">📝 Pattern:</p>
                    <pre className="bg-black/50 rounded-lg p-2 text-sm font-mono text-green-300 mt-2">
                      {`while True:
    # Execute code (at least once)
    if condition:
        break`}
                    </pre>
                  </div>
                </div>
              </motion.div>

              {/* Interactive Code Runner */}
              <h4 className="text-xl font-bold text-pink-300 mb-3">💻 Run the Code</h4>
              {(() => {
                const [output, setOutput] = React.useState('');
                const [isRunning, setIsRunning] = React.useState(false);
                const [showOutput, setShowOutput] = React.useState(false);
                const [step, setStep] = React.useState(0);
                const [userChoice, setUserChoice] = React.useState('');

                const runCode = () => {
                  setIsRunning(true);
                  setShowOutput(true);
                  setOutput('=== MENU SYSTEM ===\n\n1. Start Game\n2. Instructions\n3. Exit\nChoose option (1-3): ');
                  setStep(1);
                };

                const handleChoice = (choice) => {
                  if (choice === '3') {
                    setOutput(prev => prev + choice + '\n  Goodbye! 👋\n\n=== NUMBER GUESSING GAME ===\nGuess a number (1-10): ');
                    setStep(2);
                  } else if (choice === '1') {
                    setOutput(prev => prev + choice + '\n  Game starting... 🎮\n\n1. Start Game\n2. Instructions\n3. Exit\nChoose option (1-3): ');
                  } else if (choice === '2') {
                    setOutput(prev => prev + choice + '\n  Use arrow keys to move! 📖\n\n1. Start Game\n2. Instructions\n3. Exit\nChoose option (1-3): ');
                  }
                };

                const handleGuess = (guess) => {
                  const secret = 6;
                  if (parseInt(guess) === secret) {
                    setOutput(prev => prev + guess + '\n  Correct! You got it! 🎉');
                    setIsRunning(false);
                  } else if (parseInt(guess) < secret) {
                    setOutput(prev => prev + guess + '\n  Too low! Try again.\nGuess a number (1-10): ');
                  } else {
                    setOutput(prev => prev + guess + '\n  Too high! Try again.\nGuess a number (1-10): ');
                  }
                };

                if (isRunning && step === 1) {
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="bg-black/50 rounded-xl overflow-hidden"
                    >
                      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                          <span className="text-cyan-400 ml-2 font-mono text-sm">do_while_simulation.py</span>
                        </div>
                      </div>
                      <div className="p-4 bg-[#0d1117]">
                        <pre className="text-sm font-mono text-green-300 overflow-x-auto whitespace-pre-wrap">
                          {`# Menu System (runs at least once)
while True:
    print("\\n1. Start Game")
    print("2. Instructions")
    print("3. Exit")
    choice = input("Choose option: ")
    
    if choice == "1":
        print("Game starting...")
    elif choice == "2":
        print("Instructions shown")
    elif choice == "3":
        print("Goodbye!")
        break`}
                        </pre>
                      </div>
                      <div className="bg-black/60 px-4 py-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-yellow-400 text-sm font-mono">📤 Interactive Output:</span>
                        </div>
                        <pre className="text-sm font-mono text-green-400 whitespace-pre-wrap bg-black/30 p-3 rounded-lg mb-3">
                          {output}
                        </pre>
                        <div className="flex gap-2">
                          <button onClick={() => handleChoice('1')} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">1. Start Game</button>
                          <button onClick={() => handleChoice('2')} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white">2. Instructions</button>
                          <button onClick={() => handleChoice('3')} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white">3. Exit</button>
                        </div>
                      </div>
                    </motion.div>
                  );
                } else if (isRunning && step === 2) {
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="bg-black/50 rounded-xl overflow-hidden"
                    >
                      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                          <span className="text-cyan-400 ml-2 font-mono text-sm">number_guessing.py</span>
                        </div>
                      </div>
                      <div className="p-4 bg-[#0d1117]">
                        <pre className="text-sm font-mono text-green-300 overflow-x-auto whitespace-pre-wrap">
                          {`# Number guessing game
import random
secret = random.randint(1, 10)

while True:
    guess = int(input("Guess a number (1-10): "))
    if guess == secret:
        print("Correct!")
        break
    elif guess < secret:
        print("Too low!")
    else:
        print("Too high!")`}
                        </pre>
                      </div>
                      <div className="bg-black/60 px-4 py-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-yellow-400 text-sm font-mono">📤 Interactive Output:</span>
                        </div>
                        <pre className="text-sm font-mono text-green-400 whitespace-pre-wrap bg-black/30 p-3 rounded-lg mb-3">
                          {output}
                        </pre>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <button key={num} onClick={() => handleGuess(num)} className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-white text-sm">
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="bg-black/50 rounded-xl overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-cyan-400 ml-2 font-mono text-sm">do_while_demo.py</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={runCode}
                        className="px-4 py-1 rounded-lg text-sm font-semibold flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <span>▶️</span>
                        Run Interactive Demo
                      </motion.button>
                    </div>
                    <div className="p-4 bg-[#0d1117]">
                      <pre className="text-sm font-mono text-green-300 overflow-x-auto whitespace-pre-wrap">
                        {`# Menu System (runs at least once)
while True:
    print("\\n1. Start Game")
    print("2. Instructions")
    print("3. Exit")
    choice = input("Choose option: ")
    
    if choice == "1":
        print("Game starting...")
    elif choice == "2":
        print("Instructions shown")
    elif choice == "3":
        print("Goodbye!")
        break

# Number guessing game
secret = random.randint(1, 10)
while True:
    guess = int(input("Guess a number: "))
    if guess == secret:
        print("Correct!")
        break
    elif guess < secret:
        print("Too low!")
    else:
        print("Too high!")`}
                      </pre>
                    </div>
                  </motion.div>
                );
              })()}

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-4 p-3 bg-orange-500/20 rounded-lg"
              >
                <p className="text-orange-200 text-sm">💡 <strong>Key Insight:</strong> The <code className="bg-black/50 px-2 py-1 rounded">while True: ... break</code> pattern ensures code executes at least once!</p>
              </motion.div>
            </motion.div>
          </SlideItem>
        </Slide>

        {/* Slide 6: Loop Control Summary */}
        <Slide style={slideStyle}>
          <SlideItem>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <ChapterBadge num="10.5" />
              <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Loop Control</h2>
            </motion.div>
          </SlideItem>

          <SlideItem delay={0.6} className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-10%' }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-6"
            >
              <h3 className="text-2xl font-bold text-center text-blue-300 mb-4">📊 Loop Control Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-black/40 rounded-lg p-4 text-center cursor-pointer"
                >
                  <div className="text-4xl mb-2">⛔</div>
                  <div className="font-bold text-xl text-red-300">break</div>
                  <p className="text-blue-200 text-sm mt-1">Exits the loop immediately</p>
                  <pre className="text-xs mt-2 bg-black/50 p-2 rounded text-green-300">if condition: break</pre>
                  <p className="text-gray-400 text-xs mt-2">Stops entire loop execution</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-black/40 rounded-lg p-4 text-center cursor-pointer"
                >
                  <div className="text-4xl mb-2">⏭️</div>
                  <div className="font-bold text-xl text-yellow-300">continue</div>
                  <p className="text-blue-200 text-sm mt-1">Skips current iteration</p>
                  <pre className="text-xs mt-2 bg-black/50 p-2 rounded text-green-300">if condition: continue</pre>
                  <p className="text-gray-400 text-xs mt-2">Jumps to next iteration</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-black/40 rounded-lg p-4 text-center cursor-pointer"
                >
                  <div className="text-4xl mb-2">⏸️</div>
                  <div className="font-bold text-xl text-blue-300">pass</div>
                  <p className="text-blue-200 text-sm mt-1">Placeholder (does nothing)</p>
                  <pre className="text-xs mt-2 bg-black/50 p-2 rounded text-green-300">if condition: pass</pre>
                  <p className="text-gray-400 text-xs mt-2">Used for future implementation</p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 p-4 bg-blue-500/20 rounded-lg"
              >
                <p className="text-blue-200 text-center text-sm">🎯 <strong>Pro Tip:</strong> Use <code className="bg-black/50 px-2 py-0.5 rounded">break</code> to exit early, <code className="bg-black/50 px-2 py-0.5 rounded">continue</code> to skip, and <code className="bg-black/50 px-2 py-0.5 rounded">pass</code> as a placeholder!</p>
              </motion.div>
            </motion.div>
          </SlideItem>
        </Slide>
        {/* Ch11: Lists */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="11" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Lists</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8"><strong className="text-indigo-400">Ordered, mutable</strong> collections. Index from zero. Slicing, nesting, and more!</p></SlideItem>
          <SlideItem delay={0.4}><Diagram type="arrays" /></SlideItem>
          <SlideItem delay={0.6} className="w-full max-w-4xl mt-6">
            <CodeBlock filename="lists.py" code={`scores = [85, 92, 78, 96, 88]\nprint(scores[0])     # 85 (first)\nprint(scores[-1])    # 88 (last)\nprint(scores[1:4])   # [92, 78, 96] (slice)`} />
          </SlideItem>
        </Slide>
        {/* Ch12: List Operations */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="12" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">List Operations</h2></SlideItem>
          <SlideItem delay={0.2} className="w-full max-w-4xl">
            <CodeBlock filename="list_ops.py" code={`fruits = ["apple", "banana"]\nfruits.append("cherry")    # add to end\nfruits.insert(1, "mango")  # at index\nfruits.remove("banana")    # by value\nfruits.sort()              # sort in place\nprint(len(fruits))         # count`} />
          </SlideItem>
          <SlideItem delay={0.4}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-4xl w-full mt-6">
              {['append()', 'extend()', 'insert()', 'remove()', 'pop()', 'index()', 'count()', 'sort()', 'reverse()', 'copy()'].map((m, i) => {
                const handleClick = useClickGlow();
                return (
                  <div key={i} onClick={handleClick} className="rounded-xl px-3 py-2 text-center font-mono text-sm font-bold dark-card text-sky-300">{m}</div>
                );
              })}
            </div>
          </SlideItem>
        </Slide>

        {/* Ch13: Tuples */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="13" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Tuples</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8"><strong className="text-cyan-400">Immutable</strong> ordered sequences. Faster than lists, hashable — can be used as dict keys!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="tuples.py" code={`point = (10, 20)          # coordinate\nrgb = (255, 128, 0)       # color\nsingle = (5,)             # needs comma!\n\nx, y = point              # unpacking\na, b = b, a               # swap!`} />
          </SlideItem>
          <SlideItem delay={0.6}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mt-6">
              {[
                { title: 'Immutable', desc: 'Cannot be changed after creation — safe for constants' },
                { title: 'Hashable', desc: 'Can be used as dictionary keys — lists cannot' },
                { title: 'Unpacking', desc: 'a, b = (1, 2) — assign multiple variables at once' },
              ].map((c, i) => {
                const handleClick = useClickGlow();
                return (
                  <div key={i} onClick={handleClick} className="p-5 rounded-2xl dark-card">
                    <h3 className="font-bold text-lg mb-2 text-sky-300">{c.title}</h3>
                    <p className="text-sm text-slate-400">{c.desc}</p>
                  </div>
                );
              })}
            </div>
          </SlideItem>
        </Slide>

        {/* Ch14: Dictionaries */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="14" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Dictionaries</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8"><strong className="text-emerald-400">Key-value pairs</strong> with fast O(1) lookup. Ordered by insertion (Python 3.7+)!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full"><Diagram type="collections" /></SlideItem>
          <SlideItem delay={0.6} className="w-full max-w-4xl mt-6">
            <CodeBlock filename="dicts.py" code={`person = {"name": "Ravi", "age": 21}\nprint(person["name"])              # Ravi\nprint(person.get("phone", "N/A"))  # safe\nsquares = {x: x**2 for x in range(5)}  # comprehension`} />
          </SlideItem>
        </Slide>

        {/* Ch15: Sets */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="15" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Sets</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8"><strong className="text-amber-400">Unique, unordered</strong> elements. Perfect for membership tests and set math!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="sets.py" code={`a = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nprint(a | b)  # Union:        {1,2,3,4,5,6}\nprint(a & b)  # Intersection: {3,4}\nprint(a - b)  # Difference:   {1,2}\nprint(a ^ b)  # Sym. diff:    {1,2,5,6}`} />
          </SlideItem>
          <SlideItem delay={0.6}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full mt-6">
              {[['|', 'Union', 'all elements'], ['&', 'Intersection', 'common only'], ['-', 'Difference', 'first not second'], ['^', 'Sym Diff', 'not in both']].map(([op, name, desc], i) => {
                const handleClick = useClickGlow();
                return (
                  <div key={i} onClick={handleClick} className="rounded-2xl p-4 text-center dark-card">
                    <div className="text-3xl font-black text-amber-400 font-mono">{op}</div>
                    <div className="font-bold text-sky-300 text-sm">{name}</div>
                    <div className="text-xs text-slate-400">{desc}</div>
                  </div>
                );
              })}
            </div>
          </SlideItem>
        </Slide>

        {/* Ch16: Strings */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="16" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Strings</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8"><strong className="text-violet-400">Immutable Unicode sequences</strong> with 50+ built-in methods. Support indexing and slicing!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="strings.py" code={`name = "Hello Python"\nprint(len(name))         # 12\nprint(name.upper())      # HELLO PYTHON\nprint(name.split())      # ['Hello', 'Python']\nprint(name[0:5])         # Hello (slice)\nprint("Py" in name)      # True`} />
          </SlideItem>
        </Slide>

        {/* Ch17: String Formatting */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="17" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">String Formatting</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Three approaches — <strong className="text-emerald-400">f-strings</strong> are the modern winner (Python 3.6+)!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="formatting.py" code={`name, age = "Ravi", 21\n\n# f-string (best — Python 3.6+)\nprint(f"Hello, {name}! Age: {age}")\n\n# format numbers\nprint(f"Pi = {3.14159:.2f}")   # Pi = 3.14\nprint(f"Score: {0.876:.1%}")   # Score: 87.6%`} />
          </SlideItem>
        </Slide>

        {/* Ch18: Functions Basics */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="18" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Functions Basics</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Reusable blocks defined with <strong className="text-amber-400">def</strong>. Parameters in, return values out!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="functions.py" code={`def add(a, b):\n    """Add two numbers and return result"""\n    return a + b\n\ndef greet(name="World"):  # default param\n    return f"Hello, {name}!"\n\nprint(add(10, 5))   # 15\nprint(greet())      # Hello, World!`} />
          </SlideItem>
        </Slide>

        {/* Ch19: Advanced Functions */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="19" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Advanced Functions</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Default params, <strong className="text-cyan-400">*args</strong>, <strong className="text-cyan-400">**kwargs</strong>, and <strong className="text-cyan-400">lambda</strong> — powerful and flexible!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="advanced_functions.py" code={`def sum_all(*args):        # any positional\n    return sum(args)\n\ndef profile(**kwargs):     # any keyword\n    for k, v in kwargs.items(): print(k, v)\n\nsquare = lambda x: x**2   # lambda!\nprint(square(5))           # 25`} />
          </SlideItem>
        </Slide>

        {/* Ch20: Scope */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="20" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Scope and Namespace</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Python follows <strong className="text-purple-400">LEGB</strong>: Local → Enclosing → Global → Built-in</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="scope.py" code={`x = 10          # Global\n\ndef outer():\n    y = 20      # Enclosing\n    def inner():\n        z = 30  # Local\n        print(x, y, z)  # all accessible!`} />
          </SlideItem>
          <SlideItem delay={0.6}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl w-full mt-4">
              {[['L', 'Local', 'Inside current function'], ['E', 'Enclosing', 'Outer function (nested)'], ['G', 'Global', 'Module level'], ['B', 'Built-in', 'Python builtins']].map(([l, t, d], i) => {
                const handleClick = useClickGlow();
                return (
                  <div key={i} onClick={handleClick} className="rounded-2xl p-4 text-center dark-card">
                    <div className="text-3xl font-black text-purple-400">{l}</div>
                    <div className="font-bold text-sky-300 text-sm">{t}</div>
                    <div className="text-xs text-slate-400 mt-1">{d}</div>
                  </div>
                );
              })}
            </div>
          </SlideItem>
        </Slide>

        {/* Ch21: Lambda */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="21" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Lambda Functions</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Anonymous one-line functions: <code className="font-mono bg-sky-900/40 px-2 rounded text-sky-300">lambda args: expression</code></p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="lambda.py" code={`square = lambda x: x**2\nprint(square(5))    # 25\n\nnums = [1, 2, 3, 4, 5]\ndoubled = list(map(lambda x: x*2, nums))\nevens = list(filter(lambda x: x%2==0, nums))`} />
          </SlideItem>
        </Slide>

        {/* Ch22: List Comprehensions */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="22" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">List Comprehensions</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Elegant one-liners: <code className="font-mono bg-emerald-900/40 px-2 rounded text-emerald-400">[expr for item in iterable if condition]</code></p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="comprehensions.py" code={`# List comprehension\nsquares = [x**2 for x in range(5)]  # [0,1,4,9,16]\nevens = [x for x in range(10) if x%2==0]\n\n# Set and Dict comprehension\nunique = {x**2 for x in [-2,-1,1,2]}\nd = {x: x**2 for x in range(3)}`} />
          </SlideItem>
        </Slide>

        {/* Ch23: Nested Data */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="23" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Nested Data Structures</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Lists inside lists, dicts inside lists — represent <strong className="text-amber-400">complex hierarchical data</strong>!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="nested.py" code={`# Matrix (list of lists)\nmatrix = [[1,2,3],[4,5,6],[7,8,9]]\nprint(matrix[1][2])   # 6 (row1, col2)\n\n# Nested dict\nstudents = {"Ravi": {"age": 21, "grade": "A"}}\nprint(students["Ravi"]["grade"])   # A`} />
          </SlideItem>
        </Slide>

        {/* Ch24: Copying */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="24" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Copying Data Structures</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8"><strong className="text-cyan-400">Shallow copy</strong> shares nested objects. <strong className="text-cyan-400">Deep copy</strong> creates fully independent copy!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="copying.py" code={`import copy\n\noriginal = [[1, 2], [3, 4]]\nshallow = copy.copy(original)     # shared inner\ndeep = copy.deepcopy(original)    # all new\n\nshallow[0][0] = 99   # affects original!\ndeep[0][0] = 99      # original unchanged`} />
          </SlideItem>
        </Slide>

        {/* Ch25: Classes & Objects */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="25" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Classes and Objects</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">A <strong className="text-violet-400">Class</strong> is the blueprint — an <strong className="text-blue-400">Object</strong> is the instance. <code className="font-mono bg-pink-900/30 text-pink-400 px-2 rounded">__init__</code> is the constructor!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full"><Diagram type="class-object" /></SlideItem>
          <SlideItem delay={0.6} className="w-full max-w-4xl mt-6">
            <CodeBlock filename="classes.py" code={`class Car:\n    def __init__(self, brand):\n        self.brand = brand\n    def drive(self):\n        return f"{self.brand} is driving"\n\nmy_car = Car("Toyota")\nprint(my_car.drive())   # Toyota is driving`} />
          </SlideItem>
        </Slide>

        {/* Ch26–51: Continue with same dark pattern */}
        {/* Ch26: Inheritance */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="26" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Inheritance</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Child class <strong className="text-emerald-400">inherits</strong> from parent. Use <code className="font-mono font-bold bg-pink-900/30 text-pink-400 px-2 rounded">super()</code> to call the parent constructor!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full"><Diagram type="inheritance" /></SlideItem>
          <SlideItem delay={0.6} className="w-full max-w-4xl mt-6">
            <CodeBlock filename="inheritance.py" code={`class Animal:\n    def __init__(self, name): self.name = name\n    def speak(self): return "..."\n\nclass Dog(Animal):\n    def speak(self): return "Woof!"  # override\n\nclass Cat(Animal):\n    def speak(self): return "Meow!"`} />
          </SlideItem>
        </Slide>

        {/* Ch27: Encapsulation */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="27" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Encapsulation</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Control access with <strong className="text-purple-400">_protected</strong> and <strong className="text-purple-400">__private</strong>. Use <code className="font-mono bg-purple-900/30 text-purple-400 px-2 rounded">@property</code> for getters!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full"><Diagram type="encapsulation" /></SlideItem>
          <SlideItem delay={0.6} className="w-full max-w-4xl mt-6">
            <CodeBlock filename="encapsulation.py" code={`class BankAccount:\n    def __init__(self):\n        self.__balance = 0     # private\n\n    @property\n    def balance(self):         # getter\n        return self.__balance\n\n    def deposit(self, amount):\n        if amount > 0: self.__balance += amount`} />
          </SlideItem>
        </Slide>

        {/* Ch28: Polymorphism */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="28" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Polymorphism</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Python uses <strong className="text-purple-400">duck typing</strong> — if it has the method, it works. No type check needed!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full"><Diagram type="polymorphism" /></SlideItem>
          <SlideItem delay={0.6} className="w-full max-w-4xl mt-6">
            <CodeBlock filename="polymorphism.py" code={`class Dog: \n    def speak(self): return "Woof!"\nclass Cat: \n    def speak(self): return "Meow!"\n\ndef make_sound(animal):\n    print(animal.speak())  # works for both!\n\nmake_sound(Dog())   # Woof!\nmake_sound(Cat())   # Meow!`} />
          </SlideItem>
        </Slide>

        {/* Ch29: Abstraction */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="29" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Abstraction</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Hide complexity with <strong className="text-emerald-400">ABC</strong> — abstract base classes. Define <em>what</em> to do, not <em>how</em>!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="abstraction.py" code={`from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self): pass    # must implement\n\nclass Circle(Shape):\n    def __init__(self, r): self.r = r\n    def area(self): return 3.14 * self.r ** 2`} />
          </SlideItem>
        </Slide>

        {/* Ch30: Magic Methods */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="30" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Magic Methods</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8"><strong className="text-amber-400">Dunder methods</strong> customize how objects behave with Python built-in operations!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="magic_methods.py" code={`class Point:\n    def __init__(self, x, y): self.x, self.y = x, y\n    def __str__(self): return f"({self.x}, {self.y})"\n    def __add__(self, o):\n        return Point(self.x+o.x, self.y+o.y)\n\np1, p2 = Point(1,2), Point(3,4)\nprint(p1 + p2)   # (4, 6) — uses __add__`} />
          </SlideItem>
        </Slide>

        {/* Ch31: Exceptions */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="31" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Exceptions</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Runtime errors that crash programs if unhandled. Know your common exception types!</p></SlideItem>
          <SlideItem delay={0.4}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl w-full">
              {[
                ['ZeroDivisionError', '10 / 0'],
                ['ValueError', 'int("abc")'],
                ['TypeError', '"a" + 1'],
                ['FileNotFoundError', 'open("x.txt")'],
                ['IndexError', 'list[99]'],
                ['KeyError', 'd["missing"]'],
              ].map(([name, ex], i) => {
                const handleClick = useClickGlow();
                return (
                  <div key={i} onClick={handleClick} className="p-4 rounded-2xl dark-card">
                    <code className="font-bold text-sm block text-rose-400">{name}</code>
                    <code className="text-xs text-slate-400">{ex}</code>
                  </div>
                );
              })}
            </div>
          </SlideItem>
        </Slide>

        {/* Ch32: Exception Handling */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="32" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Exception Handling</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Handle errors gracefully with <strong className="text-rose-400">try / except / else / finally</strong>!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full"><Diagram type="exceptions" /></SlideItem>
          <SlideItem delay={0.6} className="w-full max-w-4xl mt-6">
            <CodeBlock filename="handling.py" code={`try:\n    num = int(input("Enter: "))\n    result = 10 / num\nexcept ValueError:\n    print("Not a number!")\nexcept ZeroDivisionError:\n    print("No zeros!")\nelse:\n    print(f"Result: {result}")\nfinally:\n    print("Always runs!")`} />
          </SlideItem>
        </Slide>

        {/* Ch33: Custom Exceptions */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="33" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Custom Exceptions</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Create <strong className="text-purple-400">meaningful error types</strong> for your application by inheriting from Exception!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="custom_exceptions.py" code={`class InsufficientFundsError(Exception):\n    def __init__(self, balance, amount):\n        super().__init__(f"Need {amount}, have {balance}")\n\ndef withdraw(balance, amount):\n    if amount > balance:\n        raise InsufficientFundsError(balance, amount)\n    return balance - amount`} />
          </SlideItem>
        </Slide>

        {/* Ch34: File Operations */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="34" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">File Operations</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Read/write files with <strong className="text-emerald-400">open()</strong>. Always use <strong className="text-emerald-400">with</strong> for automatic cleanup!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="file_ops.py" code={`# Write\nwith open("data.txt", "w") as f:\n    f.write("Hello, World!\\n")\n\n# Read\nwith open("data.txt", "r") as f:\n    content = f.read()\n    print(content)`} />
          </SlideItem>
          <SlideItem delay={0.6}>
            <div className="flex flex-wrap gap-3 justify-center mt-4">
              {[["'r'", "Read"], ["'w'", "Write (overwrite)"], ["'a'", "Append"], ["'r+'", "Read+Write"], ["'x'", "Exclusive create"], ["'b'", "Binary mode"]].map(([m, d], i) => {
                const handleClick = useClickGlow();
                return (
                  <div key={i} onClick={handleClick} className="rounded-xl px-4 py-2 text-center dark-card">
                    <code className="font-bold text-sky-400">{m}</code>
                    <div className="text-xs text-slate-400">{d}</div>
                  </div>
                );
              })}
            </div>
          </SlideItem>
        </Slide>

        {/* Ch35: Reading Files */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="35" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Reading Files</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Three reading methods — choose based on <strong className="text-blue-400">file size and needs</strong>!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="reading.py" code={`with open("data.txt") as f:\n    content = f.read()       # entire file\n    line = f.readline()      # one line\n    lines = f.readlines()    # list of lines\n\n# Memory-efficient for large files\nwith open("data.txt") as f:\n    for line in f:\n        print(line.strip())`} />
          </SlideItem>
        </Slide>

        {/* Ch36: Writing Files */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="36" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Writing Files</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Use <strong className="text-amber-400">write()</strong> and <strong className="text-amber-400">writelines()</strong>. Mode <code className="font-mono bg-amber-900/30 text-amber-400 px-1">'w'</code> overwrites, <code className="font-mono bg-amber-900/30 text-amber-400 px-1">'a'</code> appends!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="writing.py" code={`data = ["Line 1", "Line 2", "Line 3"]\n\nwith open("out.txt", "w") as f:\n    for line in data:\n        f.write(line + "\\n")\n\nwith open("out.txt", "a") as f:  # append\n    f.write("Extra line\\n")`} />
          </SlideItem>
        </Slide>

        {/* Ch37: CSV */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="37" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Working with CSV</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Python's <strong className="text-emerald-400">csv module</strong> handles Comma-Separated Values with edge cases automatically!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="csv_files.py" code={`import csv\n\n# Write CSV\nwith open('data.csv', 'w', newline='') as f:\n    w = csv.writer(f)\n    w.writerow(['name','age'])\n    w.writerow(['Ravi', 21])\n\n# Read CSV\nwith open('data.csv') as f:\n    for row in csv.reader(f): print(row)`} />
          </SlideItem>
        </Slide>

        {/* Ch38: JSON */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="38" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">JSON Handling</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Convert between <strong className="text-amber-400">Python objects</strong> and <strong className="text-amber-400">JSON strings</strong> with the json module!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="json_files.py" code={`import json\n\ndata = {"name": "Ravi", "age": 21}\nj = json.dumps(data)   # Python -> JSON string\np = json.loads(j)      # JSON string -> Python\n\nwith open('d.json','w') as f: json.dump(data, f, indent=2)\nwith open('d.json') as f: data = json.load(f)`} />
          </SlideItem>
        </Slide>

        {/* Ch39: Modules */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="39" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Modules</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Reusable Python files — <strong className="text-cyan-400">import</strong> to use. Create your own or use thousands of built-in ones!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="modules.py" code={`import math\nprint(math.sqrt(16))     # 4.0\n\nfrom datetime import date\nprint(date.today())\n\nimport numpy as np       # alias\narr = np.array([1, 2, 3])`} />
          </SlideItem>
        </Slide>

        {/* Ch40: Packages */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="40" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Packages</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Directories with <code className="font-mono bg-purple-900/30 text-purple-400 px-2 rounded">__init__.py</code> — organize modules hierarchically!</p></SlideItem>
          <SlideItem delay={0.4}>
            <div className="rounded-3xl p-8 text-left w-full max-w-2xl font-mono text-lg dark-card">
              <div className="text-yellow-300">mypackage/</div>
              <div className="text-white ml-6">├── <span className="text-blue-300">__init__.py</span></div>
              <div className="text-white ml-6">├── <span className="text-emerald-400">module1.py</span></div>
              <div className="text-white ml-6">├── <span className="text-emerald-400">module2.py</span></div>
              <div className="text-white ml-6">└── subpackage/</div>
              <div className="text-white ml-12">├── <span className="text-blue-300">__init__.py</span></div>
              <div className="text-white ml-12">└── <span className="text-emerald-400">module3.py</span></div>
            </div>
          </SlideItem>
          <SlideItem delay={0.6} className="w-full max-w-4xl mt-4">
            <CodeBlock filename="packages.py" code={`import mypackage.module1\nfrom mypackage.subpackage import module3`} />
          </SlideItem>
        </Slide>

        {/* Ch41: Standard Library */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="41" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Standard Library</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-6">Python's <strong className="text-emerald-400">batteries included</strong> — massive built-in library, no extra install needed!</p></SlideItem>
          <SlideItem delay={0.4}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full mb-6">
              {[['math', '🔢', 'Mathematics'], ['random', '🎲', 'Randomness'], ['datetime', '📅', 'Dates/Times'], ['os', '💻', 'OS Interface'], ['re', '🔍', 'Regex'], ['json', '📋', 'JSON'], ['collections', '📦', 'Data Structs'], ['itertools', '⚙️', 'Iterators']].map(([mod, icon, desc], i) => {
                const handleClick = useClickGlow();
                return (
                  <div key={i} onClick={handleClick} className="rounded-2xl p-4 text-center dark-card">
                    <div className="text-2xl">{icon}</div>
                    <code className="font-bold text-sky-400 text-sm block">{mod}</code>
                    <div className="text-xs text-slate-400">{desc}</div>
                  </div>
                );
              })}
            </div>
          </SlideItem>
          <SlideItem delay={0.6} className="w-full max-w-4xl">
            <CodeBlock filename="stdlib.py" code={`import random, os\nfrom datetime import datetime\nprint(random.randint(1,10), os.getcwd(), datetime.now())`} />
          </SlideItem>
        </Slide>

        {/* Ch42: Third-Party */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="42" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Third-Party Packages</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-6">300,000+ packages on <strong className="text-blue-400">PyPI</strong>. Install with <code className="font-mono bg-blue-900/40 text-blue-400 px-2 rounded">pip install package</code>!</p></SlideItem>
          <SlideItem delay={0.4}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl w-full mb-6">
              {[
                { pkg: 'numpy', icon: '🔢', use: 'Numerical arrays' },
                { pkg: 'pandas', icon: '📊', use: 'Data analysis' },
                { pkg: 'requests', icon: '🌐', use: 'HTTP requests' },
                { pkg: 'flask', icon: '⚗️', use: 'Web framework' },
                { pkg: 'tensorflow', icon: '🤖', use: 'Machine learning' },
                { pkg: 'matplotlib', icon: '📈', use: 'Visualizations' },
              ].map((p, i) => {
                const handleClick = useClickGlow();
                return (
                  <div key={i} onClick={handleClick} className="p-4 rounded-2xl dark-card">
                    <div className="text-2xl">{p.icon}</div>
                    <code className="font-bold text-sm block text-sky-300">{p.pkg}</code>
                    <div className="text-xs text-slate-400">{p.use}</div>
                  </div>
                );
              })}
            </div>
          </SlideItem>
        </Slide>

        {/* Ch43: Decorators */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="43" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Decorators</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">A <strong className="text-blue-400">function that wraps another function</strong> using the <code className="font-mono bg-blue-900/30 text-blue-400 px-2 rounded">@</code> symbol!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="decorators.py" code={`def my_decorator(func):\n    def wrapper():\n        print("Before!")\n        func()\n        print("After!")\n    return wrapper\n\n@my_decorator\ndef say_hello():\n    print("Hello! 🐍")\n\nsay_hello()   # Before! Hello! After!`} />
          </SlideItem>
        </Slide>

        {/* Ch44: Generators */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="44" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Generators</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Use <strong className="text-emerald-400">yield</strong> to produce values lazily — memory-efficient for large sequences!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="generators.py" code={`def count_down(n):\n    while n > 0:\n        yield n       # pauses here!\n        n -= 1\n\nfor num in count_down(5): print(num)\n\n# Generator expression\nsquares = (x**2 for x in range(10))  # lazy!`} />
          </SlideItem>
        </Slide>

        {/* Ch45: Iterators */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="45" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Iterators</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Implement <strong className="text-amber-400">__iter__</strong> and <strong className="text-amber-400">__next__</strong> — the iterator protocol that powers all Python loops!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="iterators.py" code={`class CountDown:\n    def __init__(self, n): self.n = n\n    def __iter__(self): return self\n    def __next__(self):\n        if self.n <= 0: raise StopIteration\n        self.n -= 1; return self.n + 1\n\nfor n in CountDown(5): print(n)  # 5 4 3 2 1`} />
          </SlideItem>
        </Slide>

        {/* Ch46: Context Managers */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="46" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Context Managers</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">The <strong className="text-purple-400">with</strong> statement — guaranteed setup and cleanup, even when exceptions occur!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="context_managers.py" code={`class ManagedFile:\n    def __init__(self, name): self.name = name\n    def __enter__(self):\n        self.file = open(self.name, 'w')\n        return self.file\n    def __exit__(self, *args): self.file.close()\n\nwith ManagedFile('test.txt') as f:\n    f.write('Hello!')`} />
          </SlideItem>
        </Slide>

        {/* Ch47: Regex */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="47" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Regular Expressions</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Pattern matching with the <strong className="text-cyan-400">re module</strong> — find, extract, and replace text!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="regex.py" code={`import re\n\ntext = "Email: ravi@example.com"\npattern = r"\\w+@\\w+\\.\\w+"\n\nmatch = re.search(pattern, text)\nif match:\n    print(match.group())   # ravi@example.com\n\nall_emails = re.findall(pattern, text)`} />
          </SlideItem>
          <SlideItem delay={0.6}>
            <div className="flex flex-wrap gap-3 justify-center mt-4">
              {[['\\d', 'digit'], ['\\w', 'word char'], ['\\s', 'whitespace'], ['.', 'any char'], ['*', '0 or more'], ['+', '1 or more'], ['?', '0 or 1'], ['^', 'start'], ['$', 'end']].map(([p, d], i) => {
                const handleClick = useClickGlow();
                return (
                  <div key={i} onClick={handleClick} className="rounded-xl px-3 py-2 text-center dark-card">
                    <code className="font-bold text-cyan-400">{p}</code>
                    <div className="text-xs text-slate-400">{d}</div>
                  </div>
                );
              })}
            </div>
          </SlideItem>
        </Slide>

        {/* Ch48.1: Multithreading */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="48.1" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Multithreading</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Concurrent threads — great for <strong className="text-amber-400">I/O-bound tasks</strong> like network calls and file ops!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="threading_demo.py" code={`import threading, time\n\ndef worker(name):\n    print(f"Thread {name} started")\n    time.sleep(1)\n    print(f"Thread {name} done")\n\nt = threading.Thread(target=worker, args=("A",))\nt.start(); t.join()`} />
          </SlideItem>
          <SlideItem delay={0.6}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full mt-4">
              {[
                { label: 'Good for', desc: 'I/O-bound: network, files, databases', color: 'text-green-400' },
                { label: 'Limited by GIL', desc: 'CPU-bound: use multiprocessing instead', color: 'text-red-400' },
              ].map((c, i) => {
                const handleClick = useClickGlow();
                return (
                  <div key={i} onClick={handleClick} className="rounded-2xl p-4 dark-card">
                    <div className={`font-bold ${c.color}`}>{c.label}</div>
                    <div className="text-sm text-slate-400 mt-1">{c.desc}</div>
                  </div>
                );
              })}
            </div>
          </SlideItem>
        </Slide>

        {/* Ch49: Multiprocessing */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="49" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Multiprocessing</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Bypass the GIL with separate processes — true <strong className="text-purple-400">CPU parallelism</strong> for heavy computation!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="multiprocessing_demo.py" code={`from multiprocessing import Process, Pool\nimport os\n\ndef worker(name):\n    print(f"Process {name} PID: {os.getpid()}")\n\nif __name__ == "__main__":\n    p = Process(target=worker, args=("A",))\n    p.start(); p.join()\n\n    with Pool(4) as pool:       # pool of 4\n        results = pool.map(worker, ["A","B","C","D"])`} />
          </SlideItem>
        </Slide>

        {/* Ch50: Date and Time */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="50" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Date and Time</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-8">Python's <strong className="text-emerald-400">datetime module</strong> — dates, times, durations, formatting, and arithmetic!</p></SlideItem>
          <SlideItem delay={0.4} className="w-full max-w-4xl">
            <CodeBlock filename="datetime_demo.py" code={`from datetime import datetime, timedelta\n\nnow = datetime.now()\nprint(now.strftime("%Y-%m-%d %H:%M"))\n\nfuture = now + timedelta(days=7)\npast = now - timedelta(hours=3)\n\nd = datetime.strptime("2024-01-15", "%Y-%m-%d")`} />
          </SlideItem>
        </Slide>

        {/* Ch51: Database */}
        <Slide style={slideStyle}>
          <SlideItem><ChapterBadge num="51" /><h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Database Integration</h2></SlideItem>
          <SlideItem delay={0.2}><p className="text-2xl text-slate-300 leading-relaxed max-w-4xl mb-6">Python works with any database! <strong className="text-amber-400">SQLite is built-in</strong> — no install needed!</p></SlideItem>
          <SlideItem delay={0.4}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full mb-6">
              {[['sqlite3', '🗄️', 'SQLite (built-in)'], ['psycopg2', '🐘', 'PostgreSQL'], ['mysql-connector', '🐬', 'MySQL'], ['pymongo', '🍃', 'MongoDB']].map(([pkg, icon, db], i) => {
                const handleClick = useClickGlow();
                return (
                  <div key={i} onClick={handleClick} className="rounded-2xl p-4 text-center dark-card">
                    <div className="text-2xl">{icon}</div>
                    <code className="font-bold text-amber-400 text-xs block">{pkg}</code>
                    <div className="text-xs text-slate-400">{db}</div>
                  </div>
                );
              })}
            </div>
          </SlideItem>
          <SlideItem delay={0.6} className="w-full max-w-4xl">
            <CodeBlock filename="database.py" code={`import sqlite3\n\nconn = sqlite3.connect('mydb.db')\nc = conn.cursor()\nc.execute('''CREATE TABLE IF NOT EXISTS users\n             (id INTEGER PRIMARY KEY, name TEXT, age INT)''')\nc.execute("INSERT INTO users VALUES (?,?,?)", (1,"Ravi",21))\nconn.commit()\nconn.close()`} />
          </SlideItem>
        </Slide>

        {/* Final Slide */}
        <Slide style={{ background: 'transparent', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.08, 0.20, 0.08] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
              style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)' }} />
          </div>
          <SlideItem>
            <motion.div animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 4 }} className="text-9xl mb-8">🎉</motion.div>
          </SlideItem>
          <SlideItem delay={0.2}><h2 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight drop-shadow-lg" style={{ textShadow: '0 0 60px rgba(56,189,248,0.4)' }}>Congratulations!</h2></SlideItem>
          <SlideItem delay={0.3}>
            <p className="text-2xl text-blue-200 font-medium max-w-3xl mb-8 leading-relaxed">
              You have mastered <strong className="text-white">all 51 Python chapters</strong> — from Hello World to Database Integration! You are ready to build real applications!
            </p>
          </SlideItem>
          <SlideItem delay={0.4}>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {['Variables', 'OOP', 'Lists', 'Functions', 'Inheritance', 'Exceptions', 'File I/O', 'JSON', 'Modules', 'Decorators', 'Generators', 'Regex', 'Threading', 'Database'].map(b => {
                const handleClick = useClickGlow();
                return (
                  <span key={b} onClick={handleClick} className="px-4 py-2 rounded-full font-bold text-sm cursor-pointer dark-card text-sky-300">
                    {b} ✓
                  </span>
                );
              })}
            </div>
          </SlideItem>
          <SlideItem delay={0.5}>
            <p className="text-blue-300 text-lg mb-6">Use the chatbot (bottom-left) to test your knowledge!</p>
          </SlideItem>
          <SlideItem delay={0.6} className="mb-20">
            <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(56,189,248,0.5)' }} whileTap={{ scale: 0.95 }}
              onClick={() => {
                const slides = document.querySelectorAll('.slide-section');
                if (slides[0]) slides[0].scrollIntoView({ behavior: 'smooth' });
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-2xl font-black py-6 px-16 rounded-full shadow-2xl transition-all"
              style={{ background: 'linear-gradient(135deg, #0369a1, #4f46e5)', color: 'white', border: '1px solid rgba(56,189,248,0.4)' }}>
              Start Again
            </motion.button>
          </SlideItem>
        </Slide>

      </div>
    </div>
  );
}
