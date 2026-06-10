import React, { useContext } from 'react';
import { YouTubeContext } from '../context/YouTubeContext';
import VideoThumbnail from '../components/VideoThumbnail';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { videos } = useContext(YouTubeContext);

  const myVideos = videos.slice(0, 4); // Mock user's uploaded videos

  return (
    <div className="profile-container" style={{ padding: '24px', maxWidth: '1280px', margin: '0 auto', color: 'var(--text-color)' }}>
      {/* Banner */}
      <div style={{ height: '200px', backgroundColor: 'var(--hover-color)', borderRadius: '16px', marginBottom: '32px', backgroundImage: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)' }}></div>

      <div className="profile-header" style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', marginBottom: '32px' }}>
        <div className="profile-avatar" style={{ width: '160px', height: '160px', borderRadius: '50%', backgroundColor: '#8a2be2', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '64px', color: 'white', fontWeight: 'bold', marginTop: '-80px', border: '4px solid var(--bg-color)' }}>
          R
        </div>
        <div className="profile-info" style={{ flex: 1, marginTop: '8px' }}>
          <h1 style={{ fontSize: '36px', marginBottom: '8px', fontWeight: 'bold' }}>Rudra Goel</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <span style={{ fontWeight: '500', color: 'var(--text-color)' }}>@rudragoel25</span>
            <span>•</span>
            <span>1.2M subscribers</span>
            <span>•</span>
            <span>150 videos</span>
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '14px', maxWidth: '600px', lineHeight: '1.4' }}>
            Welcome to my channel! I'm a passionate web developer creating interactive and premium web applications. Subscribe for more amazing content!
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ padding: '10px 18px', borderRadius: '18px', border: 'none', backgroundColor: 'var(--text-color)', color: 'var(--bg-color)', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>Customize channel</button>
            <button style={{ padding: '10px 18px', borderRadius: '18px', border: 'none', backgroundColor: 'var(--hover-color)', color: 'var(--text-color)', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>Manage videos</button>
          </div>
        </div>
      </div>

      <div className="profile-tabs" style={{ display: 'flex', gap: '32px', borderBottom: '1px solid var(--border-color)', marginBottom: '24px', fontSize: '16px', fontWeight: '500', color: 'var(--text-secondary)' }}>
        <span style={{ paddingBottom: '12px', borderBottom: '3px solid var(--text-color)', color: 'var(--text-color)', cursor: 'pointer' }}>Home</span>
        <span style={{ paddingBottom: '12px', cursor: 'pointer', hover: { color: 'var(--text-color)' } }}>Videos</span>
        <span style={{ paddingBottom: '12px', cursor: 'pointer' }}>Shorts</span>
        <span style={{ paddingBottom: '12px', cursor: 'pointer' }}>Playlists</span>
        <span style={{ paddingBottom: '12px', cursor: 'pointer' }}>Community</span>
      </div>

      <div className="profile-content">
        <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>For You</h3>
        <div className="video-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {myVideos.map(video => (
            <Link key={video.id} to={`/watch/${video.id}`} className="video-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <VideoThumbnail videoId={video.id} title={video.title} fallbackColor="#8a2be2" />
              <div className="video-info" style={{ marginTop: '12px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{video.title}</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{video.viewsText} • {video.publishedText}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
