import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StoreUserRole = "OWNER" | "MAANGER" | "STAFF";

export interface Store {
    id: string;
    name: string;
    slug: string;
    userRole: StoreUserRole;
}

interface StoreState {
    store: Store | null;
}

const savedStore =
    typeof window !== "undefined" ? localStorage.getItem("store") : null;

const initialState: StoreState = {
    store: savedStore ? JSON.parse(savedStore) : null,
};

export const vendorStoreSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        setStore: (state, action: PayloadAction<{ store: Store }>) => {
            const { store } = action.payload;
            state.store = store;
            localStorage.setItem("store", JSON.stringify(store));
        },
    },
});

export const { setStore } = vendorStoreSlice.actions;
export default vendorStoreSlice.reducer;
