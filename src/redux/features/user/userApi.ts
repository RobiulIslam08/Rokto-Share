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
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: '/users/profile',
        method: 'PUT', // Or 'PATCH' depending on your backend controller
        body: data,
      }),
      // This will auto-re-fetch getUserProfile after a successful update
      invalidatesTags: ['userProfile'], 
    }),
  }),
});
export const {useGetUserProfileQuery, useUpdateUserProfileMutation} = userApi
