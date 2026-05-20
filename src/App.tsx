import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatListPage from './pages/ChatListPage';
import ChatRoomPage from './pages/ChatRoomPage';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatListPage />} />
        <Route path="/chat/:chatId" element={<ChatRoomPage />} />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
