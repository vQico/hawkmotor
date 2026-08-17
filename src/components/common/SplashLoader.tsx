'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function SplashLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    if (isAdmin) {
      setLoading(false);
      return;
    }

    // Play on every refresh to allow thorough visual inspection and premium greeting
    // Set scroll lock on body while loading
    document.body.style.overflow = 'hidden';

    // Cinematic progress simulation (total ~3.2 seconds)
    // Starts rapidly, then slows down toward 100% to simulate processing
    const duration = 3200; 
    const intervalTime = 25;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const ratio = currentStep / steps;
      
      // Bezier ease-out function
      const easeOutProgress = Math.sin((ratio * Math.PI) / 2);
      const val = Math.min(Math.round(easeOutProgress * 100), 100);
      setProgress(val);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setLoading(false);
          // Restore scroll
          document.body.style.overflow = '';
        }, 450);
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = '';
    };
  }, []);

  if (isAdmin) {
    return null;
  }

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0a0a0a] text-white selection:bg-transparent"
        >
          {/* Ambient Glowing Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
          <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Luxury Opening Frame */}
          <div className="relative flex flex-col items-center max-w-sm px-6 text-center z-10">
            {/* Pulsing Glowing Ring around Logo */}
            <div className="relative mb-8 w-24 h-24 flex items-center justify-center">
              {/* Outer Circular Loader Path */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-white/5"
                  strokeWidth="2.5"
                  fill="transparent"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-brand-primary"
                  strokeWidth="3"
                  fill="transparent"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * progress) / 100}
                  transition={{ ease: 'easeInOut' }}
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))'
                  }}
                />
              </svg>

              {/* Logo Core Icon - Hawk Sparks Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.2)]"
                >
                  <svg
                    className="w-6 h-6 text-brand-primary animate-pulse"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </motion.div>
              </div>
            </div>

            {/* Glowing Brand Title */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-col gap-1 mb-4"
            >
              <h1 className="text-3xl font-black tracking-[0.25em] uppercase leading-none">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-orange-500">HAWK</span>{' '}
                <span className="text-white">MOTOR</span>
              </h1>
              <span className="text-[10px] tracking-[0.4em] font-semibold text-brand-muted uppercase">
                PREMIUM GARAGE & PARTS
              </span>
            </motion.div>

            {/* Premium Linear Progress Slider */}
            <div className="w-48 h-[3px] bg-white/5 rounded-full overflow-hidden mb-3 relative">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-brand-primary to-orange-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Percentage Count & Sub-badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-xs font-mono font-bold text-brand-primary tracking-widest">
                {progress}%
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-brand-muted animate-pulse">
                {progress < 30 && 'Sistem Başlatılıyor...'}
                {progress >= 30 && progress < 70 && 'Koleksiyonlar Yükleniyor...'}
                {progress >= 70 && progress < 100 && 'Bağlantı Güvenli...'}
                {progress === 100 && 'Hoş Geldiniz'}
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
