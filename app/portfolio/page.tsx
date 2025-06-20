'use client';

import { useEffect, useState } from 'react';
import { BatteryCharging, Folder, Globe, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import TerminalApp from '@/app/components/TerminalApp';

export default function DesktopPage() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [day, setDay] = useState('');
  const [openApp, setOpenApp] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString());
      setDay(now.toLocaleDateString(undefined, { weekday: 'long' }));
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full relative text-white font-mono">
      {/* Waybar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-2 flex items-center gap-6 z-50">
        <span>{day}</span>
        <span>{date}</span>
        <span>{time}</span>
        <div className="flex items-center gap-2">
          <BatteryCharging size={16} />
          <span>85%</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe size={16} />
          <span>firefox</span>
        </div>
        <div className="flex items-center gap-2">
          <span>↓</span>
          <span>17.4 Mbps</span>
          <span>↑</span>
          <span>5.1 Mbps</span>
        </div>
      </div>

      {/* Terminal App Window */}
      {openApp === 'Terminal' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 left-1/2 -translate-x-1/2 
               w-[600px] h-[400px] rounded-xl             /* <-- rounder corners */
               bg-white/10 backdrop-blur-md 
               border border-white/20 p-3 z-40 shadow-lg"
        >
          {/* close button only */}
          <button
            onClick={() => setOpenApp(null)}
            className="absolute top-2 right-2 text-xs px-2 py-1 rounded hover:bg-white/10"
          >
            X
          </button>

          <TerminalApp onExit={() => setOpenApp(null)} />
        </motion.div>
      )}
      {/* Dock */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-8 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl z-50"
      >
        <DockIcon icon={<Folder size={24} />} label="Files" onClick={() => setOpenApp('Files')} />
        <DockIcon icon={<Globe size={24} />} label="Firefox" onClick={() => setOpenApp('Firefox')} />
        <DockIcon icon={<Terminal size={24} />} label="Terminal" onClick={() => setOpenApp('Terminal')} />
      </motion.div>
    </div>
  );
}

function DockIcon({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 hover:scale-110 transition-transform duration-200">
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
}