"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import MessageBubble from "./MessageBubble";
import { useGetMessagesQuery } from "@/services/chatApi";

export default function ChatWindow() {
  const selectedUser = useSelector((state: RootState) => state.chat.selectedUser);
  const selectedChatRoomID = useSelector((state: RootState) => state.chat.roomId) || "";

  const currentUserEmail = localStorage.getItem("email") || "";

  const { data: messages, isLoading, isError } = useGetMessagesQuery(selectedChatRoomID, {
    // pollingInterval: 1000,
    skip: !selectedChatRoomID,
  });

  if (!selectedUser) {
    return (
      <div className="flex flex-1 items-center justify-center bg-gray-800 text-gray-400">
        Select a user from sidebar to start chatting
      </div>
    );
  }

  if (!selectedChatRoomID) {
    return (
      <div className="flex flex-1 items-center justify-center bg-gray-800 text-gray-400">
        No chat found with {selectedUser.name || selectedUser.email}
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-gray-800">
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {isLoading && <div className="text-gray-400 text-center">Loading messages...</div>}
        {isError && <div className="text-red-400 text-center">Failed to load messages</div>}
        {!isLoading && messages?.length === 0 && (
          <div className="text-gray-400 text-center">No messages yet</div>
        )}
        {messages
          ?.filter((msg) => !msg.deletedAt) // 👈 don't show deleted
          .map((msg) => (
            <MessageBubble
              key={msg.id}
              messageId={msg.id}
              roomID={selectedChatRoomID!}   // 👈 pass roomId
              from={msg.senderId === currentUserEmail ? "Me" : selectedUser.displayName || selectedUser.email}
              text={msg.text}
              time={new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              mine={msg.senderId === currentUserEmail}
            />
        ))}
      </div>
    </div>
  );
}
