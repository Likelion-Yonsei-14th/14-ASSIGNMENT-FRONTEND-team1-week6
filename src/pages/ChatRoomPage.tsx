import { useState } from "react";
import { useParams } from "react-router-dom";
import { chatRooms } from "../data/chatRooms";
import ChatRoomHeader from "../components/chat/ChatRoomHeader";
import MessageBubble from "../components/chat/MessageBubble";
import ChatInputBar from "../components/chat/ChatInputBar";
import AdminMessageCard from "../components/chat/AdminMessageCard";
import ChatActionSheet from "../components/chat/ChatActionSheet";

type Message = {
    id: number;
    sender: "me" | "other" | "admin";
    content: string;
    profileType?: "host" | "admin" | "user";
};

export default function ChatRoomPage() {
    const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);

    const { chatId } = useParams();

    const room = chatRooms.find((room) => room.id === Number(chatId));

    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            sender: "other",
            content: "안녕하세요! 저희 월요일, 수요일 7시에 어디서 만나서 출발할까요?",
            profileType: "host",
        },
    ]);
    const [inputValue, setInputValue] = useState("");

    const handleSendMessage = () => {
        if (inputValue.trim() === "") return;

        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                sender: "me",
                content: inputValue,
                profileType: "user",
            },
        ]);

        setInputValue("");
    };

    if (!room) {
        return <div>채팅방이 없습니다.</div>;
    }

    return (
        <main className="relative mx-auto min-h-screen w-[390px] bg-white">
            <ChatRoomHeader
                room={room}
                onOpenActionSheet={() => setIsActionSheetOpen(true)}
            />

            <section className="flex flex-col gap-[12px] px-[24px] pt-[40px] pb-[90px]">
                <AdminMessageCard />

                {messages.map((message, index) => {
                    const prevMessage = messages[index - 1];

                    const isFirstInGroup =
                        !prevMessage || prevMessage.sender !== message.sender;

                    return (
                        <MessageBubble
                            key={message.id}
                            type={message.sender}
                            message={message.content}
                            profileType={message.profileType}
                            showAvatar={isFirstInGroup}
                        />
                    );
                })}
            </section>
            <ChatInputBar
                value={inputValue}
                onChange={setInputValue}
                onSend={handleSendMessage}
            />
            <ChatActionSheet
                isOpen={isActionSheetOpen}
                onClose={() => setIsActionSheetOpen(false)}
            />
        </main>
    );
}