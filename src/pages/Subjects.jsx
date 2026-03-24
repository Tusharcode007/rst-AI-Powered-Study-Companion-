import React, { useState, useContext } from 'react';
import { StudyContext } from '../context/StudyContext';

function Subjects() {
  const [name, setName] = useState('');
  const { subjects, addSubject } = useContext(StudyContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addSubject(name);
    setName('');
  };

  return (
    <div>
      Subjects Page
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {subjects.map((subject) => (
          <li key={subject.id}>{subject.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Subjects;
