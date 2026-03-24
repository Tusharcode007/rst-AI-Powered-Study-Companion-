import React, { createContext, useState, useEffect } from 'react';

export const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem('subjects');
    return saved ? JSON.parse(saved) : [];
  });
  const [topics, setTopics] = useState(() => {
    const saved = localStorage.getItem('topics');
    return saved ? JSON.parse(saved) : [];
  });
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [revisions, setRevisions] = useState(() => {
    const saved = localStorage.getItem('revisions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => { localStorage.setItem('subjects', JSON.stringify(subjects)); }, [subjects]);
  useEffect(() => { localStorage.setItem('topics', JSON.stringify(topics)); }, [topics]);
  useEffect(() => { localStorage.setItem('tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('revisions', JSON.stringify(revisions)); }, [revisions]);

  const addSubject = (name) => {
    setSubjects([...subjects, { id: Date.now(), name }]);
  };

  const deleteSubject = (id) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  const addTopic = (name, subjectId) => {
    setTopics([...topics, { id: Date.now(), name, subjectId, status: 'not-started', notes: '' }]);
  };

  const updateTopic = (id, updates) => {
    setTopics(topics.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const addTask = (title, subjectId, topicId, deadline, priority) => {
    setTasks([...tasks, { id: Date.now(), title, subjectId, topicId, status: 'pending', deadline, priority }]);
  };

  const toggleTaskStatus = (id) => {
    // 1. Flip Task Status
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' } : task
    ));

    // 2. Automate Revision Schedule
    const task = tasks.find(t => t.id === id);
    if (task && task.status === 'pending') {
      const revisionDate = new Date();
      revisionDate.setDate(revisionDate.getDate() + 3);
      
      setRevisions(prev => {
        if (prev.some(r => r.taskId === id)) return prev;
        return [...prev, {
          id: Date.now(),
          taskId: id,
          date: revisionDate.toLocaleDateString('en-CA')
        }];
      });
    }
  };

  return (
    <StudyContext.Provider value={{ subjects, addSubject, deleteSubject, topics, addTopic, updateTopic, tasks, addTask, toggleTaskStatus, revisions }}>
      {children}
    </StudyContext.Provider>
  );
};
