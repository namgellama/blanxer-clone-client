"use client";

import { ReactNode } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppSidebar } from "./_components/AppSidebar";
import StoreProvider from "./store-provider";

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <AuthProvider>
            <StoreProvider>
                <SidebarProvider>
                    <AppSidebar />
                    {children}
                </SidebarProvider>
            </StoreProvider>
        </AuthProvider>
    );
};

export default layout;
