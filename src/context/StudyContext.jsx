import React, { createContext, useState } from 'react';

export const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);

  const addSubject = (name) => {
    setSubjects([...subjects, { id: Date.now(), name }]);
  };

  return (
    <StudyContext.Provider value={{ subjects, addSubject }}>
      {children}
    </StudyContext.Provider>
  );
};
