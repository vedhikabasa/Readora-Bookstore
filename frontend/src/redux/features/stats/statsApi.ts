import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/admin`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    fetchAdminStats: builder.query({
      query: () => "/",
    }),
  }),
});

export const { useFetchAdminStatsQuery } = statsApi;
export default statsApi;