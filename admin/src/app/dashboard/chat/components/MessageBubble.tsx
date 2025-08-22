"use client";

import toast from "react-hot-toast";
import { useDeleteMessageMutation, useUpdateMessageMutation } from "../../../../services/chatApi";
import { useState } from "react";

interface MessageBubbleProps {
  messageId: string;
  roomID: string;   // 👈 pass this from ChatWindow
  from: string;
  text: string;
  time: string;
  mine?: boolean;
}

export default function MessageBubble({
  messageId,
  roomID,
  from,
  text,
  time,
  mine,
}: MessageBubbleProps) {
  const [deleteMessage] = useDeleteMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleDelete = async () => {
    try {
      await deleteMessage({ roomID, messageId }).unwrap();
      toast.success("✅ Message deleted");
    } catch (err) {
      toast.error(`❌ Delete failed`);
      console.error("Delete failed", err);
    }
  };

  const handleSave = async () => {
    try {
      await updateMessage({ roomID, messageId, text: editText }).unwrap();
      toast.success("✅ Message updated");
      setIsEditing(false);
    } catch (err) {
      toast.error(`❌ Update failed`);
      console.error("Update failed", err);
    }
  };


    return (
    <div className={`flex mb-2 ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`inline-block max-w-xs md:max-w-md p-3 rounded-2xl ${
          mine
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-700 text-gray-100 rounded-bl-none"
        }`}
      >
        {!mine && <div className="font-semibold text-sm mb-1">{from}</div>}

        {isEditing ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1 bg-gray-800 text-white p-1 rounded"
            />
            <button onClick={handleSave} className="text-sm bg-green-600 px-2 rounded">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="text-sm bg-gray-500 px-2 rounded">
              Cancel
            </button>
          </div>
        ) : (
          <div onDoubleClick={() => mine && setIsEditing(true)}>
            <div>{text}</div>
            <div className="text-xs text-gray-300 mt-1 text-right">{time}</div>
          </div>
        )}
      </div>

      {mine && !isEditing && (
        <div className="flex flex-col gap-1 ml-2">
          <button onClick={() => setIsEditing(true)} className="text-xs text-blue-400">✎ Edit</button>
          <button onClick={handleDelete} className="text-xs text-red-400">🗑 Delete</button>
        </div>
      )}
    </div>
  );
}

