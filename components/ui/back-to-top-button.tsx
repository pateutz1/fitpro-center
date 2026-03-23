'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';

const SCROLL_THRESHOLD_PX = 400;

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD_PX);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          animate={{ opacity: 1, scale: 1, y: 0 }}
          aria-label="Back to top"
          className="group relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-sky-600 to-blue-700 shadow-2xl shadow-sky-600/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400 focus-visible:outline-offset-2"
          exit={{ opacity: 0, scale: 0.85, y: 8 }}
          initial={{ opacity: 0, scale: 0.85, y: 8 }}
          key="back-to-top"
          onClick={scrollToTop}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Gradient overlay — matches floating dock main button layering */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-500/85 to-blue-600/85" />

          {/* Hover glow — same pattern as MainButton */}
          <div className="absolute inset-0 scale-110 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />

          <motion.div
            className="relative z-10"
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {/* Explicit stroke color avoids iOS/Safari missing currentColor on nested SVG */}
            <svg
              aria-hidden="true"
              className="block h-6 w-6 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Back to top</title>
              <path
                d="M12 19V5M5 12l7-7 7 7"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </motion.div>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
};

export default BackToTopButton;
