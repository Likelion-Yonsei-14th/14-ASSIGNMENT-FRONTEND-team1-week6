import { create } from "zustand";
import { chatRooms as initialRooms } from "../data/chatRooms";

type ChatRoom = {
  id: number;
  title: string;
  route: string;
  schedule: string;
  members: string;
  category: string;
};

type ChatStore = {
  chatRooms: ChatRoom[];

  removeChatRoom: (id: number) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  chatRooms: initialRooms,

  removeChatRoom: (id) =>
    set((state) => ({
      chatRooms: state.chatRooms.filter((room) => room.id !== id),
    })),
}));