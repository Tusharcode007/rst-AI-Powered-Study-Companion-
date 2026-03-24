import React, { useState, useContext } from 'react';
import { StudyContext } from '../context/StudyContext';

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

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Subjects & Topics</h2>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Add Subject</h3>
        <form onSubmit={handleSubjectSubmit}>
          <input 
            type="text" 
            placeholder="New Subject Name"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <button type="submit">Add Subject</button>
        </form>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Add Topic</h3>
        <form onSubmit={handleTopicSubmit}>
          <input 
            type="text" 
            placeholder="Topic Name"
            value={topicName} 
            onChange={(e) => setTopicName(e.target.value)} 
          />
          <select value={topicSubjectId} onChange={(e) => setTopicSubjectId(e.target.value)}>
            <option value="">Select subject</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
          <button type="submit">Add Topic</button>
        </form>
      </div>

      <h3 style={{ marginBottom: '1rem' }}>Your Subjects</h3>
      <div className="list-container">
        {subjects.map((subject) => (
          <div key={subject.id} className="card">
            <div className="list-item">
              <strong>{subject.name}</strong>
              <button className="btn-danger" onClick={() => deleteSubject(subject.id)}>Delete</button>
            </div>
            
            <ul className="nested-list">
              {topics
                .filter(topic => String(topic.subjectId) === String(subject.id))
                .map(topic => (
                  <li key={topic.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ color: 'var(--text)' }}>&#x2022; {topic.name}</strong>
                      <select 
                        value={topic.status || 'not-started'} 
                        onChange={(e) => updateTopic(topic.id, { status: e.target.value })}
                        style={{ padding: '0.25rem', fontSize: '0.8rem', minWidth: '120px' }}
                      >
                        <option value="not-started">Not Started</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <textarea 
                      placeholder="Topic notes..."
                      value={topic.notes || ''}
                      onChange={(e) => updateTopic(topic.id, { notes: e.target.value })}
                      style={{ 
                        padding: '0.5rem', 
                        borderRadius: 'var(--radius)', 
                        border: '1px solid var(--border)', 
                        width: '100%', 
                        minHeight: '60px', 
                        fontFamily: 'inherit',
                        fontSize: '0.9rem',
                        resize: 'vertical'
                      }}
                    />
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subjects;
