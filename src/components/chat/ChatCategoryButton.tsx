type ChatCategoryButtonProps = {
  label: "전체" | "일자리" | "라이드 쉐어";
  selected?: boolean;
  onClick?: () => void;
};

const sizeClass = {
  전체: "w-[85px] h-[52px] px-[21px] py-[12px]",
  일자리: "w-[106px] h-[52px] px-[21px] py-[12px]",
  "라이드 쉐어": "w-[149px] h-[52px] pt-[14px] pr-[16px] pb-[10px] pl-[21px]",
};

export default function ChatCategoryButton({
  label,
  selected = false,
  onClick,
}: ChatCategoryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        ${sizeClass[label]}
  flex items-center justify-center
  rounded-[20px]
  border
  text-[23px]
  font-medium
  leading-normal
  whitespace-nowrap
        ${
          selected
            ? "bg-black text-white border-[#3A3A3A]"
            : "bg-white text-black border-[#C5C5C5]"
        }
      `}
    >
      {label}
    </button>
  );
}