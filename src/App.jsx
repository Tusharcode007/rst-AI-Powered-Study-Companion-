import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import Tasks from './pages/Tasks';
import Revision from './pages/Revision';
import AITools from './pages/AITools';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar */}
        <nav className="sidebar">
          <h1>Study App</h1>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/subjects">Subjects</Link>
          <Link to="/tasks">Tasks</Link>
          <Link to="/revision">Revision</Link>
          <Link to="/ai-tools">AI Tools</Link>
        </nav>
        
        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/revision" element={<Revision />} />
            <Route path="/ai-tools" element={<AITools />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
