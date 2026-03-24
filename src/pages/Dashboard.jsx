import React, { useContext } from 'react';
import { StudyContext } from '../context/StudyContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

function Dashboard() {
  const { tasks, subjects } = useContext(StudyContext);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  const subjectChartData = subjects.map(subject => {
    const count = tasks.filter(task => String(task.subjectId) === String(subject.id)).length;
    return { name: subject.name, tasks: count };
  });

  const pieData = [
    { name: "Completed", value: completedTasks },
    { name: "Pending", value: pendingTasks }
  ];
  
  const COLORS = ['#82ca9d', '#ffc658'];

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Dashboard Analytics</h2>
      
      <div className="stats-grid">
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.2rem' }}>{totalTasks}</h3>
          <p style={{ margin: 0 }}>Total Tasks</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.2rem' }}>{completedTasks}</h3>
          <p style={{ margin: 0 }}>Completed Tasks</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.2rem' }}>{pendingTasks}</h3>
          <p style={{ margin: 0 }}>Pending Tasks</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.2rem' }}>{completionPercentage}%</h3>
          <p style={{ margin: 0 }}>Completion</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        <div className="card" style={{ flex: 1, minWidth: '400px' }}>
          <h3>Subject-wise Task Count</h3>
          <BarChart width={400} height={300} data={subjectChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tasks" fill="#8884d8" />
          </BarChart>
        </div>

        <div className="card" style={{ flex: 1, minWidth: '400px' }}>
          <h3>Completion Status</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#82ca9d"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
