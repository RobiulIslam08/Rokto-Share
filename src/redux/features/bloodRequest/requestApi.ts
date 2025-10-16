// src/redux/features/bloodRequest/requestApi.ts
import { baseApi } from "@/redux/api/baseApi";

const requestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ১. রক্তের অনুরোধ তৈরি করুন
    createBloodRequest: builder.mutation({
      query: (data) => ({
        url: '/requests/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['requests'],
    }),

    // ২. সব রক্তের অনুরোধ দেখুন (filtering এর সাথে)
    getAllBloodRequests: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();
        
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.status) queryParams.append('status', params.status);
        if (params?.urgency) queryParams.append('urgency', params.urgency);
        if (params?.userId) queryParams.append('userId', params.userId);
        if (params?.donorId) queryParams.append('donorId', params.donorId);

        return {
          url: `/requests${queryParams.toString() ? `?${queryParams.toString()}` : ''}`,
          method: 'GET',
        };
      },
      providesTags: ['requests'],
    }),

    // ৩. নির্দিষ্ট রক্তের অনুরোধ দেখুন (ID দিয়ে)
    getSingleBloodRequest: builder.query({
      query: (id) => ({
        url: `/requests/${id}`,
        method: 'GET',
      }),
      providesTags: ['requests'],
    }),

   

    // ৪. রক্তের অনুরোধ আপডেট করুন (status পরিবর্তন ইত্যাদি)
    updateBloodRequest: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/requests/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['requests'],
    }),

    // ৫. রক্তের অনুরোধ ডিলিট করুন
    deleteBloodRequest: builder.mutation({
      query: (id) => ({
        url: `/requests/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['requests'],
    }),

    // ৬. User এর নিজের সব রক্তের অনুরোধ দেখুন (যেগুলো সে করেছে)
    getMyBloodRequests: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.status) queryParams.append('status', params.status);

        return {
          url: `/requests/my-requests${queryParams.toString() ? `?${queryParams.toString()}` : ''}`,
          method: 'GET',
        };
      },
      providesTags: ['requests'],
    }),

    // ৭. Donor এর কাছে আসা সব অনুরোধ দেখুন (যেগুলো তার কাছে করা হয়েছে)
    getRequestsForDonor: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.status) queryParams.append('status', params.status);

        return {
          url: `/requests/donor-requests${queryParams.toString() ? `?${queryParams.toString()}` : ''}`,
          method: 'GET',
        };
      },
      providesTags: ['requests'],
    }),

    // ৮. Blood request accept করুন (donor এর জন্য)
    acceptBloodRequest: builder.mutation({
      query: (id) => ({
        url: `/requests/${id}/accept`,
        method: 'PATCH',
      }),
      invalidatesTags: ['requests'],
    }),

    // ৯. Blood request reject করুন (donor এর জন্য)
    rejectBloodRequest: builder.mutation({
      query: ({ id, rejectionReason }) => ({
        url: `/requests/${id}/reject`,
        method: 'PATCH',
        body: { rejectionReason },
      }),
      invalidatesTags: ['requests'],
    }),

    // ১০. Blood request complete করুন
    completeBloodRequest: builder.mutation({
      query: (id) => ({
        url: `/requests/${id}/complete`,
        method: 'PATCH',
      }),
      invalidatesTags: ['requests'],
    }),

    // ১১. Blood request cancel করুন (requester এর জন্য)
    cancelBloodRequest: builder.mutation({
      query: (id) => ({
        url: `/requests/${id}/cancel`,
        method: 'PATCH',
      }),
      invalidatesTags: ['requests'],
    }),
       getDonorDonationHistory: builder.query({
        query: (params) => ({
          url: '/requests/donor/donation-history',
          method: 'GET',
          params: {
            page: params?.page || 1,
            limit: params?.limit || 10,
            status: params?.status || 'Completed',
          },
        }),
        providesTags: ['BloodRequest'],
      }),
  }),
});

// Export hooks
export const {
  useCreateBloodRequestMutation,
  useGetAllBloodRequestsQuery,
  useGetSingleBloodRequestQuery,
  useUpdateBloodRequestMutation,
  useDeleteBloodRequestMutation,
  useGetMyBloodRequestsQuery,
  useGetRequestsForDonorQuery,
  useAcceptBloodRequestMutation,
  useRejectBloodRequestMutation,
  useCompleteBloodRequestMutation,
  useCancelBloodRequestMutation,
  useGetDonorDonationHistoryQuery
} = requestApi;

export default requestApi;