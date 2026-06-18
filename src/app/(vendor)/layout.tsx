"use client";

import { ReactNode } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppSidebar } from "./_components";
import StoreProvider from "./store-provider";

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <AuthProvider>
            <StoreProvider>
                <SidebarProvider>
                    <AppSidebar />
                    <main className="p-4 w-full">{children}</main>
                </SidebarProvider>
            </StoreProvider>
        </AuthProvider>
    );
};

export default layout;
