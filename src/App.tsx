import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MobileFrame from './components/common/MobileFrame'
import HomePage from './pages/HomePage'
import RideDetailPage from './pages/RideDetailPage'
import JobDetailPage from './pages/JobDetailPage'
import WishlistPage from './pages/WishlistPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <MobileFrame>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rides/:id" element={<RideDetailPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
        </MobileFrame>
      </div>
    </BrowserRouter>
  )
}
