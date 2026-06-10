import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Menu, Search, Mic, Video, Bell, Sun, Moon } from 'lucide-react';
import { YouTubeContext } from '../context/YouTubeContext';

export default function Header({ onOpenUpload }) {
  const { theme, toggleTheme, toggleSidebar } = useContext(YouTubeContext);
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Keep search input in sync with URL search params
  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleMicClick = () => {
    alert("Voice search activated! Try saying something... (This is a demonstration mockup)");
  };

  return (
    <header className="header">
      <div className="left">
        <button className="menu-btn" onClick={toggleSidebar} title="Toggle Sidebar">
          <Menu size={22} />
        </button>

        <Link to="/" className="logo-link">
          <div className="logo-wrap">
            <img
              src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"
              className="logo"
              alt="YouTube"
            />
            <span className="country">IN</span>
          </div>
        </Link>
      </div>

      <form className="center-search" onSubmit={handleSubmit}>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
          <button type="submit" className="search-btn" title="Search">
            <Search size={18} />
          </button>
        </div>
        <button type="button" className="mic-btn" onClick={handleMicClick} title="Search with your voice">
          <Mic size={18} />
        </button>
      </form>

      <div className="right">
        {/* Create (camera with plus) */}
        <button className="icon-btn" onClick={onOpenUpload} title="Create / Upload Video">
          <Video size={20} />
        </button>

        {/* Theme Toggle */}
        <button className="icon-btn" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}>
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* Notifications (bell) */}
        <button className="icon-btn" title="Notifications">
          <Bell size={20} />
          <span className="badge">9</span>
        </button>

        {/* Profile (user circle) */}
        <Link to="/profile" style={{ textDecoration: 'none' }}>
          <button className="profile-btn" title="Your Account">
            R
          </button>
        </Link>
      </div>
    </header>
  );
}
