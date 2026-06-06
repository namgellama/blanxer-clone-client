"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
    return <AuthProvider>{children}</AuthProvider>;
};

export default layout;
