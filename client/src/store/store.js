import { configureStore } from "@reduxjs/toolkit";
import chatApi from "./stateApi";
import authReducer from "./authSlice";
//persist store
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const reducer = combineReducers({
    user: authReducer,
    [chatApi.reducerPath]: chatApi.reducer,
});

const persistConfig = {
    key: "root",
    storage,
    blackList: [chatApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, chatApi.middleware],
});

export default store;