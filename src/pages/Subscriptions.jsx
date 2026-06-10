import React, { useContext } from 'react';
import { YouTubeContext } from '../context/YouTubeContext';
import VideoCard from '../components/VideoCard';
import { Link } from 'react-router-dom';

export default function Subscriptions() {
  const { videos, subscriptions } = useContext(YouTubeContext);

  // Filter videos from subscribed channels
  const subscriptionVideos = videos.filter(video => 
    subscriptions.includes(video.channel)
  );

  return (
    <div className="subscriptions-container">
      <h2 style={{ marginBottom: '24px', fontSize: '22px' }}>Latest from your subscriptions</h2>

      {subscriptionVideos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
          <h3>Your subscriptions feed is empty</h3>
          <p style={{ marginTop: '8px' }}>Subscribe to creators on their watch pages or channel profiles to see their latest videos here!</p>
          <div style={{ marginTop: '24px' }}>
            <Link to="/" style={{ padding: '10px 20px', background: '#065fd4', color: 'white', textDecoration: 'none', borderRadius: '20px', fontWeight: 'bold' }}>
              Explore Videos
            </Link>
          </div>
        </div>
      ) : (
        <div className="videos-grid">
          {subscriptionVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
