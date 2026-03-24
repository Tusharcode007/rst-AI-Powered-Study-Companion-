import React, { useState, useContext } from 'react';
import { StudyContext } from '../context/StudyContext';

function Tasks() {
  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [topicId, setTopicId] = useState('');
  
  const { subjects, topics, addTask, tasks } = useContext(StudyContext);

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

      <ul>
        {tasks.map(task => {
          const subject = subjects.find(s => String(s.id) === String(task.subjectId));
          const topic = topics.find(t => String(t.id) === String(task.topicId));
          return (
            <li key={task.id}>
              {task.title} - {subject ? subject.name : 'Unknown Subject'} - {topic ? topic.name : 'Unknown Topic'}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Tasks;
