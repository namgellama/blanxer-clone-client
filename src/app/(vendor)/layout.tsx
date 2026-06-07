"use client";

import { ReactNode } from "react";

import { AuthProvider } from "@/contexts/AuthContext";
import StoreProvider from "./store-provider";

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <AuthProvider>
            <StoreProvider>{children}</StoreProvider>
        </AuthProvider>
    );
};

export default layout;
