import { IRootStore } from "..";

export interface Chats {
    chat_id: string;
    chat_name: string;
    created_at: string;

    setChatId: (value: string) => void;
    setChatName: (value: string) => void;
    setCreatedAt: (value: string) => void;
}

export interface ChatStoreType extends Chats {
    rootStore: IRootStore;
}

export interface ChatListStoreType {
    rootStore: IRootStore;
    updateChatsList: (chats: Chats[]) => void;
    getChatsList: (user_id: string) => Promise<void>;
    chat?: ChatListStoreType;
    chatsList: Chats[];
}

export interface ChatMessage {
    message_id: string;
    role: string;
    content: string;
    created_at: string;

    setMessageId: (value: string) => void;
    setRole: (value: string) => void;
    setContent: (value: string) => void; 
    setCreatedAt: (value: string) => void;
}

export interface ChatMessageStoreType extends ChatMessage {
    rootStore: IRootStore;
}

export interface ChatMessageListStoreType {
    rootStore: IRootStore;
    updateChatMessages: (messages: ChatMessage[]) => void;
    getChatMessages: (user_id: string, chat_id: string) => Promise<void>;
    messages: ChatMessage[];
}