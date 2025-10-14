// src/redux/features/donor/donorApi.ts
import { baseApi } from '../../api/baseApi';

export const donorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDonors: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();

        // Add all filters to query params
        if (params?.bloodGroup && params.bloodGroup !== 'all') {
          queryParams.append('bloodGroup', params.bloodGroup);
        }
        if (params?.division && params.division !== 'all') {
          queryParams.append('division', params.division);
        }
        if (params?.district && params.district !== 'all') {
          queryParams.append('district', params.district);
        }
        if (params?.availability && params.availability !== 'all') {
          queryParams.append('availability', params.availability);
        }
        if (params?.searchTerm) {
          queryParams.append('searchTerm', params.searchTerm);
        }
        if (params?.page) {
          queryParams.append('page', params.page.toString());
        }
        if (params?.limit) {
          queryParams.append('limit', params.limit.toString());
        }

        return {
          url: `/donors?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['donors'],
    }),

    getSingleDonor: builder.query({
      query: (id) => ({
        url: `/donors/${id}`,
        method: 'GET',
      }),
      providesTags: ['donors'],
    }),
  }),
});

export const { useGetAllDonorsQuery, useGetSingleDonorQuery } = donorApi;