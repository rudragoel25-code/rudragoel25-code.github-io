import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Zap, PlaySquare, Library, History, Clock, ThumbsUp, Compass } from 'lucide-react';
import { YouTubeContext } from '../context/YouTubeContext';

export default function Sidebar() {
  const { sidebarOpen } = useContext(YouTubeContext);

  const activeClass = ({ isActive }) => isActive ? "sidebar-item active" : "sidebar-item";

  return (
    <aside className={`sidebar ${sidebarOpen ? '' : 'mini'}`}>
      <div className="sidebar-section">
        <NavLink to="/" className={activeClass} end>
          <Home size={18} />
          <span>Home</span>
        </NavLink>

        <NavLink to="/shorts" className={activeClass}>
          <Zap size={18} />
          <span>Shorts</span>
        </NavLink>

        <NavLink to="/subscriptions" className={activeClass}>
          <PlaySquare size={18} />
          <span>Subscriptions</span>
        </NavLink>

        <hr />

        <NavLink to="/explore" className={activeClass}>
          <Compass size={18} />
          <span>Explore</span>
        </NavLink>

        <NavLink to="/history" className={activeClass}>
          <History size={18} />
          <span>History</span>
        </NavLink>

        <NavLink to="/watch-later" className={activeClass}>
          <Clock size={18} />
          <span>Watch Later</span>
        </NavLink>

        <NavLink to="/liked" className={activeClass}>
          <ThumbsUp size={18} />
          <span>Liked Videos</span>
        </NavLink>
      </div>
    </aside>
  );
}
