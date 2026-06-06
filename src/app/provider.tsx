"use client";

import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <ReduxProvider store={store}>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ReduxProvider>
    );
};

export default Provider;
