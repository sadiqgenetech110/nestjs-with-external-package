"use client";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../services/chatSlice"; // ✅ correct location
import { RootState, AppDispatch } from "@/store/store";
import { useGetUsersQuery } from "@/services/chatApi";

export default function ChatSidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const selectedUser = useSelector((state: RootState) => state.chat.selectedUser);

  const { data: users, isLoading, isError } = useGetUsersQuery();

  return (
    <div className="w-72 bg-gray-900 text-white flex flex-col">
      <div className="p-4 font-bold text-lg">Users</div>
      <div className="flex-1 overflow-y-auto">
        {isLoading && <div className="p-3 text-gray-400">Loading users...</div>}
        {isError && <div className="p-3 text-red-400">Failed to load users</div>}
        {users?.map((user, index) => {
          const displayName = user.name || user.username || user.displayName || "Unknown User";
          return (
            <div
              key={index}
              className={`p-3 cursor-pointer hover:bg-gray-700 ${
                selectedUser?.email === user.email ? "bg-gray-800" : ""
              }`}
              onClick={() => dispatch(selectUser(user))}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{displayName}</span>
              </div>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
