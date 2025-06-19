import { JSX, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const phrases = [
  'Ananya Pratap Singh',
  'probably sleeping somewhere right now',
  'creating full stack applications out of pure hate',
  'probably printing some dope rn',
  'racist',
  'listening to Kanye',
  'texting someone I shouldn\'t',
];

export default function GlitchHeading(): JSX.Element {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [typing, setTyping] = useState(true);
  const [zooming, setZooming] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (typing) {
      if (displayText.length < phrases[index].length) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev + phrases[index][prev.length]);
        }, 50);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, 30);
      } else {
        setIndex((prev) => (prev + 1) % phrases.length);
        setTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, typing, index]);

  useEffect(() => {
    if (zooming) return;
    const handleSpace = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !zooming) {
        setZooming(true);
        setTimeout(() => {
          router.push('/portfolio');
        }, 600); // match animation duration
      }
    };
    window.addEventListener('keydown', handleSpace);
    return () => window.removeEventListener('keydown', handleSpace);
  }, [zooming, router]);

  return (
    <motion.div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-50 w-full"
      initial={{ scale: 1 }}
      animate={zooming ? { scale: 1.2, opacity: 0 } : { scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-mono">
        Hey there, I am{' '}
        <motion.span
          key={index}
          className="text-green-400"
        >
          {displayText}
          <span className="animate-pulse">|</span>
        </motion.span>
      </h1>
      <div className="absolute left-1/2 transform -translate-x-1/2 mt-24 w-full">
        <span className="text-lg sm:text-xl md:text-2xl font-mono text-white-100 select-none"
          style={{
            animation: 'fadePulse 3s infinite',
            display: 'inline-block',
          }}
        >
          press spacebar to continue
        </span>
      </div>
      <style jsx global>{`
        @keyframes fadePulse {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </motion.div>
  );
}
