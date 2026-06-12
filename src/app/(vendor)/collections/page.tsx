"use client";

import { useGetAllCollections } from "@/api/vendor/collection/hooks/useGetAllCollections";
import { SearchInput } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const page = () => {
    const { collections, isLoading, error } = useGetAllCollections();

    return (
        <div className="w-full space-y-4">
            <header className="flex items-center justify-between">
                <h2 className="font-bold text-xl">Store Collections</h2>

                <div className="flex items-center gap-4">
                    <SearchInput placeholder="Search name or slug" />
                    <Button className="rounded-xs">Add Collection</Button>
                </div>
            </header>

            <DataTable columns={columns} data={collections?.data ?? []} />
        </div>
    );
};

export default page;
