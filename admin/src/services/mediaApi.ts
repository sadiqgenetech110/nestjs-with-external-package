// src/services/mediaApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mediaApi = createApi({
  reducerPath: "mediaApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }), // adjust
  tagTypes: ["Media"],
  endpoints: (builder) => ({
    // getMedia: builder.query<any[], void>({
    //   query: () => "/media",
    //   providesTags: ["Media"],
    // }),
    uploadMedia: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "firestore/media",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Media"],
    }),
  }),
});

export const { useUploadMediaMutation } = mediaApi;
