"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function ChatHeader() {
  const selectedUser = useSelector((state: RootState) => state.chat.selectedUser);

  return (
    <div className="flex items-center justify-between bg-gray-900 text-white p-4 border-b border-gray-700">
      {selectedUser ? (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-600" />
          <span className="font-semibold">{selectedUser.name || selectedUser.email}</span>
        </div>
      ) : (
        <span className="text-gray-400">Select a user to start chat</span>
      )}

      <div className="flex gap-3">
        <button className="p-2 hover:bg-gray-700 rounded">📞</button>
        <button className="p-2 hover:bg-gray-700 rounded">🎥</button>
        <button className="p-2 hover:bg-gray-700 rounded">ℹ️</button>
      </div>
    </div>
  );
}
