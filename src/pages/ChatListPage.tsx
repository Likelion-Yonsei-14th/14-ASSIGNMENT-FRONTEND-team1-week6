import { useState } from "react";
import ChatCategoryTabs from "../components/chat/ChatCategoryTabs";
import ChatRoomItem from "../components/chat/ChatRoomItem";
import SearchIcon from "../assets/Search.svg";
import SettingIcon from "../assets/Setting_line.svg"
import StatusBar from "../components/common/StatusBar";
import { useChatStore } from "../stores/chatStore";
import { useNavigate } from "react-router-dom";
import MobileFrame from "../components/common/MobileFrame";

type ChatCategory = "전체" | "일자리" | "라이드 쉐어";

export default function ChatListPage() {
    const chatRooms = useChatStore((state) => state.chatRooms);

    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] =
        useState<ChatCategory>("전체");

    const filteredRooms =
        selectedCategory === "전체"
            ? chatRooms
            : chatRooms.filter((room) => room.category === selectedCategory);

    return (
        <MobileFrame>
            <StatusBar />
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
                        description={room.route}
                        category={room.category === "라이드 쉐어" ? "ride" : "job"}
                        onClick={() => navigate(`/chat/${room.id}`)}
                    />
                ))}
            </section>
        </MobileFrame>
    );
}