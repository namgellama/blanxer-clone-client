import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserStoreRole = "OWNER" | "MAANGER" | "STAFF";

export interface UserStore {
    id: string;
    name: string;
    slug: string;
    email: string;
    contactNumber: string;
    createdAt: Date;
    updatedAt: Date;
    userRole: UserStoreRole;
}

interface StoreState {
    store: UserStore | null;
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
        setStore: (state, action: PayloadAction<{ store: UserStore }>) => {
            const { store } = action.payload;
            state.store = store;
            localStorage.setItem("store", JSON.stringify(store));
        },
    },
});

export const { setStore } = vendorStoreSlice.actions;
export default vendorStoreSlice.reducer;
