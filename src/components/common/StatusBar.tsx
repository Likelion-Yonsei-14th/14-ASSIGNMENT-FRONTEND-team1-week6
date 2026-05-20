/* Figma spec:
   Dark Mode=False | Dynamic Island=False | Time="9:41"
   Battery Charge=100% | Charging=False | Percentage=False
*/
export default function StatusBar() {
  return (
    <div className="relative h-[44px] w-full bg-white">
      {/* Time — left */}
      <span className="absolute left-[27px] top-1/2 -translate-y-1/2 text-[15px] font-semibold text-black leading-none">
        9:41
      </span>

      {/* Notch — center (non-Dynamic Island, standard pill notch) */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[126px] h-[34px] bg-black rounded-b-[20px]" />

      {/* Right icons: signal + wifi + battery */}
      <div className="absolute right-[16px] top-1/2 -translate-y-1/2 flex items-center gap-[6px]">

        {/* Mobile signal — 4 bars */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0"  y="8"  width="3" height="4"  rx="0.8" fill="black" />
          <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.8" fill="black" />
          <rect x="9"  y="3"  width="3" height="9"  rx="0.8" fill="black" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.8" fill="black" />
        </svg>

        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5a1.2 1.2 0 110 2.4A1.2 1.2 0 018 9.5z" fill="black" />
          <path d="M4.6 7.1a4.8 4.8 0 016.8 0" stroke="black" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M1.8 4.3a8.2 8.2 0 0112.4 0" stroke="black" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M0 1.7A11.3 11.3 0 0116 1.7" stroke="black" strokeWidth="1.4" strokeLinecap="round" />
        </svg>

        {/* Battery — 100%, no percentage, no charging bolt */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          {/* Body */}
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="black" strokeOpacity="0.35" />
          {/* Fill — 100% */}
          <rect x="2" y="2" width="17.5" height="8" rx="2" fill="black" />
          {/* Terminal nub */}
          <path d="M23 4v4a2 2 0 000-4z" fill="black" fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  )
}
