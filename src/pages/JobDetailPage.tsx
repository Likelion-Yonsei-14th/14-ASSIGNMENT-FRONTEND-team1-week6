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
      <div className="h-full flex flex-col items-center justify-center bg-white">
        <p className="text-gray-400 text-sm">모집글을 찾을 수 없어요</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-sm font-semibold"
          style={{ color: '#2D6A4F' }}
        >
          돌아가기
        </button>
      </div>
    )
  }

  const payLabel =
    post.payUnit === '월'
      ? `월급 ${(post.pay / 10000).toLocaleString()}만원`
      : post.payUnit === '일'
      ? `일급 ${post.pay.toLocaleString()}원`
      : post.payUnit === '시간'
      ? `시급 ${post.pay.toLocaleString()}원`
      : `건당 ${post.pay.toLocaleString()}원`

  const categoryLabel = post.tags
    .filter((t) => t !== '정기' && t !== '비정기')
    .join('/')

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto pb-[84px]">

        {/* ── Hero header (includes StatusBar area) ── */}
        <div className="relative w-full" style={{ height: 44 + 111 }}>
          <img
            src="/job-detail-hero.png"
            alt=""
            className="w-full h-full object-cover"
          />

          {/* StatusBar overlaid on image */}
          <div className="absolute top-0 left-0 right-0">
            <StatusBar />
          </div>

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute left-3 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ top: 44 + 12, backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-4 h-4">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>

        {/* ── Content ── */}
        <div className="px-5 pt-5">

          {/* Title */}
          <h1
            className="mb-1.5"
            style={{
              color: '#000',
              fontFamily: 'Inter',
              fontSize: 24,
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: 'normal',
            }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <p
            className="mb-6"
            style={{
              color: '#585858',
              fontFamily: 'Inter',
              fontSize: 15,
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
            }}
          >
            {post.author.neighborhood}
            <span className="mx-1.5">/</span>
            {post.createdAt}
            <span className="mx-1.5">/</span>
            후기 {post.author.reviewCount}개
          </p>

          {/* Info rows */}
          <div className="space-y-4 pb-5 mb-5">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="6" width="18" height="12" rx="2" stroke="#33363F" strokeWidth="2"/>
                    <path d="M6 9H8" stroke="#33363F" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M16 15H18" stroke="#33363F" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="2" stroke="#33363F" strokeWidth="2"/>
                  </svg>
                ),
                text: payLabel,
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="6" width="18" height="15" rx="2" stroke="#33363F" strokeWidth="2"/>
                    <path d="M3 10C3 8.11438 3 7.17157 3.58579 6.58579C4.17157 6 5.11438 6 7 6H17C18.8856 6 19.8284 6 20.4142 6.58579C21 7.17157 21 8.11438 21 10H3Z" fill="#33363F"/>
                    <path d="M7 3L7 6" stroke="#33363F" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M17 3L17 6" stroke="#33363F" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
                text: post.date,
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="14" r="8" stroke="#33363F" strokeWidth="2"/>
                    <path d="M12 14L12 11" stroke="#33363F" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M17.5 7.5L19 6" stroke="#33363F" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M10.0681 2.37059C10.1821 2.26427 10.4332 2.17033 10.7825 2.10332C11.1318 2.03632 11.5597 2 12 2C12.4403 2 12.8682 2.03632 13.2175 2.10332C13.5668 2.17033 13.8179 2.26427 13.9319 2.37059" stroke="#33363F" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
                text: post.time,
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#33363F" strokeWidth="2"/>
                    <path d="M12.5 7.5C12.5 7.77614 12.2761 8 12 8C11.7239 8 11.5 7.77614 11.5 7.5C11.5 7.22386 11.7239 7 12 7C12.2761 7 12.5 7.22386 12.5 7.5Z" fill="#33363F" stroke="#33363F"/>
                    <path d="M12 17V10" stroke="#33363F" strokeWidth="2"/>
                  </svg>
                ),
                text: categoryLabel,
              },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-3.5">
                <div className="flex-shrink-0">
                  {row.icon}
                </div>
                <span style={{ color: '#000', fontFamily: 'Inter', fontSize: 16, fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal' }}>{row.text}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <p
            className="whitespace-pre-line mb-5"
            style={{
              width: 296,
              color: '#000',
              fontFamily: 'Inter',
              fontSize: 16,
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
            }}
          >
            {post.description}
          </p>
          <div style={{ width: 351.006, height: 1, background: '#ECECEC', marginBottom: 20 }} />

          {/* Applicants */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="3" stroke="#33363F" strokeWidth="2" strokeLinecap="round"/>
                <path d="M15.2679 8C15.5332 7.54063 15.97 7.20543 16.4824 7.06815C16.9947 6.93086 17.5406 7.00273 18 7.26795C18.4594 7.53317 18.7946 7.97 18.9319 8.48236C19.0691 8.99472 18.9973 9.54063 18.7321 10C18.4668 10.4594 18.03 10.7946 17.5176 10.9319C17.0053 11.0691 16.4594 10.9973 16 10.7321C15.5406 10.4668 15.2054 10.03 15.0681 9.51764C14.9309 9.00528 15.0027 8.45937 15.2679 8L15.2679 8Z" stroke="#33363F" strokeWidth="2"/>
                <path d="M5.26795 8C5.53317 7.54063 5.97 7.20543 6.48236 7.06815C6.99472 6.93086 7.54063 7.00273 8 7.26795C8.45937 7.53317 8.79457 7.97 8.93185 8.48236C9.06914 8.99472 8.99727 9.54063 8.73205 10C8.46683 10.4594 8.03 10.7946 7.51764 10.9319C7.00528 11.0691 6.45937 10.9973 6 10.7321C5.54063 10.4668 5.20543 10.03 5.06815 9.51764C4.93086 9.00528 5.00273 8.45937 5.26795 8L5.26795 8Z" stroke="#33363F" strokeWidth="2"/>
                <path d="M16.9996 14V13H16.9995L16.9996 14ZM20.7203 16.9043L21.6628 16.5702L21.6627 16.57L20.7203 16.9043ZM16.8814 18L15.9011 18.1974L16.0627 19H16.8814V18ZM14.7828 14.7129L14.1779 13.9165L13.0222 14.7943L14.2541 15.5617L14.7828 14.7129ZM16.9996 14V15C18.6413 15 19.4028 16.1814 19.7778 17.2386L20.7203 16.9043L21.6627 16.57C21.1977 15.2588 19.948 13 16.9996 13V14ZM20.7203 16.9043L19.7777 17.2384C19.7707 17.2184 19.7642 17.1807 19.7725 17.135C19.7804 17.0917 19.7983 17.059 19.8152 17.038C19.8472 16.9981 19.8736 17 19.8668 17V18V19C21.0118 19 22.1414 17.9204 21.6628 16.5702L20.7203 16.9043ZM19.8668 18V17H16.8814V18V19H19.8668V18ZM16.8814 18L17.8617 17.8026C17.6438 16.7205 17.0374 14.9392 15.3115 13.8641L14.7828 14.7129L14.2541 15.5617C15.292 16.2083 15.7271 17.3334 15.9011 18.1974L16.8814 18ZM14.7828 14.7129L15.3876 15.5092C15.7741 15.2157 16.2845 15.0001 16.9997 15L16.9996 14L16.9995 13C15.8353 13.0001 14.9025 13.3662 14.1779 13.9165L14.7828 14.7129Z" fill="#33363F"/>
                <path d="M7.00031 14L7.00037 13H7.00031V14ZM9.21613 14.7129L9.74503 15.5616L10.9768 14.7939L9.82076 13.9164L9.21613 14.7129ZM7.11847 18V19H7.93714L8.09878 18.1974L7.11847 18ZM3.2796 16.9043L2.33713 16.57L2.33706 16.5702L3.2796 16.9043ZM7.00031 14L7.00024 15C7.71464 15 8.22457 15.2157 8.6115 15.5094L9.21613 14.7129L9.82076 13.9164C9.09674 13.3668 8.16469 13.0001 7.00037 13L7.00031 14ZM9.21613 14.7129L8.68722 13.8642C6.96191 14.9394 6.35598 16.721 6.13815 17.8026L7.11847 18L8.09878 18.1974C8.27283 17.3333 8.70759 16.2081 9.74503 15.5616L9.21613 14.7129ZM7.11847 18V17H4.13312V18V19H7.11847V18ZM4.13312 18V17C4.1263 17 4.15269 16.9981 4.18475 17.038C4.20159 17.0589 4.21946 17.0917 4.22736 17.135C4.23571 17.1807 4.22924 17.2184 4.22215 17.2384L3.2796 16.9043L2.33706 16.5702C1.85851 17.9203 2.98801 19 4.13312 19V18ZM3.2796 16.9043L4.22207 17.2386C4.59707 16.1814 5.35863 15 7.00031 15V14V13C4.05188 13 2.80223 15.2588 2.33713 16.57L3.2796 16.9043Z" fill="#33363F"/>
                <path d="M12 14C15.5715 14 16.5919 16.5512 16.8834 18.0089C16.9917 18.5504 16.5523 19 16 19H8C7.44772 19 7.00829 18.5504 7.11659 18.0089C7.4081 16.5512 8.42846 14 12 14Z" stroke="#33363F" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <p style={{ color: '#000', fontFamily: 'Inter', fontSize: 18, fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal' }}>
                지원자{' '}
                <span style={{ color: '#000' }}>{post.applicants.length}명</span>
              </p>
            </div>
            <ApplicantMap />
          </div>

        </div>
      </div>

      {/* Bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-3 flex items-center gap-3">
        <button
          onClick={() => setLiked((v) => !v)}
          className="flex-shrink-0"
          style={{ display: 'flex', alignItems: 'flex-start', gap: 2.005 }}
        >
          <svg
            viewBox="0 0 24 24"
            fill={liked ? '#35FCA9' : 'none'}
            stroke={liked ? '#35FCA9' : '#B1AFAF'}
            strokeWidth="1.8"
            className="w-7 h-7"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
        <button
          style={{
            display: 'flex',
            width: 146,
            height: 53,
            padding: '15px 36px 14px 36px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            borderRadius: 10,
            background: '#F4F4F4',
          }}
        >
          <span style={{ color: '#000', textAlign: 'center', fontFamily: 'Inter', fontSize: 20, fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal' }}>전화문의</span>
        </button>
        <button
          style={{
            display: 'flex',
            width: 146,
            height: 53,
            padding: '15px 36px 14px 36px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            backgroundColor: '#35FCA9',
            borderRadius: 10,
          }}
        >
          <span style={{ color: '#000', textAlign: 'center', fontFamily: 'Inter', fontSize: 20, fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal' }}>지원하기</span>
        </button>
      </div>
    </div>
  )
}

/* Map with scattered applicant pins — approximating the Figma detail page map */
function ApplicantMap() {
  return (
    <div className="w-full h-44 rounded-2xl overflow-hidden relative">
      <img src="/map-detail.png" alt="" className="w-full h-full object-cover" />
    </div>
  )
}
