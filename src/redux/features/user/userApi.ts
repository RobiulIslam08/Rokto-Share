import { baseApi } from "@/redux/api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: '/users/profile',
        method: 'GET',
      }),
      providesTags: ['userProfile'],
    }),
    // ✅ NEW: This mutation updates the profile
  
  }),
});
export const {useGetUserProfileQuery, useUpdateUserProfileMutation} = userApi
