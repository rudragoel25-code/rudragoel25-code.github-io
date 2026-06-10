import React, { useContext } from 'react';
import { YouTubeContext } from '../context/YouTubeContext';
import VideoCard from '../components/VideoCard';
import { ThumbsUp } from 'lucide-react';

export default function LikedVideos() {
  const { videos, likes } = useContext(YouTubeContext);

  // Filter videos that the user liked
  const likedVideosList = videos.filter(video => !!likes[video.id]);

  return (
    <div className="liked-videos-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <ThumbsUp size={24} />
        <h2 style={{ fontSize: '22px' }}>Liked Videos</h2>
      </div>

      {likedVideosList.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
          <h3>No liked videos yet</h3>
          <p style={{ marginTop: '8px' }}>Videos you like will be added to this playlist for quick access!</p>
        </div>
      ) : (
        <div className="videos-grid">
          {likedVideosList.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
