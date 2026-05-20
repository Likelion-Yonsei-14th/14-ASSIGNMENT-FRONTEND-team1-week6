import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StatusBar from '../components/common/StatusBar'
import { ridePosts } from '../data/mockData'

export default function RideDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [liked, setLiked] = useState(false)
  const post = ridePosts.find((p) => p.id === id)

  if (!post) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <span className="text-4xl mb-4">🌿</span>
        <p className="text-gray-500">모집글을 찾을 수 없어요</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-primary text-sm font-semibold">돌아가기</button>
      </div>
    )
  }

  const isFull = post.seatsLeft === 0

  return (
    /* h-full fills MobileFrame's h-[844px] */
    <div className="h-full flex flex-col bg-white overflow-hidden">

      {/* StatusBar — h-[44px] */}
      <StatusBar />

      {/* Page header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-shrink-0">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100">
          <span className="text-gray-600 text-lg">←</span>
        </button>
        <span className="font-bold text-base text-gray-900">교통 모집 상세</span>
        <button className="w-9 h-9 flex items-center justify-center text-gray-400 text-xl">⋯</button>
      </header>

      {/* Scrollable content — flex-1 fills remaining height */}
      <div className="flex-1 overflow-y-auto pb-[72px]">

        {/* Hero */}
        <div
          className="w-full h-52 flex flex-col items-center justify-center"
          style={{ backgroundColor: post.thumbColor }}
        >
          <span className="text-7xl">{post.thumbEmoji}</span>
          <p className="text-sm font-medium mt-2 text-primary-400">{post.vehicle} 라이드</p>
        </div>

        <div className="px-4 py-4">
          {/* Badges */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`chip text-xs ${post.mode === 'regular' ? 'bg-primary-50 text-primary' : 'bg-accent-light text-accent'}`}>
              {post.mode === 'regular' ? '정기 라이드' : '비정기 라이드'}
            </span>
            {post.isDriver
              ? <span className="chip text-xs bg-blue-50 text-blue-600">운전자</span>
              : <span className="chip text-xs bg-purple-50 text-purple-600">동승 구함</span>
            }
          </div>

          {/* Meta + title */}
          <p className="text-xs text-gray-400 mb-2">{post.author.neighborhood} · {post.createdAt}</p>
          <h1 className="text-xl font-bold text-gray-900 mb-4 leading-snug">{post.title}</h1>

          {/* Route */}
          <div className="relative pl-4 mb-5 pb-5 border-b border-gray-100">
            <div className="absolute left-[7px] top-3 bottom-5 w-0.5 bg-gray-200" />
            <div className="flex items-center gap-3 mb-4">
              <div className="absolute left-1 w-3 h-3 rounded-full bg-primary ring-2 ring-primary-200" />
              <div className="ml-4">
                <p className="text-xs text-gray-400">출발</p>
                <p className="font-semibold text-gray-900">{post.from}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="absolute left-1 w-3 h-3 rounded-full bg-accent ring-2 ring-orange-100" />
              <div className="ml-4">
                <p className="text-xs text-gray-400">도착</p>
                <p className="font-semibold text-gray-900">{post.to}</p>
              </div>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3 mb-5 pb-5 border-b border-gray-100">
            {[
              { icon: '📅', label: '날짜', value: post.date },
              { icon: '🕐', label: '출발 시간', value: post.time },
              { icon: '💺', label: '잔여 좌석', value: isFull ? '마감' : `${post.seatsLeft}/${post.seats}석`, red: isFull },
              { icon: '💰', label: '요금', value: post.price === 0 ? '무료' : `₩${post.price.toLocaleString()}` },
            ].map((item) => (
              <div key={item.label} className="bg-muted rounded-2xl p-3">
                <p className="text-xs text-gray-400 mb-1">{item.icon} {item.label}</p>
                <p className={`font-semibold text-sm ${item.red ? 'text-red-500' : 'text-gray-900'}`}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-700 leading-relaxed mb-5 pb-5 border-b border-gray-100">
            {post.description}
          </p>

          {/* Author */}
          <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
              {post.author.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{post.author.name}</p>
              <p className="text-xs text-gray-400">
                ⭐ {post.author.rating} · 후기 {post.author.reviewCount}개 · {post.author.neighborhood}
              </p>
            </div>
          </div>

          {/* Mini map */}
          <MiniMap from={post.from} to={post.to} />
        </div>
      </div>

      {/* Bottom CTA — absolute inside MobileFrame (relative) */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 flex items-center gap-3">
        <button
          onClick={() => setLiked((v) => !v)}
          className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-200 flex-shrink-0"
        >
          <span className="text-xl">{liked ? '❤️' : '🤍'}</span>
        </button>
        <button className="flex-1 btn-outline">전화문의</button>
        <button
          disabled={isFull}
          className={`flex-[1.5] py-3.5 rounded-2xl font-bold text-sm ${
            isFull ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-primary text-white'
          }`}
        >
          {isFull ? '마감됨' : '지원하기'}
        </button>
      </div>
    </div>
  )
}

function MiniMap({ from, to }: { from: string; to: string }) {
  return (
    <div>
      <p className="text-sm font-bold text-gray-900 mb-2">📍 경로</p>
      <div className="w-full h-36 bg-[#e8f0e9] rounded-2xl overflow-hidden relative">
        <svg width="100%" height="100%" className="opacity-70">
          <defs>
            <pattern id="mgrid2" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c5d9c6" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mgrid2)" />
          <rect x="0" y="45%" width="100%" height="8" fill="#d0e4d1" />
          <rect x="35%" y="0" width="8" height="100%" fill="#d0e4d1" />
        </svg>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-xl px-2.5 py-1.5 shadow-md">
          <p className="text-[10px] text-gray-400">출발</p>
          <p className="text-xs font-semibold text-gray-700 truncate max-w-[80px]">{from}</p>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-xl px-2.5 py-1.5 shadow-md">
          <p className="text-[10px] text-gray-400">도착</p>
          <p className="text-xs font-semibold text-gray-700 truncate max-w-[80px]">{to}</p>
        </div>
      </div>
    </div>
  )
}
