import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import UploadModal from './components/UploadModal';

// Pages
import Home from './pages/Home';
import Watch from './pages/Watch';
import Search from './pages/Search';
import Channel from './pages/Channel';
import Subscriptions from './pages/Subscriptions';
import LikedVideos from './pages/LikedVideos';
import Explore from './pages/Explore';
import History from './pages/History';
import WatchLater from './pages/WatchLater';
import Shorts from './pages/Shorts';
import Profile from './pages/Profile';

export default function App() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* Top sticky navigation bar */}
      <Header onOpenUpload={() => setIsUploadOpen(true)} />

      {/* Main container with side-by-side drawer and main content */}
      <div className="main-container">
        <Sidebar />
        
        <main className="content-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shorts" element={<Shorts />} />
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="/search" element={<Search />} />
            <Route path="/channel/:channelName" element={<Channel />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/liked" element={<LikedVideos />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/history" element={<History />} />
            <Route path="/watch-later" element={<WatchLater />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>

      {/* Upload Mock Video Modal */}
      <UploadModal 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
      />
    </div>
  );
}
