"use client";
import React from 'react';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { key: "about", label: "About Me" },
  { key: "experience", label: "Experience" },
  { key: "nextos", label: "NextOS" },
  { key: "contact", label: "Contact Me" },
];

const DUMMY_CONTENT: Record<string, React.ReactNode> = {
  about: (
    <div>
      <h2 className="text-green-400 text-xl font-mono mb-2">About Me</h2>
      <p className="font-mono">I'm Ananya, a passionate developer who loves building full stack applications and exploring new tech. I also enjoy customizing Linux environments and creating unique user experiences.</p>
    </div>
  ),
  experience: (
    <div>
      <h2 className="text-green-400 text-xl font-mono mb-2">Experience</h2>
      <ul className="font-mono list-disc ml-5">
        <li>Full Stack Developer at DummyCorp (2022-2024)</li>
        <li>Open Source Contributor - NextOS Project</li>
        <li>Intern at Linux Wizards</li>
      </ul>
    </div>
  ),
  nextos: (
    <div>
      <h2 className="text-green-400 text-xl font-mono mb-2">NextOS</h2>
      <p className="font-mono">NextOS is my personal project: a Linux-inspired, highly customizable desktop environment built with modern web technologies. Stay tuned for more updates!</p>
    </div>
  ),
  contact: (
    <div>
      <h2 className="text-green-400 text-xl font-mono mb-2">Contact Me</h2>
      <p className="font-mono">Email: ananya@example.com<br/>GitHub: github.com/ananya</p>
    </div>
  ),
};

export default function Portfolio() {
  const [selected, setSelected] = useState("about");

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Sidebar */}
      <aside className="md:w-1/4 w-full md:h-full h-auto flex md:flex-col flex-row md:items-start items-center md:justify-center justify-center py-4 z-10">
        {SECTIONS.map((section) => (
          <button
            key={section.key}
            onClick={() => setSelected(section.key)}
            className={`font-mono text-lg md:text-2xl px-6 py-3 md:w-full w-auto text-left rounded transition-all duration-200 my-1 md:my-2 mx-1 md:mx-0
              ${selected === section.key ? "text-green-400" : "text-zinc-300 hover:text-white hover:bg-green-400/10 hover:scale-105"}`}
            style={{ transition: 'all 0.2s cubic-bezier(.4,2,.6,1)' }}
          >
            {section.label}
          </button>
        ))}
      </aside>
      {/* Terminal-like Content */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-12 min-h-[60vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full max-w-2xl rounded-2xl p-6 font-mono text-zinc-100 relative overflow-auto min-h-[300px] border border-white/80 bg-white/10 backdrop-blur-md shadow-lg"
          >
            {/* Terminal header */}
            <div className="flex items-center mb-4">
              <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="ml-4 text-green-400 text-sm">{SECTIONS.find(s => s.key === selected)?.label}</span>
            </div>
            <div className="mt-2">
              {DUMMY_CONTENT[selected]}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}