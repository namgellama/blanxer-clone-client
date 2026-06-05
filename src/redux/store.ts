import { configureStore } from "@reduxjs/toolkit";
import vendorStoreReducer from "./slices/vendor-store.slice";

export const store = configureStore({
    reducer: {
        vendorStore: vendorStoreReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
