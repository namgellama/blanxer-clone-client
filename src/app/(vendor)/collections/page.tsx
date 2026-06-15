"use client";

import { useQueryState, parseAsInteger } from "nuqs";

import { useGetAllCollections } from "@/api/vendor/collection/hooks/useGetAllCollections";
import { SearchInput } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const page = () => {
    const [pageNumber, setPageNumber] = useQueryState(
        "page",
        parseAsInteger.withDefault(1),
    );
    const [pageSize, setPageSize] = useQueryState(
        "pageSize",
        parseAsInteger.withDefault(10),
    );

    const pagination = { pageIndex: pageNumber - 1, pageSize };
    const setPagination = (updater: any) => {
        const next =
            typeof updater === "function" ? updater(pagination) : updater;
        setPageNumber(next.pageIndex + 1);
        setPageSize(next.pageSize);
    };
    const { collections, isLoading, error } = useGetAllCollections({
        page: pageNumber,
        pageSize,
    });

    return (
        <div className="w-full space-y-4">
            <header className="flex items-center justify-between">
                <h2 className="font-bold text-xl">Store Collections</h2>

                <div className="flex items-center gap-4">
                    <SearchInput placeholder="Search name or slug" />
                    <Button className="rounded-xs">Add Collection</Button>
                </div>
            </header>

            <DataTable
                columns={columns}
                data={collections?.data ?? []}
                pagination={pagination}
                pageCount={collections?.totalPages ?? 0}
                onPaginationChange={setPagination}
            />
        </div>
    );
};

export default page;
