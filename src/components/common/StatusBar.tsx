import Notch from "../../assets/Notch.svg";
import WifiIcon from "../../assets/Wifi.svg";
import BatteryIcon from "../../assets/_StatusBar-battery.svg";
import SignalIcon from "../../assets/Mobile Signal.svg";

export default function StatusBar() {
  return (
    <div className="relative h-[44px] w-full">
      <span className="absolute left-[27px] top-[15px] flex h-[21px] w-[54px] items-center justify-center text-[15px] font-semibold text-black">
        9:41
      </span>

      <img
        src={Notch}
        alt=""
        className="absolute left-1/2 top-0 h-[32px] w-[172px] -translate-x-1/2"
      />

      <div className="absolute right-[26.6px] top-[20px] flex h-[13px] items-center gap-[6px]">
        <img src={SignalIcon} alt="" className="h-[12px] w-[18px]" />
        <img src={WifiIcon} alt="" className="h-[11.83px] w-[17px]" />
        <img src={BatteryIcon} alt="" className="h-[13px] w-[27.4px]" />
      </div>
    </div>
  );
}
