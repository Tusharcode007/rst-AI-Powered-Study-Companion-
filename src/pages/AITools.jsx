import React, { useState, useContext } from 'react';
import { aiService } from '../services/aiService';
import { StudyContext } from '../context/StudyContext';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, BookOpen, Layers } from 'lucide-react';

function AITools() {
  const { subjects } = useContext(StudyContext);
  const [topic, setTopic] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [activeMode, setActiveMode] = useState('summary');
  
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a valid study topic first.');
      return;
    }

    setLoading(true);
    setError('');
    // Clear previous result
    setResponse(null);

    const subjectName = subjectId ? subjects.find(s => String(s.id) === String(subjectId))?.name : '';

    try {
      let res;
      if (activeMode === 'summary') {
        res = await aiService.generateSummary(subjectName, topic);
      } else if (activeMode === 'questions') {
        res = await aiService.generateQuestions(subjectName, topic);
      } else if (activeMode === 'flashcards') {
        res = await aiService.generateFlashcards(subjectName, topic);
      }
      setResponse(res);
    } catch (err) {
      setError(err || 'Failed to generate AI response. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    if (response.type === 'summary') {
      return (
        <div>
          <h4 style={{ color: 'var(--text-secondary)' }}>Definition</h4>
          <p style={{ marginBottom: '1.5rem', fontWeight: '500' }}>{response.definition}</p>
          
          <h4 style={{ color: 'var(--text-secondary)' }}>Key Points</h4>
          <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', marginBottom: '1.5rem' }}>
            {response.keyPoints.map((pt, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{pt}</li>)}
          </ul>
          
          <h4 style={{ color: 'var(--text-secondary)' }}>Example Scenario</h4>
          <p style={{ fontStyle: 'italic', padding: '1rem', backgroundColor: 'var(--bg)', borderLeft: '3px solid var(--primary)' }}>
            "{response.example}"
          </p>
        </div>
      );
    }

    if (response.type === 'questions') {
      return (
        <ol style={{ paddingLeft: '1.5rem' }}>
          {response.questions.map((q) => (
            <li key={q.id} style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <strong>{q.text}</strong>
                <span style={{ 
                  fontSize: '0.75rem', 
                  padding: '4px 10px', 
                  borderRadius: '12px',
                  backgroundColor: q.difficulty === 'Hard' ? 'var(--danger)' : q.difficulty === 'Medium' ? '#f59e0b' : '#10b981',
                  color: 'white',
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap'
                }}>
                  {q.difficulty}
                </span>
              </div>
            </li>
          ))}
        </ol>
      );
    }

    if (response.type === 'flashcards') {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {response.cards.map(card => (
            <div key={card.id} style={{
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '1.5rem',
              backgroundColor: 'var(--surface)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--primary)', borderBottom: '1px dashed var(--border)', paddingBottom: '0.5rem' }}>
                Q: {card.front}
              </h4>
              <p style={{ color: 'var(--text)', flex: 1 }}>
                <strong>A:</strong> {card.back}
              </p>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <BrainCircuit size={32} color="var(--primary)" /> AI Multi-Mode Assistant
      </h2>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers size={20} color="var(--primary)" /> Configure Generation Node
        </h3>
        
        {/* Step 5: Input Enhancement */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)} style={{ flex: 1 }}>
            <option value="">No General Subject</option>
            {subjects.map(sub => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </select>
          <input 
            type="text" 
            placeholder="Focus topic (Required)..." 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={{ flex: 2, minWidth: '250px' }}
          />
        </div>

        {/* Step 1: Modes Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {['summary', 'questions', 'flashcards'].map(mode => (
            <button 
              key={mode}
              type="button"
              onClick={() => setActiveMode(mode)}
              style={{
                backgroundColor: activeMode === mode ? 'var(--primary)' : 'var(--surface)',
                color: activeMode === mode ? 'white' : 'var(--text)',
                border: '1px solid var(--border)',
                flex: 1,
                minWidth: '120px',
                textTransform: 'capitalize'
              }}
            >
              {mode}
            </button>
          ))}
        </div>
        
        <button 
          disabled={loading} 
          onClick={handleGenerate}
          style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Processing with AI...' : 'Generate Material'}
        </button>

        {error && <p style={{ color: 'var(--danger)', marginTop: '1rem', fontWeight: '500', textAlign: 'center' }}>{error}</p>}
      </div>

      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><BrainCircuit size={24} className="spin" /> Analyzing structure...</h3>
            <p>Generating contextual {activeMode} architecture for your coursework.</p>
          </motion.div>
        )}

        {/* Structured UI Rendering */}
        {response && !loading && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card">
            <h3 style={{ color: '#fff', marginBottom: '1.5rem', textTransform: 'capitalize', paddingBottom: '1rem', borderBottom: '1px dashed var(--border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <BookOpen size={20} color="var(--primary)" /> Evaluated {response.type} Results
            </h3>
            <div style={{ lineHeight: '1.6' }}>
              {renderResponse()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AITools;
