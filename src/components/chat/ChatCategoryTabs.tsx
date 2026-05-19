import ChatCategoryButton from "./ChatCategoryButton";

type ChatCategory = "전체" | "일자리" | "라이드 쉐어";

type ChatCategoryTabsProps = {
  selected: ChatCategory;
  onSelect: (category: ChatCategory) => void;
};

const categories: ChatCategory[] = ["전체", "라이드 쉐어", "일자리"];

export default function ChatCategoryTabs({
  selected,
  onSelect,
}: ChatCategoryTabsProps) {
  return (
    <div className="flex gap-[9px]">
      {categories.map((category) => (
        <ChatCategoryButton
          key={category}
          label={category}
          selected={selected === category}
          onClick={() => onSelect(category)}
        />
      ))}
    </div>
  );
}