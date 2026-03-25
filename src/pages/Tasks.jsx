import React, { useState, useContext } from 'react';
import { StudyContext } from '../context/StudyContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, CalendarDays, CheckCircle, Circle } from 'lucide-react';

function Tasks() {
  const [title, setTitle] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [topicName, setTopicName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('medium');
  
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('A-Z');
  
  const { subjects, addSubject, topics, addTopic, addTask, tasks, toggleTaskStatus } = useContext(StudyContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(title.trim()) { 
      let finalSubId = '';
      let finalTopId = '';

      // Auto-resolve or create Subject natively
      if (subjectName.trim()) {
        const existingSub = subjects.find(s => s.name.toLowerCase() === subjectName.trim().toLowerCase());
        finalSubId = existingSub ? existingSub.id : addSubject(subjectName.trim());
      }

      // Auto-resolve or create Topic if mapped to Subject natively
      if (topicName.trim() && finalSubId) {
        const existingTop = topics.find(t => String(t.subjectId) === String(finalSubId) && t.name.toLowerCase() === topicName.trim().toLowerCase());
        finalTopId = existingTop ? existingTop.id : addTopic(topicName.trim(), finalSubId);
      }

      addTask(title.trim(), finalSubId, finalTopId, deadline, priority); 
      setTitle(''); 
      setSubjectName(''); 
      setTopicName(''); 
      setDeadline('');
      setPriority('medium');
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Task Engineering</h2>
      
      <motion.div 
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        className="card" style={{ marginBottom: '2rem' }}
      >
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} color="var(--primary)" /> Instantiate Task
        </h3>
        <form onSubmit={handleSubmit} style={{ margin: 0 }}>
          <input 
            type="text" 
            placeholder="Action item..."
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            style={{ flex: 2, minWidth: '200px' }}
          />
          <input
            type="text"
            list="subject-datalist"
            placeholder="Subject Tag (Optional)"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />
          <datalist id="subject-datalist">
            {subjects.map(s => <option key={s.id} value={s.name} />)}
          </datalist>

          <input
            type="text"
            list="topic-datalist"
            placeholder="Topic Tag (Optional)"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
          />
          <datalist id="topic-datalist">
            {topics.filter(t => !subjectName || (subjects.find(s => s.name.toLowerCase() === subjectName.toLowerCase())?.id === t.subjectId)).map(t => <option key={t.id} value={t.name} />)}
          </datalist>
          <input 
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            style={{ colorScheme: 'dark' }}
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">Urgent Priority</option>
          </select>
          <button type="submit"><Plus size={18} /> Spawn Module</button>
        </form>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="card" style={{ marginBottom: '2rem' }}
      >
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Search size={20} color="var(--primary)" /> Data Filtering & Interpolation
        </h3>
        
        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {['All', 'Pending', 'Completed', 'Overdue'].map(tab => (
            <button 
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              style={{
                backgroundColor: filter === tab ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
                color: filter === tab ? 'white' : 'var(--text-secondary)',
                border: filter === tab ? '1px solid var(--primary)' : '1px solid var(--border)',
                flex: 1,
                minWidth: '100px',
                boxShadow: filter === tab ? '0 0 12px rgba(59, 130, 246, 0.3)' : 'none'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <form style={{ margin: 0 }}>
          <input 
            type="text" 
            placeholder="Fuzzy search titles..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1.5, minWidth: '150px' }}
          />
          <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)} style={{ flex: 1 }}>
            <option value="All">All Linked Subjects</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ flex: 1 }}>
            <option value="A-Z">Lexicographical (A-Z)</option>
            <option value="Z-A">Lexicographical (Z-A)</option>
            <option value="Deadline (Earliest)">Chronological (Nearest)</option>
            <option value="Deadline (Latest)">Chronological (Furthest)</option>
            <option value="Priority (High-Low)">Weight (High-Low)</option>
            <option value="Priority (Low-High)">Weight (Low-High)</option>
          </select>
        </form>
      </motion.div>

      <motion.div layout className="list-container">
        <AnimatePresence mode="popLayout">
          {tasks
            .filter(task => {
              if (filter === 'Pending' && task.status !== 'pending') return false;
              if (filter === 'Completed' && task.status !== 'completed') return false;
              if (filter === 'Overdue') {
                if (task.status === 'completed') return false;
                if (!task.deadline) return false;
                const today = new Date().toLocaleDateString('en-CA');
                if (task.deadline >= today) return false;
              }
              if (subjectFilter !== 'All' && String(task.subjectId) !== String(subjectFilter)) return false;
              if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
              return true;
            })
            .sort((a, b) => {
              if (sortOrder === 'A-Z') return a.title.localeCompare(b.title);
              if (sortOrder === 'Z-A') return b.title.localeCompare(a.title);
              if (sortOrder === 'Deadline (Earliest)') {
                if (!a.deadline) return 1;
                if (!b.deadline) return -1;
                return a.deadline.localeCompare(b.deadline);
              }
              if (sortOrder === 'Deadline (Latest)') {
                if (!a.deadline) return 1;
                if (!b.deadline) return -1;
                return b.deadline.localeCompare(a.deadline);
              }
              if (sortOrder === 'Priority (High-Low)') {
                const weight = { high: 3, medium: 2, low: 1 };
                return (weight[b.priority] || 2) - (weight[a.priority] || 2);
              }
              if (sortOrder === 'Priority (Low-High)') {
                const weight = { high: 3, medium: 2, low: 1 };
                return (weight[a.priority] || 2) - (weight[b.priority] || 2);
              }
              return 0;
            })
            .map(task => {
              const subject = subjects.find(s => String(s.id) === String(task.subjectId));
              const topic = topics.find(t => String(t.id) === String(task.topicId));
              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.25, type: 'spring', bounce: 0.2 }}
                  key={task.id} 
                  className="card list-item"
                  style={{ display: 'flex', gap: '2rem' }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '1.1rem', color: task.status === 'completed' ? 'var(--text-secondary)' : '#fff', textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>
                        {task.title}
                      </strong>
                      <span style={{ 
                        padding: '2px 10px', 
                        borderRadius: '20px', 
                        fontSize: '0.7rem',
                        backgroundColor: task.status === 'completed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                        color: task.status === 'completed' ? '#34d399' : 'var(--text-secondary)',
                        textTransform: 'uppercase',
                        fontWeight: '600',
                        border: task.status === 'completed' ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid var(--border)'
                      }}>
                        {task.status}
                      </span>
                    </div>
                    
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--primary)' }}>{subject ? subject.name : 'Uncategorized'}</span> 
                      &bull; {topic ? topic.name : 'Root Topic'}
                    </p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <CalendarDays size={14} /> <strong>Due:</strong> {task.deadline || 'Indefinite'} &bull; 
                      <strong style={{ 
                        color: task.priority === 'high' ? 'var(--danger-hover)' : task.priority === 'medium' ? '#fbbf24' : '#9ca3af' 
                      }}>Priority: {task.priority || 'medium'}</strong>
                    </p>
                  </div>
                  
                  <button 
                    style={{ 
                      backgroundColor: task.status === 'pending' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)', 
                      color: task.status === 'pending' ? 'white' : 'var(--text-secondary)',
                      width: '45px',
                      height: '45px',
                      padding: 0,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: task.status === 'completed' ? '1px solid var(--border)' : 'none'
                    }}
                    onClick={() => toggleTaskStatus(task.id)}
                    title={task.status === 'pending' ? 'Mark Completed' : 'Mark Pending'}
                  >
                    {task.status === 'pending' ? <Circle size={22} /> : <CheckCircle size={22} color="#34d399" />}
                  </button>
                </motion.div>
              );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Tasks;
