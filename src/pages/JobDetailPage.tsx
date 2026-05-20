import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StatusBar from '../components/common/StatusBar'
import { jobPosts } from '../data/mockData'

export default function JobDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [liked, setLiked] = useState(false)
  const post = jobPosts.find((p) => p.id === id)

  if (!post) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <span className="text-4xl mb-4">🌿</span>
        <p className="text-gray-500">모집글을 찾을 수 없어요</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-primary text-sm font-semibold">돌아가기</button>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <StatusBar />

      <div className="flex-1 overflow-y-auto pb-[76px]">

        {/* ── Dual-photo hero ── */}
        <div className="relative w-full h-44 flex gap-0.5">
          {/* Left photo */}
          <div
            className="flex-1 flex items-center justify-center"
            style={{ backgroundColor: post.thumbColor }}
          >
            <span className="text-6xl">{post.thumbEmoji}</span>
          </div>
          {/* Right photo */}
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-800 gap-1">
            <span className="text-white text-xs font-light tracking-widest opacity-60">TEAM</span>
            <span className="text-white text-lg font-bold tracking-wider">{post.author.name.toUpperCase()}</span>
            <div className="mt-1 flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white opacity-40" />
              ))}
            </div>
          </div>

          {/* Back button overlay */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-3 left-3 w-8 h-8 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <span className="text-white text-sm">←</span>
          </button>
        </div>

        <div className="px-4 pt-4">

          {/* ── Title ── */}
          <h1 className="text-[22px] font-bold text-gray-900 leading-snug mb-1">
            {post.title}
          </h1>

          {/* ── Meta row ── */}
          <p className="text-xs text-gray-400 mb-5">
            {post.author.neighborhood}
            <span className="mx-1.5">·</span>
            {post.createdAt}
            <span className="mx-1.5">·</span>
            지원자 {post.applicants.length}명
          </p>

          {/* ── Info rows ── */}
          <div className="space-y-4 mb-5 pb-5 border-b border-gray-100">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                  </svg>
                ),
                text: `월급 ${post.pay.toLocaleString()}만원`,
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                ),
                text: post.date,
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <circle cx="12" cy="12" r="10" /><path d="M12 7v5l3 3" />
                  </svg>
                ),
                text: post.time,
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><circle cx="7" cy="7" r="1" fill="currentColor" />
                  </svg>
                ),
                text: post.tags.filter((t) => t !== '정기' && t !== '비정기').join('/'),
              },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 flex-shrink-0">
                  {row.icon}
                </div>
                <span className="text-sm text-gray-800">{row.text}</span>
              </div>
            ))}
          </div>

          {/* ── Description ── */}
          <p className="text-sm text-gray-700 leading-relaxed mb-5 pb-5 border-b border-gray-100 whitespace-pre-line">
            {post.description}
          </p>

          {/* ── Applicants ── */}
          {post.applicants.length > 0 && (
            <div className="mb-5 pb-5 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">👥</span>
                <p className="text-sm font-bold text-gray-900">
                  지원자 <span className="text-primary">{post.applicants.length}명</span>
                </p>
              </div>
              {/* Overlapping avatars */}
              <div className="flex items-center">
                {post.applicants.map((a, i) => (
                  <div
                    key={a.id}
                    className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-lg flex-shrink-0"
                    style={{ marginLeft: i === 0 ? 0 : -10, zIndex: post.applicants.length - i }}
                  >
                    {a.avatar}
                  </div>
                ))}
                <span className="ml-3 text-xs text-gray-500">
                  {post.applicants.map((a) => a.name).join(', ')} 외
                </span>
              </div>
            </div>
          )}

          {/* ── Map ── */}
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">📍</span>
              <p className="text-sm font-bold text-gray-900">위치</p>
            </div>
            <RealisticMap location={post.location} />
          </div>

        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => setLiked((v) => !v)}
          className="w-12 h-12 flex items-center justify-center flex-shrink-0"
        >
          <span className="text-2xl">{liked ? '❤️' : '🤍'}</span>
        </button>
        <button className="flex-1 py-3.5 rounded-2xl border border-gray-300 text-gray-700 font-semibold text-sm">
          전화문의
        </button>
        <button className="flex-[1.5] py-3.5 rounded-2xl bg-primary text-white font-bold text-sm">
          지원하기
        </button>
      </div>
    </div>
  )
}

function RealisticMap({ location }: { location: string }) {
  return (
    <div className="w-full h-44 rounded-2xl overflow-hidden relative bg-[#e8f0e4]">
      {/* Realistic-looking map SVG */}
      <svg width="100%" height="100%" viewBox="0 0 390 176" preserveAspectRatio="xMidYMid slice">
        {/* Base */}
        <rect width="390" height="176" fill="#e8f0e4" />

        {/* Large roads */}
        <path d="M0 88 Q100 80 200 90 T390 85" stroke="#fff" strokeWidth="10" fill="none" />
        <path d="M0 88 Q100 80 200 90 T390 85" stroke="#f5f5dc" strokeWidth="8" fill="none" />
        <path d="M180 0 Q190 90 195 176" stroke="#fff" strokeWidth="8" fill="none" />
        <path d="M180 0 Q190 90 195 176" stroke="#f5f5dc" strokeWidth="6" fill="none" />

        {/* Secondary roads */}
        <path d="M0 50 Q80 45 160 55 T320 48" stroke="#fff" strokeWidth="5" fill="none" opacity="0.8" />
        <path d="M60 0 Q55 60 65 176" stroke="#fff" strokeWidth="5" fill="none" opacity="0.8" />
        <path d="M310 0 Q305 80 315 176" stroke="#fff" strokeWidth="4" fill="none" opacity="0.7" />
        <path d="M0 130 Q150 125 280 135 T390 128" stroke="#fff" strokeWidth="5" fill="none" opacity="0.8" />

        {/* Park / green areas */}
        <ellipse cx="80" cy="130" rx="45" ry="28" fill="#c8ddc8" opacity="0.7" />
        <ellipse cx="330" cy="55" rx="35" ry="22" fill="#c8ddc8" opacity="0.6" />

        {/* Buildings */}
        <rect x="20" y="20" width="28" height="22" rx="3" fill="#d4dbd4" />
        <rect x="22" y="22" width="24" height="18" rx="2" fill="#cdd5cd" />
        <rect x="100" y="60" width="22" height="18" rx="2" fill="#d4dbd4" />
        <rect x="240" y="100" width="30" height="24" rx="3" fill="#d4dbd4" />
        <rect x="340" y="140" width="20" height="18" rx="2" fill="#d0d8d0" />
        <rect x="140" y="15" width="18" height="14" rx="2" fill="#d4dbd4" />
        <rect x="260" y="30" width="22" height="17" rx="2" fill="#cdd5cd" />

        {/* Small labels */}
        <text x="75" y="138" fontSize="7" fill="#8a9e8a" fontFamily="sans-serif" textAnchor="middle">공원</text>
        <text x="325" y="60" fontSize="7" fill="#8a9e8a" fontFamily="sans-serif" textAnchor="middle">녹지</text>

        {/* Road labels */}
        <text x="195" y="83" fontSize="8" fill="#a0a060" fontFamily="sans-serif" textAnchor="middle" transform="rotate(-2 195 83)">다로리로</text>
        <text x="175" y="40" fontSize="7" fill="#b0b070" fontFamily="sans-serif" textAnchor="middle" transform="rotate(88 175 40)">1번길</text>
      </svg>

      {/* Pin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
        <div className="bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
          📍 {location}
        </div>
        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[7px] border-l-transparent border-r-transparent border-t-primary" />
      </div>

      {/* Zoom controls */}
      <div className="absolute right-3 bottom-3 flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
        <button className="w-7 h-7 flex items-center justify-center text-gray-600 text-lg border-b border-gray-100">+</button>
        <button className="w-7 h-7 flex items-center justify-center text-gray-600 text-lg">−</button>
      </div>
    </div>
  )
}
