import React, { useState, useContext } from 'react';
import { StudyContext } from '../context/StudyContext';

function Tasks() {
  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [topicId, setTopicId] = useState('');
  const [filter, setFilter] = useState('All');
  
  const { subjects, topics, addTask, tasks, toggleTaskStatus } = useContext(StudyContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(title, subjectId, topicId);
    setTitle('');
    setSubjectId('');
    setTopicId('');
  };

  return (
    <div>
      <h2>Tasks Page</h2>
      <form onSubmit={handleSubmit}>
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

      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Pending">pending</option>
        <option value="Completed">completed</option>
      </select>

      <ul>
        {tasks
          .filter(task => {
            if (filter === 'All') return true;
            return task.status.toLowerCase() === filter.toLowerCase();
          })
          .map(task => {
            const subject = subjects.find(s => String(s.id) === String(task.subjectId));
            const topic = topics.find(t => String(t.id) === String(task.topicId));
            return (
              <li key={task.id}>
                {task.title} - Status: {task.status} - {subject ? subject.name : 'Unknown Subject'} - {topic ? topic.name : 'Unknown Topic'}
                <button onClick={() => toggleTaskStatus(task.id)}>
                  {task.status === 'pending' ? 'Mark Completed' : 'Mark Pending'}
                </button>
              </li>
            );
        })}
      </ul>
    </div>
  );
}

export default Tasks;
