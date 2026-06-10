import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { YouTubeContext } from '../context/YouTubeContext';
import VideoCard, { getChannelColor } from '../components/VideoCard';

export default function Channel() {
  const { channelName } = useParams();
  const decodedChannelName = decodeURIComponent(channelName);
  
  const { videos, subscriptions, toggleSubscription } = useContext(YouTubeContext);
  const [activeTab, setActiveTab] = useState('videos');

  // Filter videos belonging to this channel
  const channelVideos = videos.filter(v => v.channel === decodedChannelName);
  
  // Find channel metadata from first matching video
  const sampleVideo = channelVideos[0];
  const subscribersCount = sampleVideo ? sampleVideo.subscribers : "120K";

  // Check subscription state
  const isSubscribed = subscriptions.includes(decodedChannelName);

  const getSubscribersText = () => {
    if (isSubscribed) {
      if (subscribersCount.endsWith('M')) {
        return `${(parseFloat(subscribersCount) + 0.1).toFixed(1)}M`;
      } else if (subscribersCount.endsWith('K')) {
        return `${parseFloat(subscribersCount) + 1}K`;
      }
      return parseInt(subscribersCount) + 1;
    }
    return subscribersCount;
  };

  const avatarColor = getChannelColor(decodedChannelName);
  const initial = decodedChannelName.charAt(0).toUpperCase();

  return (
    <div className="channel-container">
      {/* Banner */}
      <div 
        className="channel-banner" 
        style={{ 
          background: `linear-gradient(135deg, ${avatarColor}, #272727)` 
        }} 
      />

      {/* Header Profile Details */}
      <div className="channel-header-info">
        <div className="channel-profile-details">
          <div className="channel-large-avatar" style={{ backgroundColor: avatarColor }}>
            {initial}
          </div>
          <div className="channel-title-sub">
            <h2>{decodedChannelName}</h2>
            <span className="channel-subs">@{decodedChannelName.toLowerCase().replace(/\s+/g, '')} • {getSubscribersText()} subscribers • {channelVideos.length} videos</span>
          </div>
        </div>

        <button 
          className={`subscribe-btn ${isSubscribed ? 'subscribed' : ''}`}
          onClick={() => toggleSubscription(decodedChannelName)}
        >
          {isSubscribed ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="channel-tabs">
        <button 
          className={`channel-tab ${activeTab === 'videos' ? 'active' : ''}`}
          onClick={() => setActiveTab('videos')}
        >
          Videos
        </button>
        <button 
          className={`channel-tab ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          About
        </button>
      </div>

      {/* Tab Contents */}
      <div className="channel-tab-content">
        {activeTab === 'videos' ? (
          channelVideos.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', padding: '24px 0' }}>This channel hasn't uploaded any videos yet.</p>
          ) : (
            <div className="videos-grid">
              {channelVideos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          )
        ) : (
          <div className="channel-about-tab">
            <h3>Description</h3>
            <p style={{ marginTop: '12px', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
              Welcome to the official YouTube channel of {decodedChannelName}.
              {"\n\n"}
              We are dedicated to providing the highest quality content related to programming, education, development, and tutorials. Don't forget to subscribe and hit the bell icon to stay updated with all our latest videos!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
