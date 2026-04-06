import React from 'react';
import { ExternalLink, Lock } from 'lucide-react';

const RESOURCES = [
  {
    topic: '1. Installation in Python',
    channel: 'Coding Boss Masterclass',
    url: 'https://youtu.be/Y6Flc1bxDMg?si=H-oY1XJd3wfy4R2f',
    description: 'Install Python by downloading it from the official website, running the installer, and enabling “Add Python to PATH” before finishing setup.',
    emoji: '🏗️',
    level: 'Beginner',
    isLocked: false,
  },
  {
    topic: '2. Introduction to Python',
    channel: 'Coding Boss Masterclass',
    url: 'https://youtu.be/sxLLbMk4ado?si=8EDFJG0FnpruP2ZR',
    description: 'Visit channel for intro and setup videos',
    emoji: '🎯',
    level: 'Beginner',
    isLocked: false,
  },
  {
    topic: '3. Variables in Python',
    channel: 'Coding Boss Masterclass',
    url: 'https://www.youtube.com/watch?v=FqOA5Y-YLT0',
    description: 'Learn variables and basic data storage',
    emoji: '📦',
    level: 'Beginner',
    isLocked: false,
  },
  {
    topic: '4. Classes and Objects',
    channel: 'Coding Boss Masterclass',
    url: 'https://www.youtube.com/watch?v=zHeyBHKGug0',
    description: 'Master Object-Oriented Programming (OOP)',
    emoji: '🏗️',
    level: 'Intermediate',
    isLocked: false,
  },
  {
    topic: '5. Datatypes in python',
    channel: 'Coding Boss Masterclass',
    url: 'https://youtu.be/qfgM0ZC_NMQ?si=SLMYshkxtRIddvk8',
    description: 'Data types in Python define the type of value a variable can store and determine the operations that can be performed on it.',
    emoji: '🏗️',
    level: 'Intermediate',
    isLocked: false,
  },
  {
    topic: '6. Operators in python',
    channel: 'Coding Boss Masterclass',
    url: 'https://youtu.be/cLjAERCQEtY?si=N_6g5dflOAJMtt8l',
    description: 'Operators in Python are symbols used to perform operations on variables and values.',
    emoji: '🏗️',
    level: 'Intermediate',
    isLocked: false,
  },
  {
    topic: '7. Python UI: Intro to Tkinter',
    channel: 'Coding Boss Masterclass',
    url: '#',
    description: 'Build your first graphical user interface using Tkinter.',
    emoji: '🖥️',
    level: 'Intermediate',
    isLocked: true,
  },
  {
    topic: '8. Modern Windows with CustomTkinter',
    channel: 'Coding Boss Masterclass',
    url: '#',
    description: 'Create dark mode apps using CustomTkinter widgets.',
    emoji: '🎨',
    level: 'Intermediate',
    isLocked: true,
  },
  {
    topic: '9. Introduction to PyQt5',
    channel: 'Coding Boss Masterclass',
    url: '#',
    description: 'Learn the basics of the powerful PyQt5 framework.',
    emoji: '⚙️',
    level: 'Advanced',
    isLocked: true,
  },
  {
    topic: '10. Streamlit for Web Apps',
    channel: 'Coding Boss Masterclass',
    url: '#',
    description: 'Deploy data science UIs instantly with Streamlit.',
    emoji: '🌐',
    level: 'Intermediate',
    isLocked: true,
  },
  {
    topic: '11. Mobile Apps with Kivy',
    channel: 'Coding Boss Masterclass',
    url: '#',
    description: 'Design multi-touch applications for Android and iOS using Kivy.',
    emoji: '📱',
    level: 'Advanced',
    isLocked: true,
  },
  {
    topic: '12. PySide6 Layouts & Widgets',
    channel: 'Coding Boss Masterclass',
    url: '#',
    description: 'Advanced desktop UI designs using Qt for Python (PySide6).',
    emoji: '🪟',
    level: 'Advanced',
    isLocked: true,
  },
  {
    topic: '13. Fast UIs using Flet',
    channel: 'Coding Boss Masterclass',
    url: '#',
    description: 'Build Flutter-like beautiful web/desktop apps with Flet.',
    emoji: '🦋',
    level: 'Intermediate',
    isLocked: true,
  },
  {
    topic: '14. PySimpleGUI Crash Course',
    channel: 'Coding Boss Masterclass',
    url: '#',
    description: 'The easiest way to wrap command line scripts into a GUI.',
    emoji: '🚀',
    level: 'Beginner',
    isLocked: true,
  },
  {
    topic: '15. Multi-Window Architectures',
    channel: 'Coding Boss Masterclass',
    url: '#',
    description: 'Structure complex UI applications with multiple window management.',
    emoji: '🧩',
    level: 'Advanced',
    isLocked: true,
  },
  {
    topic: '16. UI/UX Best Practices',
    channel: 'Coding Boss Masterclass',
    url: '#',
    description: 'Design beautiful, user-centered Python applications.',
    emoji: '✨',
    level: 'Advanced',
    isLocked: true,
  },
];

export default function YoutubeResources() {
  const handleClick = (e, res) => {
    if (res.isLocked) {
      e.preventDefault();
      alert("Please pay or subscribe to the account to unlock this video!");
    }
  };

  return (
    <div className="space-y-4">
      {RESOURCES.map((res, i) => (
        <a
          key={i}
          href={res.url}
          target={res.isLocked ? undefined : "_blank"}
          rel="noopener noreferrer"
          onClick={(e) => handleClick(e, res)}
          className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all group ${
            res.isLocked ? 'border-slate-800 bg-slate-100 hover:bg-slate-200 cursor-pointer' : 'border-slate-100 bg-white hover:border-yellow-300 hover:shadow-md'
          }`}
        >
          <div className="text-3xl">{res.emoji}</div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-yellow-700 flex items-center gap-2">
              {res.topic}
              {res.isLocked && <Lock size={14} className="text-red-500" />}
            </h3>
            <p className="text-xs text-slate-500 mb-1">{res.description}</p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">📺 {res.channel}</span>
              <span className="text-xs bg-yellow-100 text-yellow-700 font-bold px-2 py-0.5 rounded-full">{res.level}</span>
            </div>
          </div>
          {!res.isLocked && <ExternalLink size={14} className="text-slate-400 group-hover:text-yellow-600 flex-shrink-0 mt-1" />}
        </a>
      ))}
    </div>
  );
}
