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
  deletedAt?: number;   // 👈 added optional
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/firestore" }),
  tagTypes: ["Users", "Rooms", "Messages"],
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

    // 👇 New soft delete API
    deleteMessage: builder.mutation<any, { roomID: string; messageId: string }>({
      query: ({ roomID, messageId }) => ({
        url: `messages/${roomID}/${messageId}/delete`,
        method: "PUT",
        body: { deletedAt: Date.now() },
      }),
      invalidatesTags: (result, error, { roomID }) => [{ type: "Messages", id: roomID }],
    }),

    updateMessage: builder.mutation<
    any,
    { roomID: string; messageId: string; text?: string; deletedAt?: number }
  >({
    query: ({ roomID, messageId, ...rest }) => ({
      url: `messages/${roomID}/${messageId}`,
      method: "PUT",
      body: rest,
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
  useDeleteMessageMutation,   // 👈 export
  useUpdateMessageMutation
} = chatApi;
