import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  name?: string;
  username?: string;
  displayName?: string;
  email: string;
  token?: string;
}

interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  text: string;
  createdAt: number;
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/firestore" }),
  tagTypes: ["Users", "Rooms", "Messages"],   // ✅ add this
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/all/users",
      providesTags: ["Users"],
    }),

    getRoom: builder.query<{ roomId: string }, { senderId: string; receiverId: string }>({
      query: ({ senderId, receiverId }) => `/room/${senderId}/${receiverId}`,
      providesTags: ["Rooms"],
    }),

    getMessages: builder.query<Message[], string>({
      query: (roomId) => `/messages/${roomId}`,
      providesTags: (result, error, roomId) => [{ type: "Messages", id: roomId }],
    }),

    sendMessage: builder.mutation<
      any,
      { roomID: string; senderId: string; recipientId: string; text: string; type: "text" }
    >({
      query: (body) => ({
        url: "send",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { roomID }) => [{ type: "Messages", id: roomID }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetRoomQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} = chatApi;
