import { useState } from "react";
import ChatCategoryTabs from "../components/chat/ChatCategoryTabs";
import ChatRoomItem from "../components/chat/ChatRoomItem";
import SearchIcon from "../assets/Search.svg";
import SettingIcon from "../assets/Setting_line.svg"

type ChatCategory = "전체" | "일자리" | "라이드 쉐어";

const chatRooms = [
    {
        id: 1,
        title: "부릉팟",
        description: "다산 1동 → 범어 1동",
        category: "라이드 쉐어",
    },
    {
        id: 2,
        title: "다로리 카페 알바",
        description: "다로리엔",
        category: "일자리",
    },
    {
        id: 3,
        title: "대구 출퇴근팟",
        description: "청도군 청도읍 거연리 → 대구 남구 3동",
        category: "라이드 쉐어",
    },
    {
        id: 4,
        title: "청도태권도 픽업팟",
        description: "화양읍 다로리 → 청도읍 월곡리",
        category: "라이드 쉐어",
    },
] as const;

export default function ChatListPage() {
    const [selectedCategory, setSelectedCategory] =
        useState<ChatCategory>("전체");

    const filteredRooms =
        selectedCategory === "전체"
            ? chatRooms
            : chatRooms.filter((room) => room.category === selectedCategory);

    return (
        <main className="mx-auto min-h-screen w-[390px] bg-white px-[24px] pt-[48px]">
            <div className="mb-[24px] flex items-center justify-between">
                <h1 className="text-[26px] font-bold text-black">채팅</h1>

                <div className="flex items-center gap-[28px]">
                    <button type="button" aria-label="검색">
                        <img src={SearchIcon} alt="" className="h-[34.56px] w-[34.56px]" />
                    </button>

                    <button type="button" aria-label="설정">
                        <img src={SettingIcon} alt="" className="h-[28.8px] w-[28.8px]" />
                    </button>
                </div>
            </div>

            <ChatCategoryTabs
                selected={selectedCategory}
                onSelect={setSelectedCategory}
            />

            <section className="mt-[32px] flex flex-col gap-[22px]">
                {filteredRooms.map((room) => (
                    <ChatRoomItem
                        key={room.id}
                        title={room.title}
                        description={room.description}
                        category={room.category === "라이드 쉐어" ? "ride" : "job"}
                    />
                ))}
            </section>
        </main>
    );
}