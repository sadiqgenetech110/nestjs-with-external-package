"use client";
import ChatHeader from "./components/ChatHeader";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import ChatSidebar from "./components/ChatSidebar";

export default function ChatLayout() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <ChatSidebar />

      {/* Main chat area */}
      <div className="flex flex-col flex-1">
        <ChatHeader />
        <ChatWindow />
        <MessageInput />
      </div>
    </div>
  );
}
