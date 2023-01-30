import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const chatApi = createApi({
    reducerPath: "chatApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500/api" }),
    endpoints: (builder) => ({
        //User Register
        userRegister: builder.mutation({
            query: (user) => ({
                url: "/auth/register",
                method: "POST",
                body: user,
            }),
        }),
        //User Login
        userLogin: builder.mutation({
            query: (user) => ({
                url: "/auth/login",
                method: "POST",
                body: user,
            }),
        }),
        //logout user
        userLogout: builder.mutation({
            query: (payload) => ({
                url: "/logout",
                method: "DELETE",
                body: payload,
            }),
        }),
    }),
});

export const {
    useUserRegisterMutation,
    useUserLoginMutation,
    useUserLogoutMutation,
} = chatApi;

export default chatApi;