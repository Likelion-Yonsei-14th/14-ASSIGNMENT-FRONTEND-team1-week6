export default function StatusBar({ transparent = false }: { transparent?: boolean }) {
  return (
    <div className={`relative h-[44px] w-full ${transparent ? 'bg-transparent' : 'bg-white'}`}>
      {/* Notch — 172px wide, 32px tall */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[172px] h-[32px] bg-black rounded-b-[20px]" />

      {/* Time — left side, top:14px per Figma */}
      <span
        className="absolute text-black font-semibold text-center"
        style={{
          left: 'calc(16.67% - 11px)',
          top: 14,
          transform: 'translateX(-50%)',
          width: 54,
          fontSize: 16,
          lineHeight: '21px',
          letterSpacing: '-0.32px',
          fontFamily: "'SF Pro Text', -apple-system, sans-serif",
        }}
      >
        9:41
      </span>

      {/* Right icons — top:19px per Figma */}
      <div className="absolute flex items-center gap-[6px]" style={{ right: 16, top: 19 }}>
        {/* Mobile signal (18×12) */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0"   y="8"   width="3" height="4"   rx="0.8" fill="black" />
          <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.8" fill="black" />
          <rect x="9"   y="3"   width="3" height="9"   rx="0.8" fill="black" />
          <rect x="13.5" y="0"  width="3" height="12"  rx="0.8" fill="black" />
        </svg>

        {/* WiFi (17×11.834) — Figma asset */}
        <img
          alt=""
          src="https://www.figma.com/api/mcp/asset/b1047872-592a-4fc6-82eb-d740a918ec01"
          style={{ width: 17, height: 11.834, display: 'block' }}
        />

        {/* Battery 100% (27.4×13) */}
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="black" strokeOpacity="0.35" />
          <rect x="2"   y="2"   width="19" height="9"  rx="2"   fill="black" />
          <path d="M25 4.5v4a2 2 0 000-4z" fill="black" fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  )
}
