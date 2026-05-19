import { useState } from "react";
import ChatCategoryButton from "./ChatCategoryButton";

type ChatCategory = "전체" | "일자리" | "라이드 쉐어";

const categories: ChatCategory[] = ["전체", "일자리", "라이드 쉐어"];

export default function ChatCategoryTabs() {
  const [selected, setSelected] = useState<ChatCategory>("전체");

  return (
    <div className="flex gap-[8px]">
      {categories.map((category) => (
        <ChatCategoryButton
          key={category}
          label={category}
          selected={selected === category}
          onClick={() => setSelected(category)}
        />
      ))}
    </div>
  );
}