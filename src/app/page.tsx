'use client'

import { useState } from 'react';

export default function Main() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await  response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Video Summary Project</h1>
      <form onSubmit={handleSubmit}>
        <input 
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Summarize'}
        </button>
      </form>
      {summary && (
        <div>
          <h2>Summary</h2>
          <p>{summary}</p>
          </div>
      )}
    </div>
  );
}