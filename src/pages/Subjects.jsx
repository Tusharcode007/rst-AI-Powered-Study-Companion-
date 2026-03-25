import React, { useState, useContext } from 'react';
import { StudyContext } from '../context/StudyContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, FileText, Trash2, Plus, CornerDownRight } from 'lucide-react';

function Subjects() {
  const [name, setName] = useState('');
  const [topicName, setTopicName] = useState('');
  const [topicSubjectId, setTopicSubjectId] = useState('');
  const { subjects, addSubject, deleteSubject, addTopic, updateTopic, topics } = useContext(StudyContext);

  const handleSubjectSubmit = (e) => {
    e.preventDefault();
    if(name) { addSubject(name); setName(''); }
  };

  const handleTopicSubmit = (e) => {
    e.preventDefault();
    if(topicName && topicSubjectId) { addTopic(topicName, topicSubjectId); setTopicName(''); setTopicSubjectId(''); }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Architectural Structuring</h2>
      
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card" style={{ flex: 1, minWidth: '300px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Folder size={20} color="var(--primary)" /> Instantiate Root Subject
          </h3>
          <form onSubmit={handleSubjectSubmit}>
            <input 
              type="text" 
              placeholder="e.g., Computer Science..."
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              style={{ flex: 1 }}
            />
            <button type="submit"><Plus size={18} /> Push Node</button>
          </form>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card" style={{ flex: 1, minWidth: '350px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={20} color="var(--primary)" /> Attach Child Topic
          </h3>
          <form onSubmit={handleTopicSubmit}>
            <input 
              type="text" 
              placeholder="e.g., Binary Search Trees..."
              value={topicName} 
              onChange={(e) => setTopicName(e.target.value)} 
              style={{ flex: 1.5 }}
            />
            <select value={topicSubjectId} onChange={(e) => setTopicSubjectId(e.target.value)} style={{ flex: 1 }}>
              <option value="">Define parent...</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
            <button type="submit"><Plus size={18} /> Attach</button>
          </form>
        </motion.div>
      </div>

      <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Live Namespace Topologies</h3>
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="list-container">
        <AnimatePresence>
          {subjects.map((subject) => (
            <motion.div layout variants={itemVariants} exit={{ opacity: 0, scale: 0.9 }} key={subject.id} className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <strong style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Folder size={22} color="var(--primary)" /> {subject.name}
                </strong>
                <button 
                  className="btn-danger" 
                  onClick={() => deleteSubject(subject.id)}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                  <Trash2 size={16} /> Delete Node
                </button>
              </div>
              
              <ul className="nested-list">
                <AnimatePresence>
                  {topics
                    .filter(topic => String(topic.subjectId) === String(subject.id))
                    .map(topic => (
                      <motion.li 
                        layout
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        key={topic.id} 
                        style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingBottom: '1rem', borderBottom: '1px dashed rgba(255,255,255,0.05)' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.05rem' }}>
                            <CornerDownRight size={16} color="var(--text-secondary)" /> {topic.name}
                          </strong>
                          <select 
                            value={topic.status || 'not-started'} 
                            onChange={(e) => updateTopic(topic.id, { status: e.target.value })}
                            style={{ 
                              padding: '0.35rem 0.5rem', 
                              fontSize: '0.8rem', 
                              backgroundColor: topic.status === 'completed' ? 'rgba(16, 185, 129, 0.1)' : topic.status === 'in-progress' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255,255,255,0.03)',
                              color: topic.status === 'completed' ? '#34d399' : topic.status === 'in-progress' ? '#60a5fa' : 'var(--text-secondary)',
                              borderColor: topic.status === 'completed' ? 'rgba(16, 185, 129, 0.2)' : topic.status === 'in-progress' ? 'rgba(59, 130, 246, 0.2)' : 'var(--border)',
                              fontWeight: '600',
                              outline: 'none'
                           }}
                          >
                            <option value="not-started">Not Started (Idle)</option>
                            <option value="in-progress">In Progress (Active)</option>
                            <option value="completed">Completed (Resolved)</option>
                          </select>
                        </div>
                        <textarea 
                          placeholder="Markdown-friendly technical notes / documentation attached to this topic node..."
                          value={topic.notes || ''}
                          onChange={(e) => updateTopic(topic.id, { notes: e.target.value })}
                          style={{ 
                            padding: '0.75rem', 
                            borderRadius: 'var(--radius)', 
                            border: '1px solid var(--border)', 
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            width: '100%', 
                            minHeight: '80px', 
                            fontFamily: 'monospace',
                            fontSize: '0.85rem',
                            resize: 'vertical',
                            color: 'var(--text-secondary)'
                          }}
                        />
                      </motion.li>
                    ))}
                </AnimatePresence>
              </ul>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Subjects;
