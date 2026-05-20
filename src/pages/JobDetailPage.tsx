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
      {/* StatusBar h-[44px] */}
      <StatusBar />

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto pb-[72px]">

        {/* ── Dual hero (no separate nav bar) ── */}
        <div className="relative w-full h-44 flex gap-0.5">
          <div
            className="flex-1 flex items-center justify-center"
            style={{ backgroundColor: post.thumbColor }}
          >
            <span className="text-6xl">{post.thumbEmoji}</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-800 gap-1">
            <span className="text-white text-[10px] font-light tracking-widest opacity-50">TEAM</span>
            <span className="text-white text-base font-bold tracking-wider">{post.author.name.toUpperCase()}</span>
            <div className="flex gap-1 mt-0.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white opacity-30" />
              ))}
            </div>
          </div>

          {/* Back button overlay */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-3 left-3 w-8 h-8 bg-black/25 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-4 h-4">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>

        <div className="px-4 pt-4">

          {/* ── Title ── */}
          <h1 className="text-[22px] font-bold text-gray-900 leading-snug mb-1">
            {post.title}
          </h1>

          {/* ── Meta ── */}
          <p className="text-xs text-gray-400 mb-5">
            {post.author.neighborhood}
            <span className="mx-1.5 text-gray-300">/</span>
            {post.createdAt}
            <span className="mx-1.5 text-gray-300">/</span>
            후기 {post.author.reviewCount}개
          </p>

          {/* ── Info rows ── */}
          <div className="space-y-4 mb-5 pb-5 border-b border-gray-100">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[18px] h-[18px]">
                    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                  </svg>
                ),
                text: `월급 ${(post.pay / 10000).toLocaleString()}만원`,
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[18px] h-[18px]">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                ),
                text: post.date,
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[18px] h-[18px]">
                    <circle cx="12" cy="12" r="10" /><path d="M12 7v5l3 3" />
                  </svg>
                ),
                text: post.time,
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[18px] h-[18px]">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                    <circle cx="7" cy="7" r="1" fill="currentColor" stroke="none" />
                  </svg>
                ),
                text: post.tags.filter((t) => t !== '정기' && t !== '비정기').join('/'),
              },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 flex-shrink-0">
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

          {/* ── Applicants + Map ── */}
          <div className="mb-2">
            <div className="flex items-center gap-1.5 mb-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.8" className="w-5 h-5">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
              <p className="text-sm font-bold text-gray-900">
                지원자 <span className="text-primary">{post.applicants.length}명</span>
              </p>
            </div>
            <DetailMap applicantCount={post.applicants.length} />
          </div>

        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => setLiked((v) => !v)} className="flex-shrink-0 p-1">
          <svg viewBox="0 0 24 24" fill={liked ? '#35FCA9' : 'none'} stroke={liked ? '#35FCA9' : '#9ca3af'} strokeWidth="1.8" className="w-7 h-7">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
        <button className="flex-1 py-3.5 rounded-2xl bg-gray-100 text-gray-600 font-semibold text-sm">
          전화문의
        </button>
        <button className="flex-[1.5] py-3.5 rounded-2xl font-bold text-sm text-gray-900" style={{ backgroundColor: '#35FCA9' }}>
          지원하기
        </button>
      </div>
    </div>
  )
}

/* ── Realistic-style map with scattered pins ── */
function DetailMap({ applicantCount }: { applicantCount: number }) {
  const pins = [
    { x: 52, y: 90, color: '#35FCA9' },
    { x: 180, y: 60, color: '#FF7043' },
    { x: 290, y: 110, color: '#35FCA9' },
    { x: 130, y: 130, color: '#3B82F6' },
    { x: 230, y: 75, color: '#FF7043' },
    { x: 320, y: 55, color: '#35FCA9' },
    { x: 70, y: 150, color: '#3B82F6' },
  ]
  const busStops = [
    { x: 100, y: 85, num: '46' },
    { x: 260, y: 95, num: '15' },
  ]

  return (
    <div className="w-full h-48 rounded-2xl overflow-hidden relative bg-[#e8eedc]">
      <svg width="100%" height="100%" viewBox="0 0 390 192" preserveAspectRatio="xMidYMid slice">
        <rect width="390" height="192" fill="#e8eedc" />

        {/* Major roads */}
        <path d="M0 96 Q80 88 180 95 Q280 102 390 90" stroke="white" strokeWidth="12" fill="none" />
        <path d="M0 96 Q80 88 180 95 Q280 102 390 90" stroke="#f0ead8" strokeWidth="10" fill="none" />
        <path d="M185 0 Q190 96 188 192" stroke="white" strokeWidth="10" fill="none" />
        <path d="M185 0 Q190 96 188 192" stroke="#f0ead8" strokeWidth="8" fill="none" />

        {/* Secondary roads */}
        <path d="M0 48 Q100 43 200 50 Q300 57 390 44" stroke="white" strokeWidth="6" fill="none" opacity="0.9" />
        <path d="M60 0 Q58 96 62 192" stroke="white" strokeWidth="5" fill="none" opacity="0.8" />
        <path d="M320 0 Q318 96 322 192" stroke="white" strokeWidth="5" fill="none" opacity="0.8" />
        <path d="M0 148 Q130 143 260 150 Q330 154 390 144" stroke="white" strokeWidth="5" fill="none" opacity="0.8" />
        <path d="M120 0 Q118 96 122 192" stroke="white" strokeWidth="4" fill="none" opacity="0.6" />

        {/* Green areas */}
        <ellipse cx="75" cy="155" rx="42" ry="26" fill="#c5d9a8" opacity="0.8" />
        <ellipse cx="340" cy="48" rx="32" ry="20" fill="#c5d9a8" opacity="0.7" />
        <ellipse cx="250" cy="165" rx="28" ry="18" fill="#c5d9a8" opacity="0.6" />

        {/* Buildings */}
        <rect x="18" y="18" width="28" height="22" rx="2" fill="#d8dfc8" />
        <rect x="95" y="108" width="20" height="16" rx="2" fill="#d8dfc8" />
        <rect x="210" y="28" width="24" height="18" rx="2" fill="#d4dbc6" />
        <rect x="345" y="118" width="22" height="18" rx="2" fill="#d8dfc8" />
        <rect x="150" y="162" width="18" height="14" rx="2" fill="#d4dbc6" />
        <rect x="280" y="20" width="20" height="16" rx="2" fill="#d8dfc8" />

        {/* Road labels */}
        <text x="188" y="38" fontSize="8" fill="#9aab7a" fontFamily="sans-serif" textAnchor="middle" transform="rotate(90 188 38)">다로리로</text>
        <text x="195" y="90" fontSize="8" fill="#9aab7a" fontFamily="sans-serif" textAnchor="middle">중앙대로</text>

        {/* Bus stop circles */}
        {busStops.map((b) => (
          <g key={b.num}>
            <circle cx={b.x} cy={b.y} r="10" fill="white" stroke="#ccc" strokeWidth="1" />
            <text x={b.x} y={b.y + 4} fontSize="8" fill="#555" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">{b.num}</text>
          </g>
        ))}
      </svg>

      {/* Applicant pins */}
      {pins.slice(0, applicantCount + 3).map((p, i) => (
        <div
          key={i}
          className="absolute w-5 h-5 rounded-full border-2 border-white shadow-md flex items-center justify-center"
          style={{ left: p.x, top: p.y, backgroundColor: p.color, transform: 'translate(-50%,-50%)' }}
        />
      ))}

      {/* My location pin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
        <div className="w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center" style={{ backgroundColor: '#35FCA9' }}>
          <div className="w-2.5 h-2.5 bg-white rounded-full" />
        </div>
        <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent -mt-0.5" style={{ borderTopColor: '#35FCA9' }} />
      </div>

      {/* Zoom controls */}
      <div className="absolute right-3 bottom-3 flex flex-col bg-white rounded-lg shadow overflow-hidden">
        <button className="w-7 h-7 flex items-center justify-center text-gray-500 text-base border-b border-gray-100 font-light">+</button>
        <button className="w-7 h-7 flex items-center justify-center text-gray-500 text-base font-light">−</button>
      </div>
    </div>
  )
}
