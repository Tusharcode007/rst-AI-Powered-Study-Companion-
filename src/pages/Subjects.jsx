import React, { useState, useContext } from 'react';
import { StudyContext } from '../context/StudyContext';

function Subjects() {
  const [name, setName] = useState('');
  const [topicName, setTopicName] = useState('');
  const [topicSubjectId, setTopicSubjectId] = useState('');
  const { subjects, topics, addSubject, deleteSubject, addTopic } = useContext(StudyContext);

  const handleSubjectSubmit = (e) => {
    e.preventDefault();
    addSubject(name);
    setName('');
  };

  const handleTopicSubmit = (e) => {
    e.preventDefault();
    addTopic(topicName, topicSubjectId);
    setTopicName('');
    setTopicSubjectId('');
  };

  return (
    <div>
      Subjects Page
      <form onSubmit={handleSubjectSubmit}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <button type="submit">Add Subject</button>
      </form>
      <ul>
        {subjects.map((subject) => (
          <li key={subject.id}>
            {subject.name}
            <button onClick={() => deleteSubject(subject.id)}>Delete</button>
            <ul>
              {topics
                .filter(topic => String(topic.subjectId) === String(subject.id))
                .map(topic => (
                  <li key={topic.id}>{topic.name}</li>
                ))}
            </ul>
          </li>
        ))}
      </ul>

      <form onSubmit={handleTopicSubmit}>
        <input 
          type="text" 
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
  );
}

export default Subjects;
