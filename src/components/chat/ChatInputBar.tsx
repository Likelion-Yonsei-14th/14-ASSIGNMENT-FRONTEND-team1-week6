import SendIcon from "../../assets/Send_duotone_line.svg";
import PlusIcon from "../../assets/Add_square_duotone_line.svg";

type ChatInputBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
};

export default function ChatInputBar({
  value,
  onChange,
  onSend,
}: ChatInputBarProps) {
  return (
<form
  onSubmit={(e) => {
    e.preventDefault();
    onSend();
  }}
  className="absolute bottom-[24px] left-1/2 flex w-[330px] -translate-x-1/2 items-center gap-[12px]"
>
      <button type="button" >
        <img 
        src={PlusIcon}
        alt="상세"
        className="h-[36px] w-[36px]"
        />
      </button>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="메시지 보내기"
        className="h-[32px] flex-1 rounded-full bg-[#D9D9D9] px-[18px] text-[14px] outline-none"
      />

<button
  type="submit"
  className="flex h-[32px] w-[32px] items-center justify-center"
>
  <img
    src={SendIcon}
    alt="전송"
    className="h-[24px] w-[24px]"
  />
</button>
    </form>
  );
}