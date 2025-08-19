import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }), // your Nest API
  endpoints: (builder) => ({
    login: builder.mutation<{ id: string }, { name : string, email: string; password: string }>({
      query: (credentials) => ({
        url: "/firestore/signin/users",   // adjust to your existing login API
        method: "POST",
        body: credentials,
      }),
    }),
    getUser: builder.query<any, { collection: string; id: string }>({
      query: ({ collection, id }) => `/firestore/get/${collection}/${id}`,
    }),
  }),
});

export const { useLoginMutation, useGetUserQuery } = authApi;
