import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/login',
        method: 'POST',
        body: userInfo,
      }),
    }),
    registerDonor: builder.mutation({
      query: (donorInfo) => ({
        url: '/auth/register-donor',
        method: 'POST',
        body: donorInfo,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: '/auth/refresh-token',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterDonorMutation,useLogoutMutation,useRefreshTokenMutation } = authApi;