import React, { useContext } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { YouTubeContext } from '../context/YouTubeContext';
import { getChannelColor } from '../components/VideoCard';
import VideoThumbnail from '../components/VideoThumbnail';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { videos } = useContext(YouTubeContext);

  // Perform case-insensitive search on title, channel name, and description
  let searchResults = videos.filter(video => {
    const q = query.toLowerCase();
    return (
      video.title.toLowerCase().includes(q) ||
      video.channel.toLowerCase().includes(q) ||
      video.description.toLowerCase().includes(q)
    );
  });

  // Ensure at least 10 results by padding with other videos if necessary
  if (searchResults.length > 0 && searchResults.length < 10) {
    const remaining = videos.filter(v => !searchResults.find(r => r.id === v.id));
    const needed = 10 - searchResults.length;
    searchResults = [...searchResults, ...remaining.slice(0, needed)];
  }

  return (
    <div className="search-results-container">
      <h3 style={{ margin: '8px 0 16px 8px', fontWeight: 'normal', color: 'var(--text-secondary)' }}>
        Search results for: <strong>"{query}"</strong>
      </h3>

      {searchResults.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-secondary)' }}>
          <h2>No results found</h2>
          <p style={{ marginTop: '12px' }}>Try search terms like "HTML", "CSS", "React", "Python", or "IPL".</p>
        </div>
      ) : (
        searchResults.map(video => {
          const avatarColor = getChannelColor(video.channel);
          const initial = video.channel ? video.channel.charAt(0).toUpperCase() : '?';

          return (
            <Link key={video.id} to={`/watch/${video.id}`} className="search-card">
              <div className="search-thumbnail">
                <VideoThumbnail 
                  videoId={video.id} 
                  title={video.title} 
                  fallbackColor={avatarColor} 
                />
              </div>
              <div className="search-info">
                <h4 className="search-title">{video.title}</h4>
                <div className="search-meta">
                  {video.viewsText || `${(video.views / 1e6).toFixed(1)}M views`} • {video.publishedText}
                </div>
                
                <div className="search-channel-row">
                  <div className="search-channel-avatar" style={{ backgroundColor: avatarColor }}>
                    {initial}
                  </div>
                  <span className="search-channel-name">{video.channel}</span>
                </div>

                <p className="search-description">{video.description}</p>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}
