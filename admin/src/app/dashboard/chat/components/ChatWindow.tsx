"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import MessageBubble from "./MessageBubble";

export default function ChatWindow() {
  const selectedUser = useSelector((state: RootState) => state.chat.selectedUser);

  if (!selectedUser) {
    return (
      <div className="flex flex-1 items-center justify-center bg-gray-800 text-gray-400">
        Select a user from sidebar to start chatting
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-gray-800">
      <div className="flex-1 p-4 overflow-y-auto">
        <MessageBubble from={selectedUser.name || "Unknown"} text="Here's the new office! 💙" time="11:46" />
        <MessageBubble from="Me" text="We've been looking for a design system..." time="12:56" mine />
      </div>
    </div>
  );
}
