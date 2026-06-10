import React, { useState, useContext } from 'react';
import { YouTubeContext } from '../context/YouTubeContext';
import VideoCard from '../components/VideoCard';
import { Clock } from 'lucide-react';

export default function WatchLater() {
  const { videos, watchLater } = useContext(YouTubeContext);
  const list = videos.filter(video => watchLater.includes(video.id));

  return (
    <div className="watch-later-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <Clock size={24} />
        <h2 style={{ fontSize: '22px' }}>Watch Later</h2>
      </div>

      {list.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
          <h3>No videos saved here yet</h3>
          <p style={{ marginTop: '8px' }}>Save videos to watch later while browsing or watching.</p>
        </div>
      ) : (
        <div className="videos-grid">
          {list.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
