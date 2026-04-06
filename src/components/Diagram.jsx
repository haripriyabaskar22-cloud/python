import React from 'react';
import { motion } from 'motion/react';
import { Globe, Smartphone, Laptop, RotateCw, Box, Code, Terminal, Cpu, Database, Settings, Zap, Scale, Package } from 'lucide-react';

export default function Diagram({ type }) {
  switch (type) {

    case 'intro':
      return (
        <div className="flex flex-col items-center w-full mt-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-3xl mx-auto">
            <motion.div animate={{ y: [0,-15,0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="flex flex-col items-center bg-yellow-50 p-8 rounded-3xl border-2 border-yellow-200 shadow-lg relative">
              <Laptop size={64} className="text-yellow-600 mb-4" />
              <span className="text-xl font-bold text-yellow-900">Write Python Code</span>
              <motion.div animate={{ opacity: [0,1,0], y: [10,-20] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                className="absolute -top-6 right-2 text-yellow-400 font-mono text-sm font-bold">.py</motion.div>
            </motion.div>
            <div className="flex items-center justify-center w-24">
              <svg width="96" height="20">
                <motion.line x1="0" y1="10" x2="96" y2="10" stroke="#F59E0B" strokeWidth="4" strokeDasharray="8 8"
                  animate={{ strokeDashoffset: [0,-100] }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }} />
              </svg>
            </div>
            <motion.div animate={{ y: [0,-15,0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.5 }}
              className="flex flex-col items-center bg-emerald-50 p-8 rounded-3xl border-2 border-emerald-200 shadow-lg relative">
              <div className="flex gap-4 mb-4">
                <Globe size={48} className="text-emerald-500" />
                <Smartphone size={48} className="text-emerald-500" />
              </div>
              <span className="text-xl font-bold text-emerald-900">Run Anywhere</span>
              <motion.div animate={{ opacity: [0,1,0], y: [10,-20] }} transition={{ repeat: Infinity, duration: 2, delay: 1.5 }}
                className="absolute -top-6 left-2 text-emerald-400 font-mono text-sm font-bold">.pyc</motion.div>
            </motion.div>
          </div>
        </div>
      );

    case 'timeline':
      return (
        <div className="flex flex-col items-center w-full mt-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-5xl mx-auto relative">
            <div className="absolute top-1/2 left-0 w-full h-2 bg-slate-100 -z-10 hidden md:block rounded-full" />
            <motion.div className="absolute top-1/2 left-0 h-2 bg-yellow-400 -z-10 hidden md:block rounded-full"
              initial={{ width: '0%' }} whileInView={{ width: '100%' }} transition={{ duration: 1.5, ease: 'easeInOut' }} />
            {[
              { year: '1989', event: 'Guido Starts Python', icon: <Code size={32}/>, color: 'bg-orange-100 text-orange-800 border-orange-300' },
              { year: '1991', event: 'Python 1.0 Released', icon: <Package size={32}/>, color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
              { year: '2008', event: 'Python 3.0 Launch', icon: <Zap size={32}/>, color: 'bg-blue-100 text-blue-800 border-blue-300' },
              { year: 'Today', event: '#1 Popular Language', icon: <Globe size={32}/>, color: 'bg-purple-100 text-purple-800 border-purple-300' },
            ].map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3, type: 'spring', bounce: 0.4 }}
                className={`flex-1 flex flex-col items-center p-8 rounded-3xl border-4 ${item.color} w-full shadow-xl bg-white`}>
                <div className="bg-white p-4 rounded-full shadow-sm mb-4 border-2 border-current">{item.icon}</div>
                <span className="text-4xl font-black mb-2">{item.year}</span>
                <span className="text-xl font-bold text-center">{item.event}</span>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case 'architecture':
      return (
        <div className="flex flex-col items-center w-full mt-12">
          <div className="w-full max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
              className="w-full bg-yellow-50 border-4 border-yellow-300 rounded-[2.5rem] p-8 relative shadow-xl">
              <div className="absolute -top-6 left-8 bg-yellow-600 text-white px-6 py-2 rounded-full font-bold shadow-md text-lg">Python Interpreter</div>
              <div className="flex flex-col md:flex-row gap-6 mt-6">
                <div className="flex-1 border-4 border-dashed border-yellow-300 rounded-3xl p-6 flex flex-col items-center justify-center bg-white/60">
                  <Terminal size={48} className="text-yellow-500 mb-4" />
                  <span className="text-yellow-800 font-bold text-xl text-center">Source Code<br/><span className="text-sm font-normal text-yellow-600">(.py files)</span></span>
                </div>
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
                  className="flex-[2] bg-emerald-50 border-4 border-emerald-300 rounded-3xl p-8 relative shadow-inner">
                  <div className="absolute -top-5 left-6 bg-emerald-500 text-white px-5 py-1.5 rounded-full font-bold shadow-md">Bytecode Cache</div>
                  <div className="flex flex-col md:flex-row gap-6 mt-4">
                    <div className="flex-1 border-4 border-dashed border-emerald-300 rounded-2xl p-4 flex flex-col items-center justify-center bg-white/60">
                      <Box size={40} className="text-emerald-500 mb-2" />
                      <span className="text-emerald-800 font-bold text-center">Bytecode (.pyc)<br/><span className="text-xs font-normal">__pycache__</span></span>
                    </div>
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, type: 'spring' }}
                      className="flex-1 bg-purple-100 border-4 border-purple-400 rounded-2xl p-6 relative flex flex-col items-center justify-center shadow-md">
                      <div className="absolute -top-4 left-4 bg-purple-600 text-white px-4 py-1 rounded-full font-bold text-sm shadow-sm">PVM</div>
                      <Cpu size={48} className="text-purple-600 mb-2 mt-2" />
                      <span className="text-purple-900 font-black text-center text-lg leading-tight">Executes<br/>Bytecode</span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      );

    case 'variable':
      return (
        <div className="flex flex-col items-center w-full mt-12">
          <div className="flex flex-col items-center mx-auto">
            <div className="relative w-64 h-64 flex items-end justify-center pb-4">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}
                className="absolute bottom-0 w-48 h-40 border-8 border-blue-500 bg-blue-100 rounded-2xl flex items-end justify-center pb-4 z-10 shadow-xl">
                <span className="text-blue-900 font-black text-3xl font-mono bg-white/50 px-4 py-1 rounded-lg">age</span>
              </motion.div>
              <motion.div initial={{ y: -150, opacity: 0, rotate: -10 }} whileInView={{ y: 10, opacity: 1, rotate: 0 }}
                transition={{ type: 'spring', bounce: 0.6, delay: 0.6, duration: 1.2 }}
                className="absolute top-0 bg-emerald-500 text-white font-black text-5xl px-8 py-6 rounded-xl z-0 shadow-2xl border-4 border-emerald-300">
                21
              </motion.div>
            </div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.2 }}
              className="mt-6 text-slate-500 font-bold text-lg text-center">
              The value <strong className="text-emerald-600">21</strong> is stored inside the box named <strong className="text-blue-600">age</strong>
            </motion.p>
          </div>
        </div>
      );

    case 'flowchart':
      return (
        <div className="flex flex-col items-center w-full mt-12">
          <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
              className="bg-amber-100 border-4 border-amber-400 text-amber-900 px-16 py-8 rounded-full font-black text-3xl shadow-lg">
              Condition?
            </motion.div>
            <div className="flex justify-between w-full px-12 mt-2 relative" style={{ minHeight: '180px' }}>
              <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 400 160" preserveAspectRatio="none">
                <motion.path d="M 200 10 Q 80 60 80 140" fill="transparent" stroke="#10B981" strokeWidth="5" strokeDasharray="10 10"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} />
                <motion.path d="M 200 10 Q 320 60 320 140" fill="transparent" stroke="#F43F5E" strokeWidth="5" strokeDasharray="10 10"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} />
              </svg>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
                className="flex flex-col items-center mt-20">
                <span className="bg-emerald-500 text-white font-bold text-xl px-4 py-1 rounded-full mb-4 shadow-md">True</span>
                <div className="bg-emerald-50 border-4 border-emerald-300 px-8 py-6 rounded-2xl text-emerald-900 text-2xl font-bold shadow-lg">if block</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
                className="flex flex-col items-center mt-20">
                <span className="bg-rose-500 text-white font-bold text-xl px-4 py-1 rounded-full mb-4 shadow-md">False</span>
                <div className="bg-rose-50 border-4 border-rose-300 px-8 py-6 rounded-2xl text-rose-900 text-2xl font-bold shadow-lg">else block</div>
              </motion.div>
            </div>
          </div>
        </div>
      );

    case 'loop':
      return (
        <div className="flex flex-col items-center w-full mt-12">
          <div className="flex flex-col items-center mx-auto">
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div className="absolute inset-0 border-8 border-indigo-100 rounded-full shadow-inner" />
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <motion.circle cx="128" cy="128" r="120" fill="transparent" stroke="#6366F1" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray="750" animate={{ strokeDashoffset: [750, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'linear' }} />
              </svg>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                className="absolute inset-0 flex items-start justify-center">
                <div className="w-8 h-8 bg-indigo-600 rounded-full -mt-4 shadow-lg shadow-indigo-500/50" />
              </motion.div>
              <div className="text-center">
                <RotateCw size={48} className="text-indigo-400 mx-auto mb-2" />
                <span className="font-bold text-indigo-900 text-xl">Repeat</span>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              className="mt-12 bg-indigo-50 border-4 border-indigo-200 px-12 py-6 rounded-full text-indigo-900 text-2xl font-bold shadow-md">
              While condition is True
            </motion.div>
          </div>
        </div>
      );

    case 'datatypes':
      return (
        <div className="flex flex-col items-center w-full mt-12">
          <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center items-end gap-4 md:gap-8">
              {[
                { name: 'int', size: 'Whole numbers', height: 80, color: 'bg-pink-100 border-pink-300 text-pink-800' },
                { name: 'float', size: 'Decimals', height: 128, color: 'bg-purple-100 border-purple-300 text-purple-800' },
                { name: 'str', size: 'Text', height: 192, color: 'bg-blue-100 border-blue-300 text-blue-800' },
                { name: 'list', size: 'Collection', height: 256, color: 'bg-emerald-100 border-emerald-300 text-emerald-800' },
              ].map((dt, i) => (
                <motion.div key={dt.name} initial={{ opacity: 0, scaleY: 0 }} whileInView={{ opacity: 1, scaleY: 1 }}
                  style={{ height: dt.height, originY: 1 }} transition={{ delay: i * 0.2, type: 'spring', bounce: 0.4 }}
                  className={`w-24 md:w-32 ${dt.color} border-4 rounded-t-2xl flex flex-col justify-end items-center pb-4 shadow-lg relative overflow-hidden`}>
                  <motion.div animate={{ y: [0,-5,0] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                    className="absolute top-4 opacity-30"><Database size={32} /></motion.div>
                  <span className="font-mono font-bold text-xl md:text-2xl">{dt.name}</span>
                  <span className="text-sm md:text-base font-bold opacity-70">{dt.size}</span>
                </motion.div>
              ))}
            </div>
            <div className="w-full max-w-2xl h-4 bg-slate-200 rounded-full mt-2 shadow-inner" />
            <span className="mt-6 text-slate-500 font-bold uppercase tracking-widest text-sm md:text-base">Python Built-in Types</span>
          </div>
        </div>
      );

    case 'operators':
      return (
        <div className="flex flex-col items-center w-full mt-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full max-w-4xl mx-auto">
            {[
              { symbols: '+ - * ** //', label: 'Arithmetic', bg: 'bg-blue-50 border-blue-200', text: 'text-blue-600', textLabel: 'text-blue-900', Icon: Settings },
              { symbols: '== != > <', label: 'Comparison', bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-600', textLabel: 'text-emerald-900', Icon: Scale },
              { symbols: 'and or not', label: 'Logical', bg: 'bg-purple-50 border-purple-200', text: 'text-purple-600', textLabel: 'text-purple-900', Icon: Zap },
            ].map(({ symbols, label, bg, text, textLabel, Icon }, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05, y: -6 }}
                className={`flex flex-col items-center ${bg} border-4 p-8 rounded-[3rem] shadow-xl w-56 h-56 justify-center relative cursor-pointer`}>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                  className="absolute inset-0 flex items-center justify-center opacity-10"><Icon size={140} /></motion.div>
                <span className={`text-3xl font-black ${text} z-10 tracking-widest`}>{symbols}</span>
                <span className={`font-bold ${textLabel} mt-4 z-10 text-xl`}>{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case 'arrays':
      return (
        <div className="flex flex-col items-center w-full mt-12">
          <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
            <div className="flex items-end justify-center gap-0 mb-6">
              {[85, 92, 78, 96, 88].map((val, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, type: 'spring', bounce: 0.5 }} className="flex flex-col items-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-indigo-100 border-4 border-indigo-400 flex items-center justify-center font-black text-3xl text-indigo-800 shadow-lg"
                    style={{ borderRight: i < 4 ? '2px solid #818cf8' : undefined }}>{val}</div>
                  <span className="mt-2 text-slate-500 font-mono font-bold text-lg">[{i}]</span>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.9 }}
              className="mt-4 bg-indigo-50 border-2 border-indigo-200 px-8 py-4 rounded-2xl text-indigo-800 font-bold text-xl text-center">
              scores = [85, 92, 78, 96, 88]
            </motion.div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.1 }}
              className="mt-4 text-slate-500 text-lg font-medium text-center">
              ⚠️ Index always starts at <strong className="text-indigo-600">0</strong>, not 1!
            </motion.p>
          </div>
        </div>
      );

    case 'oop-pillars':
      return (
        <div className="flex flex-col items-center w-full mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl mx-auto">
            {[
              { emoji: '🔒', title: 'Encapsulation', desc: 'Bundle data & methods in a class', color: 'bg-blue-50 border-blue-200 text-blue-900' },
              { emoji: '👨‍👧', title: 'Inheritance', desc: 'Child class inherits from parent', color: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
              { emoji: '🎭', title: 'Polymorphism', desc: 'Duck typing — same method, different objects', color: 'bg-purple-50 border-purple-200 text-purple-900' },
              { emoji: '🔭', title: 'Abstraction', desc: 'Hide complexity with abc module', color: 'bg-rose-50 border-rose-200 text-rose-900' },
            ].map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -8, scale: 1.03 }} transition={{ delay: i * 0.15, type: 'spring', bounce: 0.5 }}
                className={`flex flex-col items-center p-8 rounded-3xl border-4 ${p.color} shadow-lg text-center`}>
                <span className="text-6xl mb-4">{p.emoji}</span>
                <h3 className="font-black text-xl mb-2">{p.title}</h3>
                <p className="text-sm opacity-70 font-medium">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case 'class-object':
      return (
        <div className="flex flex-col items-center w-full mt-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="flex-1 bg-amber-50 border-4 border-amber-300 rounded-3xl p-8 shadow-xl text-left">
              <div className="bg-amber-400 text-white font-black px-5 py-2 rounded-full inline-block mb-6 text-lg">📐 CLASS = Blueprint</div>
              <div className="bg-[#1E1E1E] rounded-2xl p-6 font-mono text-base leading-loose">
                <span className="text-pink-400">class </span><span className="text-yellow-200">Car</span><span className="text-white">:</span><br/>
                <span className="text-pink-400 ml-4">  def </span><span className="text-blue-300">__init__</span><span className="text-white">(self, brand, speed):</span><br/>
                <span className="text-white ml-8">    self.</span><span className="text-blue-300">brand</span><span className="text-white"> = brand</span><br/>
                <span className="text-pink-400 ml-4">  def </span><span className="text-emerald-400">drive</span><span className="text-white">(self): ...</span>
              </div>
            </motion.div>
            <motion.div animate={{ x: [0,10,0] }} transition={{ repeat: Infinity, duration: 2 }}
              className="text-5xl text-slate-400 hidden md:block">→</motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', bounce: 0.4, delay: 0.3 }} className="flex-1 flex flex-col gap-4">
              <div className="bg-blue-500 text-white font-black px-5 py-2 rounded-full inline-block mb-2 text-lg self-start">🏎️ OBJECTS = Instances</div>
              {[{ brand: '"Toyota"', speed: '120' }, { brand: '"BMW"', speed: '200' }].map((obj, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.2, type: 'spring' }}
                  className="bg-blue-50 border-4 border-blue-200 rounded-2xl p-5 font-mono text-base shadow-md">
                  <span className="text-blue-700 font-bold">car{i + 1}</span>
                  <span className="text-slate-500"> = Car(</span><span className="text-orange-500">{obj.brand}</span><span className="text-slate-500">, </span><span className="text-emerald-600">{obj.speed}</span><span className="text-slate-500">)</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      );

    case 'inheritance':
      return (
        <div className="flex flex-col items-center w-full mt-12">
          <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="bg-emerald-50 border-4 border-emerald-400 rounded-3xl px-12 py-6 text-center shadow-xl">
              <span className="text-4xl mb-2 block">🐾</span>
              <div className="font-black text-2xl text-emerald-900">Animal</div>
              <div className="text-emerald-700 text-base font-mono mt-2">name, eat(), sleep()</div>
            </motion.div>
            <motion.div animate={{ y: [0,6,0] }} transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-5xl text-slate-400 my-2">↓</motion.div>
            <div className="flex gap-8 w-full justify-center">
              {[
                { emoji: '🐶', name: 'Dog(Animal)', extra: 'bark()', color: 'bg-blue-50 border-blue-400 text-blue-900' },
                { emoji: '🐱', name: 'Cat(Animal)', extra: 'meow()', color: 'bg-purple-50 border-purple-400 text-purple-900' },
              ].map((child, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.2, type: 'spring', bounce: 0.5 }}
                  className={`flex-1 ${child.color} border-4 rounded-3xl px-8 py-6 text-center shadow-lg`}>
                  <span className="text-4xl mb-2 block">{child.emoji}</span>
                  <div className="font-black text-2xl">{child.name}</div>
                  <div className="font-mono text-base mt-1 font-bold">+ {child.extra}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'methods':
      return (
        <div className="flex flex-col items-center w-full mt-12">
          <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 w-full">
              {[
                { label: '📥 Input (Parameters)', color: 'bg-blue-50 border-blue-300 text-blue-900', items: ['a', 'b'] },
                { label: '⚙️ Function Body', color: 'bg-amber-50 border-amber-300 text-amber-900', items: ['result = a + b', 'return result'] },
                { label: '📤 Output (Return)', color: 'bg-emerald-50 border-emerald-300 text-emerald-900', items: ['result', '→ 15'] },
              ].map((col, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, type: 'spring', bounce: 0.4 }}
                  className={`flex-1 ${col.color} border-4 rounded-3xl p-6 shadow-lg text-center`}>
                  <div className="font-black text-lg mb-4">{col.label}</div>
                  {col.items.map((item, j) => (
                    <div key={j} className="font-mono text-base bg-white/60 rounded-xl px-4 py-2 mb-2">{item}</div>
                  ))}
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="mt-8 text-slate-500 font-bold text-lg text-center">
              add_numbers(10, 5) → <span className="text-emerald-600 font-black text-2xl">15</span>
            </motion.div>
          </div>
        </div>
      );

    case 'strings':
      return (
        <div className="flex flex-col items-center w-full mt-12">
          <div className="flex flex-wrap justify-center gap-4 w-full max-w-5xl mx-auto">
            {[
              { method: 'len()', result: '12', desc: 'Count of characters', color: 'bg-blue-50 border-blue-200 text-blue-900' },
              { method: '.upper()', result: 'HELLO PYTHON', desc: 'All uppercase', color: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
              { method: '[0]', result: '"H"', desc: 'First character', color: 'bg-purple-50 border-purple-200 text-purple-900' },
              { method: '"Py" in s', result: 'True', desc: 'Check if exists', color: 'bg-amber-50 border-amber-200 text-amber-900' },
              { method: '.replace()', result: '"Hi Python"', desc: 'Replace text', color: 'bg-rose-50 border-rose-200 text-rose-900' },
              { method: '.split(" ")', result: '["Hello","Python"]', desc: 'Split into list', color: 'bg-indigo-50 border-indigo-200 text-indigo-900' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -6, scale: 1.04 }} transition={{ delay: i * 0.1, type: 'spring', bounce: 0.5 }}
                className={`${s.color} border-4 rounded-2xl p-5 w-44 text-center shadow-md cursor-default`}>
                <code className="font-mono font-black text-sm block mb-2">{s.method}</code>
                <div className="bg-white/70 rounded-lg py-1 px-2 font-bold text-base mb-1">{s.result}</div>
                <div className="text-xs opacity-70 font-medium">{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case 'exceptions':
      return (
        <div className="flex flex-col items-center w-full mt-12">
          <div className="flex flex-col gap-4 w-full max-w-3xl mx-auto">
            {[
              { label: 'try:', desc: 'Code that might raise an exception', color: 'bg-blue-50 border-blue-300 text-blue-900', icon: '🧪' },
              { label: 'except ExceptionType:', desc: 'Catches and handles the specific error', color: 'bg-rose-50 border-rose-300 text-rose-900', icon: '🛡️' },
              { label: 'else:', desc: 'Runs only if NO exception occurred', color: 'bg-amber-50 border-amber-300 text-amber-900', icon: '✨' },
              { label: 'finally:', desc: 'Always runs — great for cleanup code', color: 'bg-emerald-50 border-emerald-300 text-emerald-900', icon: '✅' },
            ].map((block, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.25, type: 'spring', bounce: 0.4 }}
                className={`flex items-center gap-6 ${block.color} border-4 rounded-2xl p-6 shadow-lg`}>
                <span className="text-4xl">{block.icon}</span>
                <div className="text-left">
                  <code className="font-mono font-black text-lg block">{block.label}</code>
                  <span className="text-base opacity-70 font-medium">{block.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case 'encapsulation':
      return (
        <div className="flex flex-col items-center w-full mt-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="flex-1 bg-rose-50 border-4 border-rose-300 rounded-3xl p-8 shadow-xl text-center">
              <div className="text-5xl mb-4">🔒</div>
              <div className="font-black text-xl text-rose-900 mb-4">Private Data (Hidden)</div>
              <div className="bg-[#1E1E1E] rounded-2xl p-4 font-mono text-sm text-left">
                <span className="text-pink-400">self.</span><span className="text-blue-300">__balance</span><span className="text-white"> = 0</span>
              </div>
              <p className="mt-4 text-rose-700 text-sm font-medium">Double underscore → name-mangled for privacy!</p>
            </motion.div>
            <motion.div animate={{ x: [0,8,0] }} transition={{ repeat: Infinity, duration: 2 }}
              className="text-4xl text-slate-400 hidden md:block">⇄</motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', bounce: 0.4, delay: 0.3 }}
              className="flex-1 bg-emerald-50 border-4 border-emerald-300 rounded-3xl p-8 shadow-xl text-center">
              <div className="text-5xl mb-4">🚪</div>
              <div className="font-black text-xl text-emerald-900 mb-4">@property (Safe Access)</div>
              <div className="flex flex-col gap-2">
                {['@property balance', '@balance.setter', 'def deposit(amount)'].map((m, i) => (
                  <div key={i} className="bg-emerald-100 border-2 border-emerald-300 rounded-xl px-4 py-2 font-mono text-sm text-emerald-800 font-bold">{m}</div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      );

    case 'polymorphism':
      return (
        <div className="flex flex-col items-center w-full mt-12">
          <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }}
              className="bg-purple-100 border-4 border-purple-400 rounded-2xl px-10 py-5 font-mono font-black text-2xl text-purple-900 shadow-lg mb-4">
              animal.speak()
            </motion.div>
            <motion.div animate={{ y: [0,5,0] }} transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-4xl text-slate-400 mb-4">↓</motion.div>
            <div className="flex gap-6 w-full justify-center flex-wrap">
              {[
                { emoji: '🐶', name: 'Dog', result: '"Woof!"', color: 'bg-blue-50 border-blue-300 text-blue-900' },
                { emoji: '🐱', name: 'Cat', result: '"Meow!"', color: 'bg-purple-50 border-purple-300 text-purple-900' },
                { emoji: '🐮', name: 'Cow', result: '"Moo!"', color: 'bg-amber-50 border-amber-300 text-amber-900' },
              ].map((a, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.15, type: 'spring', bounce: 0.5 }}
                  className={`${a.color} border-4 rounded-2xl px-8 py-6 text-center shadow-lg flex-1 min-w-32`}>
                  <span className="text-4xl block mb-2">{a.emoji}</span>
                  <div className="font-black text-lg">{a.name}</div>
                  <div className="font-mono text-base mt-2 font-bold">{a.result}</div>
                </motion.div>
              ))}
            </div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.9 }}
              className="mt-6 text-slate-500 text-lg font-medium text-center">
              Same method <strong className="text-purple-600">speak()</strong> — different behaviour per object 🦆
            </motion.p>
          </div>
        </div>
      );

    case 'collections':
      return (
        <div className="flex flex-col items-center w-full mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
            {[
              { name: 'dict', emoji: '📖', color: 'bg-blue-50 border-blue-300 text-blue-900', desc: 'Key-value pairs, fast lookup, ordered (3.7+)', example: ['"name": "Ravi"', '"age": 21'] },
              { name: 'list', emoji: '📋', color: 'bg-emerald-50 border-emerald-300 text-emerald-900', desc: 'Ordered, mutable, allows duplicates', example: ['"Apple"', '"Banana"', '"Apple"'] },
              { name: 'set', emoji: '🎯', color: 'bg-purple-50 border-purple-300 text-purple-900', desc: 'Unique unordered items, fast membership test', example: ['"Apple"', '"Banana"', '"Mango"'] },
            ].map((col, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.02 }} transition={{ delay: i * 0.2, type: 'spring', bounce: 0.4 }}
                className={`${col.color} border-4 rounded-3xl p-6 shadow-lg text-center`}>
                <span className="text-5xl block mb-3">{col.emoji}</span>
                <div className="font-black text-xl mb-2">{col.name}</div>
                <p className="text-sm opacity-70 font-medium mb-4">{col.desc}</p>
                <div className="flex flex-col gap-1">
                  {col.example.map((item, j) => (
                    <div key={j} className="bg-white/60 rounded-lg px-3 py-1 font-mono text-sm font-bold">{item}</div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}
