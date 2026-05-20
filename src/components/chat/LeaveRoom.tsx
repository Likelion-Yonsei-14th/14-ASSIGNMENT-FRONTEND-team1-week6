type LeaveRoomProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function LeaveRoom({
  isOpen,
  onCancel,
  onConfirm,
}: LeaveRoomProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div className="w-[287px] rounded-[15px] bg-[rgba(34,34,34,0.83)] px-[27px] pb-[27px] pt-[33px]">
        <p className="text-[15px] font-normal leading-normal text-[#EFEFEF]">
          채팅방을 나가면 채팅목록 및 대화 내용이 삭제되고 복구할 수 없어요.
          <br />
          채팅방에서 나가시겠어요?
        </p>

        <div className="mt-[20px] flex gap-[24px]">
          <button
            type="button"
            onClick={onCancel}
            className="h-[53px] w-[116px] rounded-[22.5px] bg-[#D9D9D9] text-[15px]"
          >
            취소
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="h-[53px] w-[116px] rounded-[22.5px] bg-[#F73526] text-[15px] text-black"
          >
            네, 나갈래요.
          </button>
        </div>
      </div>
    </div>
  );
}