import { configureStore } from "@reduxjs/toolkit"; // ✅ Corrected import
import authReducer from "./auth";

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;
