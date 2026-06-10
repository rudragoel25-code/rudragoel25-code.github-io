import React, { useState, useContext } from 'react';
import { X } from 'lucide-react';
import { YouTubeContext } from '../context/YouTubeContext';

export default function UploadModal({ isOpen, onClose }) {
  const { addVideo } = useContext(YouTubeContext);
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [channel, setChannel] = useState('My Creator Hub');
  const [category, setCategory] = useState('Web Dev');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  // Extract video ID from standard or short YouTube URL
  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url; // Fallback to raw input if no regex match
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const videoId = extractVideoId(videoUrl.trim());
    if (!videoId) {
      alert("Please enter a valid YouTube Video ID or URL.");
      return;
    }

    const newVideo = {
      id: videoId,
      title: title.trim(),
      channel: channel.trim(),
      views: 0,
      viewsText: "No views",
      publishedText: "Just now",
      category,
      description: description.trim() || "No description provided.",
      subscribers: "120"
    };

    addVideo(newVideo);
    
    // Reset form
    setTitle('');
    setVideoUrl('');
    setDescription('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Upload Video</h3>
          <button className="close-btn" onClick={onClose} title="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="video-title">Video Title</label>
            <input
              id="video-title"
              type="text"
              placeholder="Enter video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="video-url">YouTube Video URL or ID</label>
            <input
              id="video-url"
              type="text"
              placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ or dQw4w9WgXcQ"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="video-channel">Channel Name</label>
            <input
              id="video-channel"
              type="text"
              placeholder="Channel name"
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="video-category">Category</label>
            <select
              id="video-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Web Dev">Web Dev</option>
              <option value="IPL">IPL</option>
              <option value="Gaming">Gaming</option>
              <option value="Music">Music</option>
              <option value="Podcasts">Podcasts</option>
              <option value="C++">C++</option>
              <option value="DSA">DSA</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Cyber Security">Cyber Security</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="video-desc">Description</label>
            <textarea
              id="video-desc"
              placeholder="Tell viewers about your video"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="modal-btn cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-btn primary">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
