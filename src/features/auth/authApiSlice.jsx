import { apiSlice } from "../app/api/apiSlice";
const loginEndPoint = "/auth";
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: loginEndPoint,
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});
export const { useLoginMutation } = authApiSlice;
