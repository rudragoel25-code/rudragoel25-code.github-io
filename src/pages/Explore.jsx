import React, { useContext } from 'react';
import { YouTubeContext } from '../context/YouTubeContext';
import VideoCard from '../components/VideoCard';
import { Flame, Music, Gamepad2, Trophy, Radio } from 'lucide-react';

const EXPLORE_ITEMS = [
  { name: 'Trending', icon: <Flame size={28} />, color: 'linear-gradient(135deg, #ff5f6d, #ffc371)' },
  { name: 'Music', icon: <Music size={28} />, color: 'linear-gradient(135deg, #11998e, #38ef7d)' },
  { name: 'Gaming', icon: <Gamepad2 size={28} />, color: 'linear-gradient(135deg, #7f00ff, #e100ff)' },
  { name: 'Sports', icon: <Trophy size={28} />, color: 'linear-gradient(135deg, #00c6ff, #0072ff)' },
  { name: 'Podcasts', icon: <Radio size={28} />, color: 'linear-gradient(135deg, #fc4a1a, #f7b733)' }
];

export default function Explore() {
  const { videos, setActiveCategory } = useContext(YouTubeContext);

  const handleExploreClick = (category) => {
    setActiveCategory(category === 'Trending' ? 'All' : category);
  };

  return (
    <div className="explore-container">
      <h2 style={{ marginBottom: '20px', fontSize: '22px' }}>Explore Categories</h2>
      
      {/* Category Gradient Grid */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', 
          gap: '16px', 
          marginBottom: '40px' 
        }}
      >
        {EXPLORE_ITEMS.map((item) => (
          <div 
            key={item.name}
            onClick={() => handleExploreClick(item.name)}
            style={{
              background: item.color,
              height: '100px',
              borderRadius: '12px',
              padding: '16px',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div>{item.icon}</div>
            <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{item.name}</span>
          </div>
        ))}
      </div>

      <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Popular Videos</h3>
      <div className="videos-grid">
        {videos.slice(0, 8).map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
