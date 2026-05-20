import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import StatusBar from '../components/common/StatusBar'
import { ridePosts, jobPosts } from '../data/mockData'
import type { RidePost, JobPost } from '../types'

type Tab = 'ride' | 'job'

const defaultLikedRideIds = new Set(['r1', 'r3', 'r5'])
const defaultLikedJobIds = new Set(['j1', 'j4'])

export default function WishlistPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('ride')
  const [likedRideIds, setLikedRideIds] = useState<Set<string>>(defaultLikedRideIds)
  const [likedJobIds, setLikedJobIds] = useState<Set<string>>(defaultLikedJobIds)

  const likedRides = ridePosts.filter((p) => likedRideIds.has(p.id))
  const likedJobs = jobPosts.filter((p) => likedJobIds.has(p.id))

  const toggleRide = (id: string) =>
    setLikedRideIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const toggleJob = (id: string) =>
    setLikedJobIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <StatusBar />

      {/* Header */}
      <header className="flex items-center px-4 py-3 border-b border-gray-100 flex-shrink-0">
        <span className="font-bold text-base text-gray-900 flex-1 text-center">내 찜</span>
      </header>

      {/* Segment tabs */}
      <div className="px-4 pt-3 pb-2 flex gap-2 flex-shrink-0">
        {([
          { value: 'ride', label: '라이드 쉐어' },
          { value: 'job', label: '일자리' },
        ] as { value: Tab; label: string }[]).map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            style={{
              height: '38px',
              borderRadius: '10px',
              padding: '0 20px',
              backgroundColor: tab === t.value ? '#2D6A4F' : '#F4F4F4',
              color: tab === t.value ? '#ffffff' : '#6b7280',
              fontFamily: 'Inter, sans-serif',
              fontWeight: tab === t.value ? 600 : 400,
              fontSize: '14px',
            }}
            className="flex items-center justify-center transition-colors"
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <div className="px-4 pb-2 flex-shrink-0">
        <p className="text-xs text-gray-400">
          총 <span className="text-primary font-semibold">
            {tab === 'ride' ? likedRides.length : likedJobs.length}
          </span>개
        </p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto pb-[72px] px-4 space-y-3">
        {tab === 'ride'
          ? likedRides.length > 0
            ? likedRides.map((p) => (
                <RideCard
                  key={p.id}
                  post={p}
                  liked={likedRideIds.has(p.id)}
                  onToggleLike={() => toggleRide(p.id)}
                  onClick={() => navigate(`/rides/${p.id}`)}
                />
              ))
            : <Empty />
          : likedJobs.length > 0
            ? likedJobs.map((p) => (
                <JobCard
                  key={p.id}
                  post={p}
                  liked={likedJobIds.has(p.id)}
                  onToggleLike={() => toggleJob(p.id)}
                  onClick={() => navigate(`/jobs/${p.id}`)}
                />
              ))
            : <Empty />
        }
      </div>

      <BottomNav />
    </div>
  )
}

function RideCard({
  post, liked, onToggleLike, onClick,
}: {
  post: RidePost
  liked: boolean
  onToggleLike: () => void
  onClick: () => void
}) {
  const isFull = post.seatsLeft === 0

  return (
    <div
      className="w-full rounded-2xl overflow-hidden flex shadow-sm border border-gray-100"
      style={{ height: '88px' }}
    >
      {/* Thumb */}
      <button
        onClick={onClick}
        className="flex items-center justify-center flex-shrink-0 active:opacity-80 transition-opacity"
        style={{ width: '80px', backgroundColor: post.thumbColor }}
      >
        <span className="text-3xl">{post.thumbEmoji}</span>
      </button>

      {/* Body */}
      <button
        onClick={onClick}
        className="flex-1 bg-white flex flex-col justify-center px-3 text-left active:bg-gray-50 transition-colors min-w-0"
      >
        <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
            post.mode === 'regular' ? 'bg-primary-50 text-primary' : 'bg-orange-50 text-orange-500'
          }`}>
            {post.mode === 'regular' ? '정기' : '비정기'}
          </span>
          {isFull && (
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-red-50 text-red-400">마감</span>
          )}
        </div>
        <p className="text-sm font-semibold text-gray-900 truncate">{post.title}</p>
        <p className="text-[11px] text-gray-400 truncate">{post.from} → {post.to}</p>
        <p className="text-[11px] text-gray-500 mt-0.5">{post.date} · {post.time}</p>
      </button>

      {/* Like button */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleLike() }}
        className="flex-shrink-0 w-12 flex items-center justify-center active:scale-90 transition-transform"
      >
        <svg viewBox="0 0 24 24" fill={liked ? '#52C98A' : 'none'} stroke={liked ? '#52C98A' : '#d1d5db'} strokeWidth="1.8" className="w-6 h-6">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      </button>
    </div>
  )
}

function JobCard({
  post, liked, onToggleLike, onClick,
}: {
  post: JobPost
  liked: boolean
  onToggleLike: () => void
  onClick: () => void
}) {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden flex shadow-sm border border-gray-100"
      style={{ height: '88px' }}
    >
      {/* Thumb */}
      <button
        onClick={onClick}
        className="flex items-center justify-center flex-shrink-0 active:opacity-80 transition-opacity"
        style={{ width: '80px', backgroundColor: post.thumbColor }}
      >
        <span className="text-3xl">{post.thumbEmoji}</span>
      </button>

      {/* Body */}
      <button
        onClick={onClick}
        className="flex-1 bg-white flex flex-col justify-center px-3 text-left active:bg-gray-50 transition-colors min-w-0"
      >
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
            post.mode === 'regular' ? 'bg-primary-50 text-primary' : 'bg-orange-50 text-orange-500'
          }`}>
            {post.mode === 'regular' ? '정기' : '비정기'}
          </span>
        </div>
        <p className="text-sm font-semibold text-gray-900 truncate">{post.title}</p>
        <p className="text-[11px] text-gray-400 truncate">{post.location}</p>
        <p className="text-[11px] text-gray-500 mt-0.5">
          {post.payUnit === '월'
            ? `월 ${(post.pay / 10000).toLocaleString()}만원`
            : post.payUnit === '시간'
            ? `시급 ${post.pay.toLocaleString()}원`
            : `${post.pay.toLocaleString()}원/${post.payUnit}`
          }
        </p>
      </button>

      {/* Like button */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleLike() }}
        className="flex-shrink-0 w-12 flex items-center justify-center active:scale-90 transition-transform"
      >
        <svg viewBox="0 0 24 24" fill={liked ? '#52C98A' : 'none'} stroke={liked ? '#52C98A' : '#d1d5db'} strokeWidth="1.8" className="w-6 h-6">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      </button>
    </div>
  )
}

function Empty() {
  return (
    <div className="flex flex-col items-center py-16">
      <svg viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.4" className="w-16 h-16 mb-3">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
      <p className="text-gray-400 text-sm">찜한 게시글이 없어요</p>
      <p className="text-gray-300 text-xs mt-1">관심 있는 글에 하트를 눌러보세요</p>
    </div>
  )
}
