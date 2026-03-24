import React, { useContext } from 'react';
import { StudyContext } from '../context/StudyContext';

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
            <div key={rev.id} className="card list-item">
              <div>
                <strong style={{ fontSize: '1.05rem' }}>{details.task.title}</strong>
                <span style={{ 
                  marginLeft: '10px', 
                  padding: '2px 8px', 
                  borderRadius: '12px', 
                  fontSize: '0.75rem',
                  backgroundColor: 'var(--border)',
                  color: 'var(--text-primary)',
                  fontWeight: 'bold'
                }}>
                  Scheduled: {rev.date}
                </span>
                <p style={{ marginTop: '0.25rem', marginBottom: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {details.subject ? details.subject.name : 'Unknown Subject'} &bull; {details.topic ? details.topic.name : 'Unknown Topic'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Revision Planner</h2>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: 'var(--danger)' }}>Overdue Revisions</h3>
        {renderRevisionList(overdueRevisions)}
      </div>

      <div className="card">
        <h3 style={{ color: 'var(--primary)' }}>Upcoming Revisions</h3>
        {renderRevisionList(upcomingRevisions)}
      </div>
    </div>
  );
}

export default Revision;
