import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, X } from 'lucide-react';
import { YouTubeContext } from '../context/YouTubeContext';
import VideoCard from '../components/VideoCard';

const CATEGORIES = [
  "All", 
  "IPL", 
  "Gaming", 
  "Music", 
  "Podcasts", 
  "C++", 
  "DSA", 
  "Web Dev", 
  "Artificial Intelligence", 
  "Machine Learning", 
  "Cyber Security"
];

export default function Home() {
  const { videos, shorts, activeCategory, setActiveCategory } = useContext(YouTubeContext);
  const [shortsDismissed, setShortsDismissed] = useState(false);

  // Filter videos based on selected category chip
  const filteredVideos = activeCategory === "All"
    ? videos
    : videos.filter(video => video.category === activeCategory);

  const showShortsShelf = activeCategory === "All" && !shortsDismissed && shorts.length > 0;

  return (
    <div className="home-container">
      {/* Scrollable Categories / Chips Bar */}
      <nav className="categories-bar">
        {CATEGORIES.map(category => (
          <button
            key={category}
            className={`chip-item ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
          <h3>No videos found in this category</h3>
          <p style={{ marginTop: '8px' }}>Be the first to upload a video here by clicking the Create button above!</p>
        </div>
      )}

      {/* Videos Grid with Shorts Shelf in between */}
      {filteredVideos.length > 0 && (
        <>
          {/* Section 1: First 8 videos */}
          <div className="videos-grid">
            {filteredVideos.slice(0, showShortsShelf ? 8 : filteredVideos.length).map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          {/* YouTube Shorts Shelf */}
          {showShortsShelf && (
            <div className="home-shorts-shelf">
              <div className="shorts-shelf-header">
                <div className="shorts-shelf-title">
                  <Zap size={22} className="shorts-red-icon" style={{ color: '#ff0000', fill: '#ff0000' }} />
                  <span>Shorts</span>
                </div>
                <button 
                  className="shorts-dismiss-btn" 
                  onClick={() => setShortsDismissed(true)}
                  title="Dismiss Shorts shelf"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="shorts-shelf-grid">
                {shorts.map(short => (
                  <Link key={short.id} to={`/shorts?id=${short.id}`} className="shorts-shelf-card">
                    <div className="shorts-shelf-thumbnail">
                      <img
                        src={`https://img.youtube.com/vi/${short.id}/0.jpg`}
                        alt={short.title}
                        loading="lazy"
                      />
                      <div className="shorts-shelf-play">
                        <Zap size={20} style={{ color: 'white', fill: 'white' }} />
                      </div>
                    </div>
                    <div className="shorts-shelf-info">
                      <h4 className="shorts-shelf-card-title">{short.title}</h4>
                      <span className="shorts-shelf-views">
                        {Math.floor(short.likes * 0.12).toLocaleString()} views
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Remaining videos */}
          {showShortsShelf && filteredVideos.length > 8 && (
            <div className="videos-grid" style={{ marginTop: '32px' }}>
              {filteredVideos.slice(8).map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
