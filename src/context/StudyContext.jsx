import React, { createContext, useState } from 'react';

export const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);

  const addSubject = (name) => {
    setSubjects([...subjects, { id: Date.now(), name }]);
  };

  const deleteSubject = (id) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  return (
    <StudyContext.Provider value={{ subjects, addSubject, deleteSubject }}>
      {children}
    </StudyContext.Provider>
  );
};
