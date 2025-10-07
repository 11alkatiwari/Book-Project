import { configureStore } from "@reduxjs/toolkit"; // ✅ Corrected import
import authReducer from "./auth";
import booksReducer from "./booksSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        books: booksReducer,
    },
});

export default store;
