// src/services/chatApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  name?: string;
  username?: string;
  displayName?: string;
  email: string;
  token?: string;
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/firestore/all/users",
    }),
  }),
});

export const { useGetUsersQuery } = chatApi;
