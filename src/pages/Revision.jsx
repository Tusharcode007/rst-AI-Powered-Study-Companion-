import React, { useContext } from 'react';
import { StudyContext } from '../context/StudyContext';
import { motion } from 'framer-motion';

function Revision() {
  const { revisions, tasks, subjects, topics } = useContext(StudyContext);
  
  const today = new Date().toLocaleDateString('en-CA');
  
  const upcomingRevisions = revisions.filter(r => r.date >= today);
  const overdueRevisions = revisions.filter(r => r.date < today);

  const getTaskDetails = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return null;
    const subject = subjects.find(s => String(s.id) === String(task.subjectId));
    const topic = topics.find(t => String(t.id) === String(task.topicId));
    return { task, subject, topic };
  };

  const renderRevisionList = (revList) => {
    if (revList.length === 0) return <p style={{ color: 'var(--text-secondary)' }}>No revisions found.</p>;
    
    return (
      <div className="list-container">
        {revList.map(rev => {
          const details = getTaskDetails(rev.taskId);
          if (!details) return null;
          
          return (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} layout key={rev.id} className="card list-item">
              <div>
                <strong style={{ fontSize: '1.05rem', color: '#fff' }}>{details.task.title}</strong>
                <span style={{ 
                  marginLeft: '10px', 
                  padding: '4px 10px', 
                  borderRadius: '12px', 
                  fontSize: '0.75rem',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  color: '#60a5fa',
                  fontWeight: 'bold',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                  Scheduled: {rev.date}
                </span>
                <p style={{ marginTop: '0.25rem', marginBottom: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {details.subject ? details.subject.name : 'Unknown Subject'} &bull; {details.topic ? details.topic.name : 'Unknown Topic'}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h2 style={{ marginBottom: '2rem' }}>Revision Planner</h2>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: 'var(--danger-hover)' }}>Overdue Revisions</h3>
        {renderRevisionList(overdueRevisions)}
      </div>

      <div className="card">
        <h3 style={{ color: 'var(--primary-hover)' }}>Upcoming Revisions</h3>
        {renderRevisionList(upcomingRevisions)}
      </div>
    </motion.div>
  );
}

export default Revision;
