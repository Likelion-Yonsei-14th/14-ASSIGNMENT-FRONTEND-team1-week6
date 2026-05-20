import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import StatusBar from '../components/common/StatusBar'
import { ridePosts, jobPosts } from '../data/mockData'

type Tab = 'ride' | 'job'
type Chip = 'regular' | 'irregular' | 'bus' | null

const rideMarkers = [
  { id: 'r1', x: '40%', y: '43%', label: '병원행' },
  { id: 'r2', x: '56%', y: '31%', label: '면사무소' },
  { id: 'r3', x: '22%', y: '56%', label: '마트행' },
  { id: 'r4', x: '68%', y: '50%', label: '대학병원' },
  { id: 'r5', x: '43%', y: '63%', label: '성당행' },
]
const jobMarkers = [
  { id: 'j1', x: '32%', y: '36%', label: '카페알바' },
  { id: 'j2', x: '60%', y: '58%', label: '고추밭' },
  { id: 'j3', x: '48%', y: '72%', label: '강아지산책' },
  { id: 'j4', x: '20%', y: '46%', label: '돌봄' },
  { id: 'j5', x: '75%', y: '38%', label: '청소' },
]

export default function HomePage() {
  const navigate = useNavigate()
  const [chip, setChip] = useState<Chip>(null)
  const [tab, setTab] = useState<Tab>('ride')
  const [expanded, setExpanded] = useState(false)

  const rides = ridePosts.filter((p) => {
    if (chip === 'regular') return p.mode === 'regular'
    if (chip === 'irregular') return p.mode === 'irregular'
    return true
  })
  const jobs = jobPosts.filter((p) => {
    if (chip === 'regular') return p.mode === 'regular'
    if (chip === 'irregular') return p.mode === 'irregular'
    return true
  })

  const handleChip = (c: Chip) => {
    if (c === 'bus') { navigate('/listing'); return }
    setChip((prev) => (prev === c ? null : c))
  }

  return (
    /* h-full fills MobileFrame's h-[844px] */
    <div className="relative h-full overflow-hidden">
      {/* ── Map background (absolute inset) ── */}
      <MapBg showRide={chip !== 'bus'} showJob={tab === 'job'} />

      {/* ── Top overlay: StatusBar + search + chips ── */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <StatusBar />
        <div className="px-4 pb-2">
          <button
            onClick={() => navigate('/listing')}
            className="w-full bg-white rounded-2xl px-4 py-3 flex items-center gap-2 shadow-md"
          >
            <span className="text-lg">🔍</span>
            <span className="text-gray-400 text-sm">장소 검색창</span>
          </button>
        </div>
        <div className="px-4 flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {[
            { key: 'regular', label: '정기 라이드' },
            { key: 'irregular', label: '비정기 라이드' },
            { key: 'bus', label: '버스 정보' },
          ].map((c) => (
            <button
              key={c.key}
              onClick={() => handleChip(c.key as Chip)}
              className={`chip flex-shrink-0 shadow-sm transition-all border ${
                chip === c.key
                  ? 'bg-primary text-white border-primary shadow-md'
                  : 'bg-white text-gray-700 border-gray-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Bottom sheet ── */}
      <div
        className={`absolute left-0 right-0 bg-[#f2f2f2] rounded-t-3xl z-30 shadow-[0_-4px_24px_rgba(0,0,0,0.10)] transition-all duration-300 ${
          expanded ? 'top-[140px]' : 'bottom-[60px]'
        }`}
      >
        {/* Handle */}
        <button className="w-full flex justify-center pt-3 pb-2" onClick={() => setExpanded((v) => !v)}>
          <div className="w-9 h-1 bg-gray-300 rounded-full" />
        </button>

        {/* "이 지역에서 검색" pill button */}
        <div className="flex justify-center mb-3">
          <button className="flex items-center gap-1.5 bg-white px-5 py-2 rounded-full shadow-sm border border-gray-200 text-sm font-medium text-gray-700 active:scale-95 transition-transform">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-primary">
              <path d="M23 4v6h-6" /><path d="M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
            </svg>
            이 지역에서 검색
          </button>
        </div>

        {/* Segment tabs */}
        <div className="mx-4 mb-3 bg-gray-200 rounded-2xl p-1 flex">
          {([
            { value: 'ride', label: '라이드 쉐어' },
            { value: 'job', label: '일자리' },
          ] as { value: Tab; label: string }[]).map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                tab === t.value
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* List header */}
        <div className="px-4 pb-2 text-center">
          <p className="text-sm font-bold text-gray-900">
            지금 핫한 모집글 <span className="text-primary">TOP20</span>
          </p>
        </div>

        {/* Scrollable banner cards */}
        <div
          className="overflow-y-auto px-4 pb-4 space-y-2"
          style={{ maxHeight: expanded ? 'calc(844px - 300px)' : 200 }}
        >
          {tab === 'ride'
            ? rides.length > 0
              ? rides.slice(0, expanded ? 20 : 5).map((p, i) => (
                  <BannerCard
                    key={p.id}
                    rank={i + 1}
                    title={p.title}
                    sub={`${p.from} → ${p.to}`}
                    thumbColor={p.thumbColor}
                    thumbEmoji={p.thumbEmoji}
                    onClick={() => navigate(`/rides/${p.id}`)}
                  />
                ))
              : <Empty />
            : jobs.length > 0
              ? jobs.slice(0, expanded ? 20 : 5).map((p, i) => (
                  <BannerCard
                    key={p.id}
                    rank={i + 1}
                    title={p.title}
                    sub={p.location}
                    thumbColor={p.thumbColor}
                    thumbEmoji={p.thumbEmoji}
                    onClick={() => navigate(`/jobs/${p.id}`)}
                  />
                ))
              : <Empty />
          }
        </div>
      </div>

      {/* ── BottomNav (absolute bottom-0, fits inside MobileFrame's relative) ── */}
      <BottomNav />
    </div>
  )
}

function BannerCard({
  rank, title, sub, thumbColor, thumbEmoji, onClick,
}: {
  rank: number
  title: string
  sub: string
  thumbColor: string
  thumbEmoji: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full h-[88px] rounded-2xl overflow-hidden flex active:scale-[0.98] transition-transform shadow-sm"
    >
      {/* Left: colored thumbnail ~40% */}
      <div
        className="w-[42%] flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: thumbColor }}
      >
        <span className="text-5xl">{thumbEmoji}</span>
      </div>

      {/* Right: dark overlay with rank + title */}
      <div className="flex-1 bg-gray-800 flex flex-col justify-center px-3 relative overflow-hidden">
        {/* Subtle texture lines */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full h-px bg-white" style={{ marginTop: i * 14 }} />
          ))}
        </div>
        <p className="text-white text-[13px] font-bold leading-snug relative z-10 text-left">
          {rank}. {title}
        </p>
        <p className="text-gray-400 text-[11px] mt-0.5 truncate relative z-10 text-left">{sub}</p>
      </div>
    </button>
  )
}

function MapBg({ showRide, showJob }: { showRide: boolean; showJob: boolean }) {
  return (
    <div className="absolute inset-0 bg-[#e8f0e9] overflow-hidden">
      <svg width="100%" height="100%" className="opacity-60">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#c5d9c6" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect x="0" y="42%" width="100%" height="14" fill="#d4e4d5" rx="3" />
        <rect x="38%" y="0" width="14" height="100%" fill="#d4e4d5" rx="3" />
        <rect x="65%" y="0" width="9" height="100%" fill="#dce8dd" rx="3" />
        <rect x="0" y="68%" width="100%" height="9" fill="#dce8dd" rx="3" />
        <ellipse cx="25%" cy="60%" rx="60" ry="40" fill="#c8ddc9" opacity="0.7" />
        <ellipse cx="72%" cy="35%" rx="45" ry="30" fill="#c8ddc9" opacity="0.6" />
        <rect x="10%" y="20%" width="18" height="18" fill="#cdd8ce" rx="2" />
        <rect x="55%" y="55%" width="20" height="20" fill="#cdd8ce" rx="2" />
        <rect x="48%" y="25%" width="14" height="14" fill="#c8d4c9" rx="2" />
        <rect x="80%" y="72%" width="16" height="16" fill="#cdd8ce" rx="2" />
      </svg>

      {showRide && rideMarkers.map((m) => (
        <div key={m.id} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: m.x, top: m.y }}>
          <div className="bg-primary text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow-md whitespace-nowrap">
            🚗 {m.label}
          </div>
          <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-primary mx-auto" />
        </div>
      ))}

      {showJob && jobMarkers.map((m) => (
        <div key={m.id} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: m.x, top: m.y }}>
          <div className="bg-accent text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow-md whitespace-nowrap">
            💼 {m.label}
          </div>
          <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-accent mx-auto" />
        </div>
      ))}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg ring-4 ring-primary-200">
          <span className="text-white text-lg">📍</span>
        </div>
        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-primary -mt-0.5" />
      </div>
    </div>
  )
}

function Empty() {
  return (
    <div className="flex flex-col items-center py-10">
      <span className="text-3xl mb-2">🌿</span>
      <p className="text-gray-400 text-sm">해당 모집글이 없어요</p>
    </div>
  )
}
