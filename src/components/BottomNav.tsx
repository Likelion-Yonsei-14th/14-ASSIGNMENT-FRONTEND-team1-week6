import { useNavigate, useLocation } from 'react-router-dom'

const tabs = [
  { label: '지도(홈)', icon: '🗺️', path: '/' },
  { label: '내 찜', icon: '🤍', path: '/wishlist' },
  { label: '모집글 추가', icon: '➕', path: '/write', center: true },
  { label: '채팅', icon: '💬', path: '/chat' },
  { label: '프로필', icon: '👤', path: '/profile' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
      <div className="flex items-end h-[60px]">
        {tabs.map((t) => {
          const isActive = pathname === t.path
          if (t.center) {
            return (
              <button
                key={t.path}
                onClick={() => navigate(t.path)}
                className="flex-1 flex flex-col items-center pb-2 pt-1"
              >
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-md -mt-5">
                  <span className="text-white text-2xl font-light">+</span>
                </div>
                <span className="text-[10px] text-gray-400 mt-0.5">모집글 추가</span>
              </button>
            )
          }
          return (
            <button
              key={t.path}
              onClick={() => navigate(t.path)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 transition-colors ${
                isActive ? 'text-primary' : 'text-gray-400'
              }`}
            >
              <span className="text-xl leading-none">{t.icon}</span>
              <span className={`text-[10px] font-medium ${isActive ? 'text-primary' : 'text-gray-400'}`}>
                {t.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
