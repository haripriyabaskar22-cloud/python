import React from 'react';
import { motion } from 'motion/react';

export const SlideItem = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: false, margin: "-10%" }}
    transition={{ duration: 0.8, delay, type: "spring", bounce: 0.4 }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Slide({ children, className = '', id }) {
  return (
    <section id={id} className={`slide-section p-6 md:p-12 lg:p-24 relative overflow-hidden ${className}`}>
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
        {children}
      </div>
    </section>
  );
}

