"use client";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setRoomId } from "../../../../services/chatSlice";
import { RootState, AppDispatch } from "@/store/store";
import { useGetUsersQuery, chatApi } from "@/services/chatApi";
import toast from "react-hot-toast";

export default function ChatSidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const currentUserEmail = localStorage.getItem("email") || "";

  const selectedUser = useSelector((state: RootState) => state.chat.selectedUser);
  const { data: users, isLoading, isError } = useGetUsersQuery();

  const handleSelectUser = async (user: any) => {
    dispatch(selectUser(user));

    try {
      // ✅ Use the clicked user's email, not old selectedUser
      const res = await dispatch(
        chatApi.endpoints.getRoom.initiate({
          senderId: currentUserEmail,
          receiverId: user.email,
        })
      ).unwrap();

      if (res?.roomId) {
        dispatch(setRoomId(res.roomId));
      } else {
        dispatch(setRoomId("")); // no room yet
      }
    } catch (err : any) {
      // console.log("Error getting room:", err.data.message);
      toast.error(`❌ ${err.data.message}`);
      dispatch(setRoomId("")); // fallback
    }
  };

  return (
    <div className="w-72 bg-gray-900 text-white flex flex-col">
      <div className="p-4 font-bold text-lg">Users</div>
      <div className="flex-1 overflow-y-auto">
        {isLoading && <div className="p-3 text-gray-400">Loading users...</div>}
        {isError && <div className="p-3 text-red-400">Failed to load users</div>}
        {users
          ?.filter((user) => user.email !== currentUserEmail) // ✅ hide logged-in user
          .map((user, index) => {
            const displayName =
              user.name || user.username || user.displayName || "Unknown User";
            return (
              <div
                key={index}
                className={`p-3 cursor-pointer hover:bg-gray-700 ${
                  selectedUser?.email === user.email ? "bg-gray-800" : ""
                }`}
                onClick={() => handleSelectUser(user)}
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
