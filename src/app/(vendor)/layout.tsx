"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { ReactNode } from "react";

const VendorMainLayout = ({ children }: { children: ReactNode }) => {
    return <AuthProvider>{children}</AuthProvider>;
};

export default VendorMainLayout;
