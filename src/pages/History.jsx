import React, { useState, useContext } from 'react';
import { YouTubeContext } from '../context/YouTubeContext';
import VideoCard from '../components/VideoCard';
import { History as HistoryIcon, Trash2 } from 'lucide-react';

export default function History() {
  const { videos } = useContext(YouTubeContext);
  // Default history state prepopulated with 3 items for demonstration
  const [historyList, setHistoryList] = useState(() => videos.slice(0, 3));

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear your watch history?")) {
      setHistoryList([]);
    }
  };

  return (
    <div className="history-container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <HistoryIcon size={24} />
          <h2 style={{ fontSize: '22px' }}>Watch History</h2>
        </div>
        {historyList.length > 0 && (
          <button 
            onClick={handleClear}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '8px 16px', 
              borderRadius: '20px', 
              border: '1px solid var(--border-color)', 
              background: 'transparent',
              color: 'var(--text-color)',
              cursor: 'pointer',
              fontSize: '14px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--hover-color)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <Trash2 size={16} />
            Clear Watch History
          </button>
        )}
      </div>

      {historyList.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
          <h3>Your watch history is clear</h3>
          <p style={{ marginTop: '8px' }}>Videos you watch will be listed here.</p>
        </div>
      ) : (
        <div className="videos-grid">
          {historyList.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
