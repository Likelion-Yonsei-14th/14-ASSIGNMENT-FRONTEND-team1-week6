import HandleIcon from "../../assets/Line 3.svg";
import MannerIcon from "../../assets/thumb_up.svg";
import ReportIcon from "../../assets/Sad_alt_2.svg";
import ShieldIcon from "../../assets/Chield_check.svg";
import InviteIcon from "../../assets/group_add.svg";
import SearchIcon from "../../assets/Search.svg";
import AlarmOffIcon from "../../assets/sound_mute.svg";
import ExitIcon from "../../assets/Sign_out_squre.svg";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function ActionItem({
  icon,
  label,
}: {
  icon: string;
  label: string;
}) {
  return (
    <button className="flex h-[24px] items-center gap-[20px] text-left">
      <img src={icon} alt="" className="h-[24px] w-[24px]" />
      <span className="text-[14px] font-medium text-black">{label}</span>
    </button>
  );
}

export default function ChatActionSheet({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-end bg-black/40">
      <div className="w-full rounded-t-[20px] bg-[#D9D9D9] px-[20px] pb-[15px] pt-[15px]">
        <img src={HandleIcon} alt="" className="mx-auto mb-[20px] w-[50px]" />

        <section className="flex h-[219px] flex-col gap-[24px] rounded-[20px] bg-[#E8E8E8] px-[20px] pb-[10px] pt-[20px]">
          <ActionItem icon={MannerIcon} label="매너 평가하기" />
          <ActionItem icon={ReportIcon} label="신고하기" />
          <ActionItem icon={ShieldIcon} label="면허증, 자동차 보험 조회하기" />
          <ActionItem icon={InviteIcon} label="아는 사용자 초대하기" />
        </section>

        <section className="mt-[15px] flex flex-col gap-[24px] rounded-[20px] bg-[#E8E8E8] px-[26px] py-[25px]">
          <ActionItem icon={SearchIcon} label="검색하기" />
          <ActionItem icon={AlarmOffIcon} label="알람끄기" />
          <ActionItem icon={ExitIcon} label="방 나가기" />
        </section>

        <button
          onClick={onClose}
          className="mt-[15px] h-[60px] w-full rounded-[10px] bg-[#E8E8E8] text-[14px] font-medium"
        >
          닫기
        </button>
      </div>
    </div>
  );
}