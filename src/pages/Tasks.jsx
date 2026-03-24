import React, { useState, useContext } from 'react';
import { StudyContext } from '../context/StudyContext';

function Tasks() {
  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [topicId, setTopicId] = useState('');
  
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('A-Z');
  
  const { subjects, topics, addTask, tasks, toggleTaskStatus } = useContext(StudyContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(title) { addTask(title, subjectId, topicId); setTitle(''); setSubjectId(''); setTopicId(''); }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Tasks Page</h2>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Add Task</h3>
        <form onSubmit={handleSubmit} style={{ margin: 0 }}>
          <input 
            type="text" 
            placeholder="Task title"
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
            <option value="">Select subject</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
          <select value={topicId} onChange={(e) => setTopicId(e.target.value)}>
            <option value="">Select topic</option>
            {topics.map(topic => (
              <option key={topic.id} value={topic.id}>{topic.name}</option>
            ))}
          </select>
          <button type="submit">Add Task</button>
        </form>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Filter & Sort</h3>
        <form style={{ margin: 0 }}>
          <input 
            type="text" 
            placeholder="Search by title..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
            <option value="All">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="A-Z">Title (A-Z)</option>
            <option value="Z-A">Title (Z-A)</option>
          </select>
        </form>
      </div>

      <div className="list-container">
        {tasks
          .filter(task => {
            if (filter !== 'All' && task.status.toLowerCase() !== filter.toLowerCase()) return false;
            if (subjectFilter !== 'All' && String(task.subjectId) !== String(subjectFilter)) return false;
            if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
          })
          .sort((a, b) => {
            if (sortOrder === 'A-Z') return a.title.localeCompare(b.title);
            return b.title.localeCompare(a.title);
          })
          .map(task => {
            const subject = subjects.find(s => String(s.id) === String(task.subjectId));
            const topic = topics.find(t => String(t.id) === String(task.topicId));
            return (
              <div key={task.id} className="card list-item">
                <div>
                  <strong style={{ fontSize: '1.05rem' }}>{task.title}</strong>
                  <span style={{ 
                    marginLeft: '10px', 
                    padding: '2px 8px', 
                    borderRadius: '12px', 
                    fontSize: '0.75rem',
                    backgroundColor: task.status === 'completed' ? '#10b981' : '#e5e7eb',
                    color: task.status === 'completed' ? 'white' : '#374151',
                    textTransform: 'uppercase',
                    fontWeight: 'bold'
                  }}>
                    {task.status}
                  </span>
                  <p style={{ marginTop: '0.25rem', marginBottom: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {subject ? subject.name : 'Unknown Subject'} &bull; {topic ? topic.name : 'Unknown Topic'}
                  </p>
                </div>
                <button 
                  style={{ backgroundColor: task.status === 'pending' ? 'var(--primary)' : 'var(--border)', color: task.status === 'pending' ? 'white' : '#374151' }}
                  onClick={() => toggleTaskStatus(task.id)}
                >
                  {task.status === 'pending' ? 'Mark Completed' : 'Mark Pending'}
                </button>
              </div>
            );
        })}
      </div>
    </div>
  );
}

export default Tasks;
