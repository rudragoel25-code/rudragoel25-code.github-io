import React, { useState, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { YouTubeContext } from '../context/YouTubeContext';
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, ChevronUp, ChevronDown, Send, X } from 'lucide-react';
import { getChannelColor } from '../components/VideoCard';

export default function Shorts() {
  const { 
    shorts, 
    shortComments, 
    subscriptions, 
    toggleSubscription,
    addShortComment,
    deleteShortComment
  } = useContext(YouTubeContext);

  const [searchParams] = useSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [likedShorts, setLikedShorts] = useState({});
  const [dislikedShorts, setDislikedShorts] = useState({});
  const [newCommentText, setNewCommentText] = useState('');

  // Sync index from URL parameters
  useEffect(() => {
    const idParam = searchParams.get('id');
    if (idParam) {
      const idx = shorts.findIndex(s => s.id === idParam);
      if (idx !== -1) {
        setCurrentIndex(idx);
      }
    }
  }, [searchParams, shorts]);

  // Handle keypresses (ArrowUp, ArrowDown) to cycle shorts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        handleNext();
      } else if (e.key === 'ArrowUp') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, shorts.length]);

  if (!shorts || shorts.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--text-secondary)' }}>
        <h2>No shorts available</h2>
      </div>
    );
  }

  const currentShort = shorts[currentIndex];
  const isLiked = !!likedShorts[currentShort.id];
  const isDisliked = !!dislikedShorts[currentShort.id];
  const isSubscribed = subscriptions.includes(currentShort.channel);

  const handleNext = () => {
    if (currentIndex < shorts.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Loop back to start
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      // Loop to end
      setCurrentIndex(shorts.length - 1);
    }
  };

  const handleLike = () => {
    setLikedShorts(prev => {
      const copy = { ...prev };
      if (copy[currentShort.id]) {
        delete copy[currentShort.id];
      } else {
        copy[currentShort.id] = true;
      }
      return copy;
    });
    setDislikedShorts(prev => {
      const copy = { ...prev };
      delete copy[currentShort.id];
      return copy;
    });
  };

  const handleDislike = () => {
    setDislikedShorts(prev => {
      const copy = { ...prev };
      if (copy[currentShort.id]) {
        delete copy[currentShort.id];
      } else {
        copy[currentShort.id] = true;
      }
      return copy;
    });
    setLikedShorts(prev => {
      const copy = { ...prev };
      delete copy[currentShort.id];
      return copy;
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/#/shorts`);
    alert("Shorts feed link copied to clipboard!");
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newCommentText.trim()) {
      addShortComment(currentShort.id, newCommentText.trim());
      setNewCommentText('');
    }
  };

  const currentShortComments = shortComments[currentShort.id] || [];
  const avatarColor = getChannelColor(currentShort.channel);
  const initial = currentShort.channel.charAt(0).toUpperCase();

  // Adjust display likes
  const displayLikes = currentShort.likes + (isLiked ? 1 : 0);

  return (
    <div className="shorts-page-container">
      <div className="shorts-layout-wrapper">
        {/* Navigation Up */}
        <button 
          className="short-action-circle" 
          onClick={handlePrev}
          style={{ position: 'absolute', top: '-60px', left: '136px', zIndex: 10, display: 'flex' }}
          title="Previous Short"
        >
          <ChevronUp size={22} />
        </button>

        {/* 9:16 Vertical Video Frame */}
        <div className="short-video-container">
          <iframe
            src={`https://www.youtube.com/embed/${currentShort.id}?autoplay=1&mute=1&loop=1&playlist=${currentShort.id}&controls=0`}
            title={currentShort.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>

          {/* Info Details Overlay */}
          <div className="short-info-overlay">
            <div className="short-channel-row">
              <div className="short-channel-avatar" style={{ backgroundColor: avatarColor }}>
                {initial}
              </div>
              <span className="short-channel-name">@{currentShort.channel.replace(/\s+/g, '')}</span>
              <button 
                className={`short-subscribe ${isSubscribed ? 'subscribed' : ''}`}
                onClick={() => toggleSubscription(currentShort.channel)}
              >
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>
            <p className="short-caption">{currentShort.description}</p>
          </div>
        </div>

        {/* Right Stack Action Controls */}
        <div className="short-actions-sidebar">
          <div className="short-action-item">
            <button 
              className={`short-action-circle ${isLiked ? 'active' : ''}`}
              onClick={handleLike}
              title="Like"
            >
              <ThumbsUp size={20} />
            </button>
            <span className="short-action-label">{(displayLikes / 1000).toFixed(0)}K</span>
          </div>

          <div className="short-action-item">
            <button 
              className={`short-action-circle ${isDisliked ? 'active' : ''}`}
              onClick={handleDislike}
              title="Dislike"
            >
              <ThumbsDown size={20} />
            </button>
            <span className="short-action-label">Dislike</span>
          </div>

          <div className="short-action-item">
            <button 
              className={`short-action-circle ${commentsOpen ? 'active' : ''}`}
              onClick={() => setCommentsOpen(!commentsOpen)}
              title="Comments"
            >
              <MessageSquare size={20} />
            </button>
            <span className="short-action-label">{currentShortComments.length}</span>
          </div>

          <div className="short-action-item">
            <button 
              className="short-action-circle"
              onClick={handleShare}
              title="Share"
            >
              <Share2 size={20} />
            </button>
            <span className="short-action-label">Share</span>
          </div>
        </div>

        {/* Snap-on comments panel next to player on desktop */}
        {commentsOpen && (
          <div className="shorts-comments-panel">
            <div className="shorts-comments-header">
              <h4>Comments ({currentShortComments.length})</h4>
              <button 
                className="close-btn" 
                style={{ width: '28px', height: '28px' }}
                onClick={() => setCommentsOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            <div className="shorts-comments-list">
              {currentShortComments.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '20px 0' }}>
                  No comments yet. Be the first to comment!
                </div>
              ) : (
                currentShortComments.map(c => (
                  <div key={c.id} className="shorts-comment-item">
                    <div className="shorts-comment-text-wrap">
                      <span className="shorts-comment-user">{c.username}</span>
                      <span className="shorts-comment-content">{c.text}</span>
                      <div className="shorts-comment-time">{c.time}</div>
                    </div>
                    {c.username === "You" && (
                      <button 
                        style={{ border: 'none', background: 'none', color: 'var(--accent-color)', cursor: 'pointer' }}
                        onClick={() => deleteShortComment(currentShort.id, c.id)}
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleCommentSubmit} className="shorts-comment-form">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                required
              />
              <button type="submit" disabled={!newCommentText.trim()}>
                <Send size={14} />
              </button>
            </form>
          </div>
        )}

        {/* Navigation Down */}
        <button 
          className="short-action-circle" 
          onClick={handleNext}
          style={{ position: 'absolute', bottom: '-60px', left: '136px', zIndex: 10, display: 'flex' }}
          title="Next Short"
        >
          <ChevronDown size={22} />
        </button>
      </div>
    </div>
  );
}
