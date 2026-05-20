import CommentIcon from "../../assets/comment.svg";

export default function AdminMessageCard() {
  return (
    <div className="flex items-start gap-[10px]">
      <div className="flex h-[43px] w-[43px] shrink-0 items-center justify-center rounded-full bg-[#D9D9D9] text-[13px] text-black">
        관리자
      </div>

      <div className="w-[180px] overflow-hidden rounded-[10px] border border-black bg-[#D9D9D9]">
        <div className="flex h-[80px] items-start justify-between bg-[#31FCB9] px-[12px] py-[8px]">
          <p className="text-[14px] font-normal leading-normal text-black">
            채팅이
            <br />
            시작되었어요
          </p>

          <img src={CommentIcon} alt="" className="mt-[26px] h-[24px] w-[24px]" />
        </div>

        <div className="px-[11px] pt-[8px] text-[11px] font-normal leading-normal tracking-[0.11px] text-black">
          희망하던 방 개설이 완료되었어요🥳 즐거운 라이드 쉐어링 문화를 위해,
          매너 있는 채팅 부탁드려요. 행복한 운행되세요!
        </div>

        <button
          type="button"
          className="mx-auto mb-[10px] mt-[10px] flex h-[27px] w-[121px] items-center justify-center rounded-[5px] border border-[#31FCB9] bg-[#69DFB7] text-[13px] font-normal text-white"
        >
          모임 정보 다시 확인
        </button>
      </div>
    </div>
  );
}