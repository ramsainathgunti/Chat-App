import { createSlice } from "@reduxjs/toolkit";
import chatApi from "./stateApi";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addNotifications: (state, { payload }) => {
            if (state.newMessages[payload]) {
                state.newMessages[payload] = state.newMessages[payload] + 1;
            } else {
                state.newMessages[payload] = 1;
            }
        },
        resetNotifications: (state, { payload }) => {
            delete state.newMessages[payload];
        },
    },
    extraReducers: (builder) => {
        //save the registered user
        builder.addMatcher(
            chatApi.endpoints.userRegister.matchFulfilled,
            (state, { payload }) => payload
        );
        //save loggedIn user
        builder.addMatcher(
            chatApi.endpoints.userLogin.matchFulfilled,
            (state, { payload }) => payload
        );
        //logout
        builder.addMatcher(chatApi.endpoints.userLogout.matchFulfilled, () => null);
    },
});

export const { addNotifications, resetNotifications } = userSlice.actions;
export default userSlice.reducer;