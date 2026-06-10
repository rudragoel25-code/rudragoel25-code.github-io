import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, ThumbsUp } from 'lucide-react';
import { YouTubeContext } from '../context/YouTubeContext';

import VideoThumbnail from './VideoThumbnail';

// Utility to generate a consistent color for channel avatars
export const getChannelColor = (channelName) => {
  let hash = 0;
  for (let i = 0; i < channelName.length; i++) {
    hash = channelName.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Hue-based generation for aesthetic pastel/harmonious colors
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 65%, 45%)`;
};

export default function VideoCard({ video }) {
  const navigate = useNavigate();
  const { likes, handleLike, watchLater, toggleWatchLater } = useContext(YouTubeContext);

  const isLiked = !!likes[video.id];
  const isWatchLater = watchLater.includes(video.id);

  const avatarColor = getChannelColor(video.channel);
  const initial = video.channel ? video.channel.charAt(0).toUpperCase() : '?';

  const handleChannelClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/channel/${encodeURIComponent(video.channel)}`);
  };

  const handleWatchLaterToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWatchLater(video.id);
  };

  const handleLikeToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleLike(video.id);
  };

  return (
    <Link to={`/watch/${video.id}`} className="video-card">
      <div className="thumbnail-container">
        <VideoThumbnail 
          videoId={video.id} 
          title={video.title} 
          fallbackColor={avatarColor} 
        />
        
        {/* Overlay hover actions */}
        <div className="thumbnail-hover-actions">
          <button 
            className={`hover-action-btn ${isWatchLater ? 'active' : ''}`}
            onClick={handleWatchLaterToggle}
            title={isWatchLater ? "Remove from Watch Later" : "Watch Later"}
          >
            <Clock size={16} />
          </button>
          <button 
            className={`hover-action-btn ${isLiked ? 'active' : ''}`}
            onClick={handleLikeToggle}
            title={isLiked ? "Unlike" : "Like"}
          >
            <ThumbsUp size={16} />
          </button>
        </div>
      </div>
      <div className="card-details">
        <div 
          className="channel-avatar" 
          style={{ backgroundColor: avatarColor }}
          onClick={handleChannelClick}
          title={video.channel}
        >
          {initial}
        </div>
        <div className="card-text">
          <h4 className="card-title" title={video.title}>
            {video.title}
          </h4>
          <span className="card-channel" onClick={handleChannelClick} title={video.channel}>
            {video.channel}
          </span>
          <span className="card-metadata">
            {video.viewsText || `${(video.views / 1e6).toFixed(1)}M views`} • {video.publishedText}
          </span>
        </div>
      </div>
    </Link>
  );
}
