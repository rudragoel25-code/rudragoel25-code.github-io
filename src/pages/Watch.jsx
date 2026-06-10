import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share2, CornerDownRight, Trash2 } from 'lucide-react';
import { YouTubeContext } from '../context/YouTubeContext';
import { getChannelColor } from '../components/VideoCard';
import VideoThumbnail from '../components/VideoThumbnail';

export default function Watch() {
  const { id } = useParams();
  const {
    videos,
    subscriptions,
    likes,
    dislikes,
    comments,
    toggleSubscription,
    handleLike,
    handleDislike,
    addComment,
    deleteComment
  } = useContext(YouTubeContext);

  const [descExpanded, setDescExpanded] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Scroll to top when video ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const video = videos.find(v => v.id === id);

  if (!video) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Video Not Found</h2>
        <p style={{ marginTop: '12px' }}>This video does not exist or has been removed.</p>
        <Link to="/" style={{ display: 'inline-block', marginTop: '20px', color: '#065fd4', textDecoration: 'none', fontWeight: 'bold' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  // Derive like states
  const isLiked = !!likes[video.id];
  const isDisliked = !!dislikes[video.id];
  
  // Calculate mock likes: based on views, then adjusted by user input
  const baseLikes = Math.floor((video.views || 100000) * 0.05); // 5% of views
  const likesCount = baseLikes + (isLiked ? 1 : 0);

  // Check subscription state
  const isSubscribed = subscriptions.includes(video.channel);

  // Parse subscribers count
  const getSubscribersText = () => {
    if (!video.subscribers) return "100K";
    if (isSubscribed) {
      // If user subscribed, mock slightly higher subscribers
      if (video.subscribers.endsWith('M')) {
        const val = parseFloat(video.subscribers) + 0.1;
        return `${val.toFixed(1)}M`;
      } else if (video.subscribers.endsWith('K')) {
        const val = parseFloat(video.subscribers) + 1;
        return `${val}K`;
      }
      return parseInt(video.subscribers) + 1;
    }
    return video.subscribers;
  };

  // Get comments list for this video
  const videoComments = comments[video.id] || [];

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newCommentText.trim()) {
      addComment(video.id, newCommentText.trim());
      setNewCommentText('');
      setIsInputFocused(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Video link copied to clipboard! Share it with friends.");
  };

  // Get recommendations (all videos except the current one)
  const recommendations = videos.filter(v => v.id !== video.id);
  const avatarColor = getChannelColor(video.channel);
  const initial = video.channel ? video.channel.charAt(0).toUpperCase() : '?';

  return (
    <div className="watch-container">
      {/* LEFT COLUMN: Player, Info, Comments */}
      <div className="watch-main">
        <div className="player-wrapper">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        <h1 className="watch-title">{video.title}</h1>

        <div className="watch-actions-bar">
          <div className="channel-info">
            <Link to={`/channel/${encodeURIComponent(video.channel)}`} className="channel-avatar" style={{ backgroundColor: avatarColor, textDecoration: 'none', color: 'white' }}>
              {initial}
            </Link>
            <div className="channel-details">
              <Link to={`/channel/${encodeURIComponent(video.channel)}`} className="channel-name">
                {video.channel}
              </Link>
              <span className="channel-subs">{getSubscribersText()} subscribers</span>
            </div>
            <button
              className={`subscribe-btn ${isSubscribed ? 'subscribed' : ''}`}
              onClick={() => toggleSubscription(video.channel)}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>

          <div className="watch-actions">
            <div className="like-dislike-group">
              <button 
                className={`action-btn ${isLiked ? 'active' : ''}`} 
                onClick={() => handleLike(video.id)}
                title="I like this"
              >
                <ThumbsUp size={16} />
                <span>{likesCount.toLocaleString()}</span>
              </button>
              <button 
                className={`action-btn ${isDisliked ? 'active' : ''}`} 
                onClick={() => handleDislike(video.id)}
                title="I dislike this"
              >
                <ThumbsDown size={16} />
              </button>
            </div>

            <button className="action-btn share-btn" onClick={handleShare} title="Share link">
              <Share2 size={16} />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Description Box */}
        <div className="description-box" onClick={() => setDescExpanded(!descExpanded)}>
          <div className="description-meta">
            {video.viewsText || `${video.views.toLocaleString()} views`} • {video.publishedText}
          </div>
          <div className="description-text">
            {descExpanded ? video.description : `${video.description.slice(0, 150)}${video.description.length > 150 ? '...' : ''}`}
          </div>
          {video.description.length > 150 && (
            <button className="description-toggle">
              {descExpanded ? 'Show less' : '...more'}
            </button>
          )}
        </div>

        {/* Comments Section */}
        <div className="comments-section">
          <h3 className="comments-header">{videoComments.length} Comments</h3>
          
          <div className="comment-input-wrap">
            <div className="channel-avatar" style={{ backgroundColor: '#0088cc' }}>
              R
            </div>
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
              />
              {isInputFocused && (
                <div className="comment-form-actions">
                  <button 
                    type="button" 
                    className="comment-btn cancel" 
                    onClick={() => {
                      setNewCommentText('');
                      setIsInputFocused(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="comment-btn submit" 
                    disabled={!newCommentText.trim()}
                  >
                    Comment
                  </button>
                </div>
              )}
            </form>
          </div>

          <div className="comments-list">
            {videoComments.map(comment => {
              const commentAvatarColor = getChannelColor(comment.username);
              const commentInitial = comment.username.charAt(0).toUpperCase();
              return (
                <div key={comment.id} className="comment-item">
                  <div className="channel-avatar" style={{ backgroundColor: comment.username === 'You' ? '#0088cc' : commentAvatarColor }}>
                    {commentInitial}
                  </div>
                  <div className="comment-content">
                    <div className="comment-user-meta">
                      <span className="comment-username">{comment.username}</span>
                      <span className="comment-time">{comment.time}</span>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                    <div className="comment-actions">
                      <button className="comment-action-btn">
                        <ThumbsUp size={12} />
                        <span>{comment.likes || 0}</span>
                      </button>
                      <button className="comment-action-btn">
                        <ThumbsDown size={12} />
                      </button>
                      
                      {comment.username === "You" && (
                        <button 
                          className="comment-action-btn comment-delete-btn" 
                          onClick={() => deleteComment(video.id, comment.id)}
                          title="Delete comment"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Sidebar recommendations */}
      <div className="watch-sidebar">
        <h4 style={{ marginBottom: '12px' }}>Up next</h4>
        {recommendations.map(rec => {
          const recAvatarColor = getChannelColor(rec.channel);
          return (
            <Link key={rec.id} to={`/watch/${rec.id}`} className="recommended-card">
              <div className="recommended-thumbnail">
                <VideoThumbnail 
                  videoId={rec.id} 
                  title={rec.title} 
                  fallbackColor={recAvatarColor} 
                />
              </div>
              <div className="recommended-info">
                <h5 className="recommended-title" title={rec.title}>
                  {rec.title}
                </h5>
                <span className="recommended-channel" title={rec.channel}>
                  {rec.channel}
                </span>
                <span className="recommended-meta">
                  {rec.viewsText || `${(rec.views / 1e6).toFixed(1)}M views`} • {rec.publishedText}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
