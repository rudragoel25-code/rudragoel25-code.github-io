import React, { useState } from 'react';
import { Play } from 'lucide-react';

export default function VideoThumbnail({ videoId, title, fallbackColor }) {
  const [imgSrc, setImgSrc] = useState(`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`);
  const [imgFailed, setImgFailed] = useState(false);

  const handleImgError = () => {
    if (imgSrc.includes('mqdefault')) {
      // Try fallback to the alternative standard format from YouTube
      setImgSrc(`https://img.youtube.com/vi/${videoId}/0.jpg`);
    } else {
      // Show custom visual gradient fallback
      setImgFailed(true);
    }
  };

  if (imgFailed) {
    return (
      <div 
        className="thumbnail-fallback" 
        style={{
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, ${fallbackColor || '#cc0000'}, #222222)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '12px',
          padding: '12px',
          textAlign: 'center',
          gap: '6px'
        }}
      >
        <Play size={24} style={{ fill: 'white' }} />
        <span style={{ 
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '90%'
        }}>
          {title}
        </span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={title}
      loading="lazy"
      onError={handleImgError}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  );
}
