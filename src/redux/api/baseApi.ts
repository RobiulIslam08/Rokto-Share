// src/redux/api/baseApi.ts
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import { logout, setToken } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/v1',
  credentials: 'include', // cookie পাঠানোর জন্য
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// Token refresh করার জন্য custom base query
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // যদি 401 Unauthorized error হয়
  if (result.error && result.error.status === 401) {
    console.log('Access token expired, trying to refresh...');

    // Refresh token API call করুন
    const refreshResult = await baseQuery(
      { url: '/auth/refresh-token', method: 'POST' },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // নতুন access token পান
      const data = refreshResult.data as { 
        success: boolean;
        data: { accessToken: string } 
      };

      if (data.success && data.data?.accessToken) {
        // নতুন token Redux store এ সেভ করুন
        api.dispatch(setToken(data.data.accessToken));

        // মূল request আবার পাঠান নতুন token দিয়ে
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh token ব্যর্থ হলে logout করুন
        api.dispatch(logout());
      }
    } else {
      // Refresh token ও expire হয়ে গেলে logout করুন
      console.log('Refresh token expired, logging out...');
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['donors', 'requests', 'profile','BloodRequest'],
  endpoints: () => ({}),
});