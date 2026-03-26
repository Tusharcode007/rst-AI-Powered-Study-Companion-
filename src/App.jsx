import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Library, CheckSquare, BrainCircuit, CalendarClock } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import Tasks from './pages/Tasks';
import Revision from './pages/Revision';
import AITools from './pages/AITools';

const pageTransition = {
  initial: { opacity: 0, scale: 0.98, filter: 'blur(4px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, scale: 0.98, filter: 'blur(4px)' },
  transition: { duration: 0.3, ease: 'easeInOut' }
};

// Extracted wrapper to read useLocation for AnimatePresence
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<motion.div {...pageTransition} style={{ width: '100%' }}><Dashboard /></motion.div>} />
        <Route path="/subjects" element={<motion.div {...pageTransition} style={{ width: '100%' }}><Subjects /></motion.div>} />
        <Route path="/tasks" element={<motion.div {...pageTransition} style={{ width: '100%' }}><Tasks /></motion.div>} />
        <Route path="/revision" element={<motion.div {...pageTransition} style={{ width: '100%' }}><Revision /></motion.div>} />
        <Route path="/ai-tools" element={<motion.div {...pageTransition} style={{ width: '100%' }}><AITools /></motion.div>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar */}
        <nav className="sidebar">
          <h1>
            <span style={{ 
              background: 'linear-gradient(135deg, var(--primary), #8b5cf6)', 
              padding: '0.4rem', 
              borderRadius: '10px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}>
              <BrainCircuit size={22} color="white" />
            </span>
            Study Babe
          </h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
              <LayoutDashboard size={18} /> Dashboard
            </NavLink>
            <NavLink to="/subjects" className={({ isActive }) => (isActive ? 'active' : '')}>
              <Library size={18} /> Subjects
            </NavLink>
            <NavLink to="/tasks" className={({ isActive }) => (isActive ? 'active' : '')}>
              <CheckSquare size={18} /> Tasks
            </NavLink>
            <NavLink to="/revision" className={({ isActive }) => (isActive ? 'active' : '')}>
              <CalendarClock size={18} /> Revision
            </NavLink>
            <NavLink to="/ai-tools" className={({ isActive }) => (isActive ? 'active' : '')}>
              <BrainCircuit size={18} /> AI Tools
            </NavLink>
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="main-content">
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
