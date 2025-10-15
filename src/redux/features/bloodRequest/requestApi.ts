import { baseApi } from "@/redux/api/baseApi";

const requestApi = baseApi.injectEndpoints({
	endpoints:(builder) => ({
		 // রক্তের অনুরোধ তৈরি
		 createBloodRequest:builder.mutation({
			query:(data) =>({
				url:'/requests/create',
				method:'POST',
				body:data
			}),
			invalidatesTags:['requests']
		 })
	})
})
export const {useCreateBloodRequestMutation} = requestApi