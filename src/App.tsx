import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MobileFrame from './components/common/MobileFrame';
import HomePage from './pages/HomePage';
import ChatListPage from './pages/ChatListPage';
import ChatRoomPage from './pages/ChatRoomPage';
import RideDetailPage from './pages/RideDetailPage';
import JobDetailPage from './pages/JobDetailPage';
import WishlistPage from './pages/WishlistPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <MobileFrame>
            <HomePage />
          </MobileFrame>
        } />
        <Route path="/chat" element={<ChatListPage />} />
        <Route path="/chat/:chatId" element={<ChatRoomPage />} />
        <Route path="/rides/:id" element={
          <MobileFrame>
            <RideDetailPage />
          </MobileFrame>
        } />
        <Route path="/jobs/:id" element={
          <MobileFrame>
            <JobDetailPage />
          </MobileFrame>
        } />
        <Route path="/wishlist" element={
          <MobileFrame>
            <WishlistPage />
          </MobileFrame>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
