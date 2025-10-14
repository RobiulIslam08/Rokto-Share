import { createApi, fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import { logout, setToken } from '../features/auth/authSlice';


const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/v1', // আপনার ব্যাকএন্ড URL
  credentials:"include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
// ✅ Refresh Token সহ Base Query
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // যদি 401 error হয় (unauthorized), তাহলে refresh token দিয়ে নতুন access token নিন
  if (result.error && result.error.status === 401) {
    // Refresh token API call
    const refreshResult = await baseQuery(
      { url: '/auth/refresh-token', method: 'POST' },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // নতুন access token Redux store এ সেট করুন
      const data = refreshResult.data as { data: { accessToken: string } };
      api.dispatch(setToken(data.data.accessToken));

      // মূল request আবার পাঠান নতুন token দিয়ে
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh token ও expire হয়ে গেলে, user কে logout করুন
      api.dispatch(logout());
    }
  }

  return result;
};



export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['donors', 'requests', 'profile','donors'],
  endpoints: () => ({}),
});

