import React, { useState } from 'react';
import { aiService } from '../services/aiService';

function AITools() {
  const [topic, setTopic] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAction = async (actionType) => {
    if (!topic.trim()) {
      setError('Please enter a valid study topic first.');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');

    try {
      let res = '';
      if (actionType === 'summary') {
        res = await aiService.generateSummary(topic);
      } else if (actionType === 'questions') {
        res = await aiService.generateQuestions(topic);
      }
      setResponse(res);
    } catch (err) {
      setError(err || 'Failed to generate AI response. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>AI Study Assistant</h2>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Generate Study Material</h3>
        <p style={{ marginBottom: '1rem' }}>Enter a topic you want to master, and our AI will build materials for you instantly.</p>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="E.g., Quantum Physics, Cellular Biology..." 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={{ flex: 1, minWidth: '250px' }}
          />
          <button 
            disabled={loading} 
            onClick={() => handleAction('summary')}
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Processing...' : 'Summary'}
          </button>
          <button 
            disabled={loading} 
            onClick={() => handleAction('questions')}
            style={{ backgroundColor: 'var(--primary-hover)', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Processing...' : 'Questions'}
          </button>
        </div>
        
        {error && <p style={{ color: 'var(--danger)', marginTop: '1rem', fontWeight: '500' }}>{error}</p>}
      </div>

      {response && (
        <div className="card" style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
          <h3 style={{ color: 'var(--primary)' }}>AI Generated Output</h3>
          <div style={{ 
            backgroundColor: 'var(--bg)', 
            padding: '1.5rem', 
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            whiteSpace: 'pre-wrap',
            lineHeight: '1.8',
            marginTop: '1rem'
          }}>
            {response}
          </div>
        </div>
      )}
    </div>
  );
}

export default AITools;
