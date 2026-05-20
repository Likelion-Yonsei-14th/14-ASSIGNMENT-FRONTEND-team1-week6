import BottomNav from '../components/BottomNav'
import StatusBar from '../components/common/StatusBar'

export default function WishlistPage() {
  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <StatusBar />

      {/* Header */}
      <header className="flex items-center px-4 py-3 border-b border-gray-100 flex-shrink-0">
        <span className="font-bold text-base text-gray-900 flex-1 text-center">내 찜</span>
      </header>

      <div className="flex-1" />

      <BottomNav />
    </div>
  )
}
