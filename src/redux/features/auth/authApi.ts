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
  }),
});

export const { useLoginMutation, useRegisterDonorMutation } = authApi;