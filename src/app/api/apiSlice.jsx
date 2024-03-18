import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCrediential } from "../../features/auth/authSlice";
const BASE_URL = "http://localhost:3500";
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.get("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const fetchBaseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");
    // send refresh token to get a new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);

    console.log(refreshResult);

    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCrediential({ ...refreshResult.data, user }));

      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};
export const apiSlice = createApi({
  baseQuery: fetchBaseQueryWithReAuth,
  endpoints: (builder) => ({}),
});
