import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import AuthSlice from "../auth/AuthSlice";

const store = configureStore(
    {
        reducer: {
           user:AuthSlice,
        },
    },
    applyMiddleware(thunk)
);

export default store;