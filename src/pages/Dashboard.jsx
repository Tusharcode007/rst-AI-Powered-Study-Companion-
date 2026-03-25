import React, { useContext } from 'react';
import { StudyContext } from '../context/StudyContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Sigma, CheckSquare, Clock, TrendingUp } from 'lucide-react';

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
  
  const COLORS = ['#34d399', '#60a5fa'];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4 } }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Telemetry & Analytics</h2>
      
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="stats-grid">
        <motion.div variants={itemVariants} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
            <Sigma size={28} color="var(--primary)" />
          </div>
          <h3 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '0.2rem', fontWeight: '700' }}>{totalTasks}</h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontWeight: '500' }}>Global Operations</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
            <CheckSquare size={28} color="#34d399" />
          </div>
          <h3 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '0.2rem', fontWeight: '700' }}>{completedTasks}</h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontWeight: '500' }}>Operations Completed</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
            <Clock size={28} color="#fbbf24" />
          </div>
          <h3 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '0.2rem', fontWeight: '700' }}>{pendingTasks}</h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontWeight: '500' }}>Items in Queue</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
          <div style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
            <TrendingUp size={28} color="#a78bfa" />
          </div>
          <h3 style={{ fontSize: '2.5rem', color: '#a78bfa', marginBottom: '0.2rem', fontWeight: '700' }}>{completionPercentage}%</h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontWeight: '500' }}>Matrix Completion</p>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}
      >
        <div className="card" style={{ flex: 1.5, minWidth: '400px', height: '400px' }}>
          <h3 style={{ marginBottom: '2rem' }}>Subject Density Distribution</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={subjectChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} />
              <YAxis stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} />
              <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }} />
              <Bar dataKey="tasks" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ flex: 1, minWidth: '350px', height: '400px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1rem' }}>Burn-down Ratio</h3>
          <div style={{ flex: 1, position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;
