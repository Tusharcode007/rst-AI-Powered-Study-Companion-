import React, { createContext, useState } from 'react';

export const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [tasks, setTasks] = useState([]);

  const addSubject = (name) => {
    setSubjects([...subjects, { id: Date.now(), name }]);
  };

  const deleteSubject = (id) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  const addTopic = (name, subjectId) => {
    setTopics([...topics, { id: Date.now(), name, subjectId }]);
  };

  const addTask = (title, subjectId, topicId) => {
    setTasks([...tasks, { id: Date.now(), title, subjectId, topicId }]);
  };

  return (
    <StudyContext.Provider value={{ subjects, addSubject, deleteSubject, topics, addTopic, tasks, addTask }}>
      {children}
    </StudyContext.Provider>
  );
};
