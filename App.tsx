
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import CoursesGrid from './components/CoursesGrid';
import Contact from './components/Contact';
import MatrixBackground from './components/MatrixBackground';
import CoursesExplorer from './components/CoursesExplorer';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'explorer'>('home');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const navigateTo = (page: 'home' | 'explorer') => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  };

  return (
    <div className="relative min-h-screen selection:bg-[#4a9e9e]/30 selection:text-[#4a9e9e]">
      <MatrixBackground />
      
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#071a1a]"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 border-4 border-[#4a9e9e]/20 border-t-[#4a9e9e] rounded-full animate-spin mb-8"
            />
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-[#4a9e9e] neon-text"
            >
              كورسك عندنا
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-2 text-slate-400 mono text-sm tracking-widest uppercase"
            >
              Building Your Future...
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Navbar onNavigate={navigateTo} activePage={currentPage} />
            
            <AnimatePresence mode="wait">
              {currentPage === 'home' ? (
                <motion.div
                  key="home-view"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Hero onExplore={() => navigateTo('explorer')} />
                  <Features />
                  <CoursesGrid onExplore={() => navigateTo('explorer')} />
                  <Contact />
                </motion.div>
              ) : (
                <motion.div
                  key="explorer-view"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <CoursesExplorer onBack={() => navigateTo('home')} />
                </motion.div>
              )}
            </AnimatePresence>

            <footer className="py-8 text-center text-slate-500 border-t border-slate-800/50 glass-card">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} كورسك عندنا. جميع الحقوق محفوظة.
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
