import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/common/StatusBar'
import BottomNav from '../components/BottomNav'
import { ridePosts, jobPosts } from '../data/mockData'
import type { RidePost, JobPost } from '../types'
import firstCardImage from '../assets/home-card-first.png'

type Tab = 'ride' | 'job'
type Chip = 'regular' | 'irregular' | 'bus' | null

export default function HomePage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('job')
  const [chip, setChip] = useState<Chip>(null)

  const handleChip = (c: Chip) => {
    setChip((prev) => (prev === c ? null : c))
  }

  return (
    <div className="relative h-full overflow-hidden bg-[#e8e0cf]">
      {/* Map placeholder */}
      <div
        className="absolute left-0 right-0 flex items-center justify-center"
        style={{ top: 0, bottom: 368, backgroundColor: '#D9D9D9', paddingTop: 140 }}
      >
        <span style={{ fontSize: 20, color: '#888' }}>지도</span>
      </div>

      {/* Top overlay: StatusBar + Search */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <div className="bg-white">
          <StatusBar />
        </div>

        {/* Search bar */}
        <div className="px-4 pt-2 pb-1 bg-white">
          <div className="h-10 bg-[#F0F0F0] rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-base text-gray-500 font-normal">장소 검색창</span>
          </div>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 px-4 py-2">
          {([
            { key: 'regular', label: '정기 라이드' },
            { key: 'irregular', label: '비정기 라이드' },
            { key: 'bus', label: '버스 정보' },
          ] as { key: Chip; label: string }[]).map((c) => (
            <button
              key={c.key}
              onClick={() => handleChip(c.key)}
              className="flex items-center justify-center transition-colors shadow-sm"
              style={{
                width: '112px',
                height: '28px',
                borderRadius: '5px',
                backgroundColor: chip === c.key ? '#000000' : '#F4F4F4',
                color: chip === c.key ? '#fff' : '#000000',
                fontFamily: 'Inter',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom sheet */}
      <div
        className="absolute left-0 right-0 z-30"
        style={{
          bottom: 0,
          height: 368,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 17,
          padding: '24px 45px 71px 25px',
          backgroundColor: '#E6E6E6',
          borderRadius: '10px',
          boxShadow: 'inset 0 4px 10px 0 rgba(0, 0, 0, 0.10)',
        }}
      >
        {/* Drag handle — absolute per Figma, top:11px center */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 11 }}>
          <div className="w-[50px] h-1 bg-gray-400 rounded-full" />
        </div>

        {/* Tabs */}
        <div
          className="flex-shrink-0 flex items-center justify-evenly"
          style={{
            width: 301,
            height: 53,
            borderRadius: 10,
            backgroundColor: '#D9D9D9',
          }}
        >
          {([
            { value: 'ride', label: '라이드 쉐어' },
            { value: 'job', label: '일자리' },
          ] as { value: Tab; label: string }[]).map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className="transition-all"
              style={{
                display: 'flex',
                width: 134,
                height: 42,
                padding: '9px 39px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
                borderRadius: 10,
                backgroundColor: tab === t.value ? '#F4F4F4' : 'transparent',
                color: '#000000',
                fontFamily: 'Inter',
                fontSize: 20,
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
                whiteSpace: 'nowrap',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* TOP20 header */}
        <p
          className="w-full flex-shrink-0 text-right"
          style={{
            color: '#000',
            fontFamily: 'Inter',
            fontSize: 20,
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
          }}
        >
          지금 핫한 모집글{' '}
          <span
            style={{
              color: '#69DFB7',
              fontFamily: 'Inter',
              fontSize: 20,
              fontStyle: 'normal',
              fontWeight: 900,
              lineHeight: 'normal',
            }}
          >
            TOP20
          </span>
        </p>

        {/* Card list */}
        <div className="w-full flex-1 overflow-y-auto space-y-3">
          {tab === 'ride'
            ? ridePosts.map((p, i) => (
                <RideCard
                  key={p.id}
                  post={p}
                  rank={i + 1}
                  onClick={() => navigate(`/rides/${p.id}`)}
                />
              ))
            : jobPosts.map((p, i) => (
                <JobCard
                  key={p.id}
                  post={p}
                  rank={i + 1}
                  onClick={() => navigate(`/jobs/${p.id}`)}
                />
              ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

function RideCard({ post: _post, rank, onClick }: { post: RidePost; rank: number; onClick: () => void }) {
  if (rank > 1) {
    return (
      <button
        onClick={onClick}
        style={{ width: 308, height: 73, borderRadius: 0, backgroundColor: '#D9D9D9', display: 'block', flexShrink: 0 }}
      />
    )
  }
  return (
    <button
      onClick={onClick}
      className="overflow-hidden relative active:scale-[0.98] transition-transform"
      style={{ width: 308, height: 73, borderRadius: 0, flexShrink: 0 }}
    >
      <img src={firstCardImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <span
        className="absolute inset-0 flex items-start justify-end px-4 pt-3"
        style={{
          color: '#E3E3E3',
          fontFamily: 'Inter',
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 'normal',
        }}
      >
        1. 다로리 카페 알바
      </span>
    </button>
  )
}

function JobCard({ post: _post, rank, onClick }: { post: JobPost; rank: number; onClick: () => void }) {
  if (rank > 1) {
    return (
      <button
        onClick={onClick}
        style={{ width: 308, height: 73, borderRadius: 0, backgroundColor: '#D9D9D9', display: 'block', flexShrink: 0 }}
      />
    )
  }
  return (
    <button
      onClick={onClick}
      className="overflow-hidden relative active:scale-[0.98] transition-transform"
      style={{ width: 308, height: 73, borderRadius: 0, flexShrink: 0 }}
    >
      <img src={firstCardImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <span
        className="absolute inset-0 flex items-start justify-end px-4 pt-3"
        style={{
          color: '#E3E3E3',
          fontFamily: 'Inter',
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 'normal',
        }}
      >
        1. 다로리 카페 알바
      </span>
    </button>
  )
}

