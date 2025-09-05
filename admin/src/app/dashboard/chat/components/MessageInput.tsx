"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";   // ⬅️ import AppDispatch
import { chatApi, useSendMessageMutation } from "../../../../services/chatApi";
import socket from "../../../../services/socket";


export default function MessageInput() {
  const [msg, setMsg] = useState("");
  const selectedUser = useSelector((state: RootState) => state.chat.selectedUser);
  const selectedChatRoomID = useSelector((state: RootState) => state.chat.roomId);
  const currentUserEmail = localStorage.getItem("email") || "";

  const [sendNewMessage] = useSendMessageMutation();
  const dispatch = useDispatch<AppDispatch>();  // ⬅️ use typed dispatch

  const sendMessage = async () => {
    if (!msg.trim() || !selectedUser) return;

    const newMessage = {
      id: Date.now().toString(),              // temporary id
      roomID: selectedChatRoomID || "",
      senderId: currentUserEmail,
      recipientId: selectedUser.email,
      text: msg,
      type: "text",
      createdAt: Date.now(),
    };

    // ✅ Optimistic update
    dispatch(
      chatApi.util.updateQueryData("getMessages", selectedChatRoomID!, (draft: any) => {
        draft.push(newMessage);
      })
    );

    await sendNewMessage({
        roomID: newMessage.roomID,
        senderId: newMessage.senderId,
        recipientId: newMessage.recipientId,
        text: newMessage.text,
        type: "text",   // hardcode it
      });


        socket.emit("chat", {
          roomID: newMessage.roomID,
          senderId: newMessage.senderId,
          recipientId: newMessage.recipientId,
          text: newMessage.text,
          createdAt: newMessage.createdAt,
        });

    setMsg("");
  };

  return (
    <div className="p-3 border-t border-gray-700 bg-gray-900 flex gap-2">
      <input
        type="text"
        className="flex-1 bg-gray-800 text-white p-2 rounded focus:outline-none"
        placeholder={selectedUser ? `Message ${selectedUser.name || selectedUser.email}...` : "Select a user first"}
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        disabled={!selectedUser}
      />
      <button
        onClick={sendMessage}
        className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 disabled:bg-gray-600"
        disabled={!selectedUser}
      >
        ➤
      </button>
    </div>
  );
}
