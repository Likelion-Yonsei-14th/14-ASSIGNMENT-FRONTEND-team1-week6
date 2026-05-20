import BackIcon from "../../assets/Expand_left_light.svg";
import PhoneIcon from "../../assets/Phone_duotone_line.svg";
import MoreIcon from "../../assets/방 상세정보 버튼.svg";
import GroupIcon from "../../assets/Group_light.svg";
import { useNavigate } from "react-router-dom";

type ChatRoomHeaderProps = {
  room: {
    title: string;
    route: string;
    schedule: string;
    members: string;
  };
};

export default function ChatRoomHeader({
    room,
}: ChatRoomHeaderProps) {
    const navigate = useNavigate();
  return (
    <header className="h-[172px] w-[390px] bg-white shadow-[0_4px_2px_rgba(0,0,0,0.05)]">
      <div className="relative h-[119px]">
        <button onClick={() => navigate(-1)} className="absolute left-[9px] top-[10px]">
          <img src={BackIcon} alt="뒤로가기" className="h-[43px] w-[43px]" />
        </button>

        <h1 className="pt-[30px] text-center text-[30px] font-normal text-black">
          {room.title}
        </h1>

        <button className="absolute right-[60px] top-[17px]">
          <img src={PhoneIcon} alt="전화" className="h-[36px] w-[36px]" />
        </button>

        <button className="absolute right-[26px] top-[21px]">
          <img src={MoreIcon} alt="상세정보" className="h-[28px] w-[4px]" />
        </button>

        <p className="mt-[8px] text-center text-[18px] font-normal leading-normal text-black">
          {room.route}
          <br />
          {room.schedule}
        </p>
      </div>

      <div className="flex items-center gap-[10px] pl-[25px]">
        <img src={GroupIcon} alt="" className="h-[43px] w-[43px]" />
        <span className="text-[14px] font-normal text-black">
          {room.members}
        </span>
      </div>
    </header>
  );
}