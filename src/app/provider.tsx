"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "@/redux/store";

const queryClient = new QueryClient();

const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <ReduxProvider store={store}>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
                <Toaster
                    position="top-center"
                    toastOptions={{
                        duration: 2000,
                    }}
                />
            </QueryClientProvider>
        </ReduxProvider>
    );
};

export default Provider;
