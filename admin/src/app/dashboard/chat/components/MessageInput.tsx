"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function MessageInput() {
  const [msg, setMsg] = useState("");
  const selectedUser = useSelector((state: RootState) => state.chat.selectedUser);

  const sendMessage = () => {
    if (!msg.trim() || !selectedUser) return;
    console.log(`Send to ${selectedUser.name || selectedUser.email}:`, msg);
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
