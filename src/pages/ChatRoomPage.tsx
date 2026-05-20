import { useState } from "react";
import { useParams } from "react-router-dom";
import { useChatStore } from "../stores/chatStore";
import { useNavigate } from "react-router-dom";
import ChatRoomHeader from "../components/chat/ChatRoomHeader";
import MessageBubble from "../components/chat/MessageBubble";
import ChatInputBar from "../components/chat/ChatInputBar";
import AdminMessageCard from "../components/chat/AdminMessageCard";
import ChatActionSheet from "../components/chat/ChatActionSheet";
import MobileFrame from "../components/common/MobileFrame";
import StatusBar from "../components/common/StatusBar";
import LeaveRoom from "../components/chat/LeaveRoom";

type Message = {
    id: number;
    sender: "me" | "other" | "admin";
    content: string;
    profileType?: "host" | "admin" | "user";
};

export default function ChatRoomPage() {
const chatRooms = useChatStore((state) => state.chatRooms);
const removeChatRoom = useChatStore((state) => state.removeChatRoom);

const navigate = useNavigate();
const [isLeaveOpen, setIsLeaveOpen] = useState(false);

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
        <MobileFrame>
            <StatusBar />
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
                onLeaveRoom={() => {
                    setIsActionSheetOpen(false);
                    setIsLeaveOpen(true);
                }}
            />
            <LeaveRoom 
            isOpen={isLeaveOpen}
            onCancel={() => setIsLeaveOpen(false)}
            onConfirm={() => {
                removeChatRoom(room.id);
                navigate("/");
            }}
            />
        </MobileFrame>
    );
}