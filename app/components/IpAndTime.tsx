"use client";

import {JSX, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IpAndTime(): JSX.Element {
  const [ip, setIp] = useState<string>('...');
  const [time, setTime] = useState<string>(formatTime(new Date()));

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setIp(data.ip))
      .catch(() => setIp('Unavailable'));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 text-white font-mono text-right select-none">
      <div className="text-xl opacity-80">Your IP: {ip}</div>

      <AnimatePresence mode="wait">
        <motion.div
          key={time}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-5xl font-bold tracking-widest"
        >
          {time}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
