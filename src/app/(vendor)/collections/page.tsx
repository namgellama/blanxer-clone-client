"use client";

import { useState } from "react";

import { useGetAllCollections } from "@/api/vendor/collection/hooks/useGetAllCollections";
import { SearchInput } from "@/components/custom";
import { ErrorAlert } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePagination } from "@/hooks/usePagination";
import { useSearch } from "@/hooks/useSearch";
import { useSort } from "@/hooks/useSort";
import { CollectionAddDialog } from "../_components";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";

const page = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { pageNumber, setPageNumber, pageSize, pagination, setPagination } =
        usePagination();
    const { search, debouncedSearch, handleSearch } = useSearch();
    const { sortBy, order, handleSort } = useSort();

    const { collections, isLoading, error } = useGetAllCollections({
        page: pageNumber,
        pageSize,
        search: debouncedSearch,
        sortBy,
        order,
    });

    const cols = getColumns(sortBy, order, handleSort);

    return (
        <div className="w-full space-y-4">
            <header className="flex items-center justify-between">
                <h2 className="font-bold text-xl">Store Collections</h2>

                <div className="flex items-center gap-4">
                    <SearchInput
                        placeholder="Search name or slug"
                        value={search}
                        onChange={(value: string) => {
                            handleSearch(value);
                            setPageNumber(1);
                        }}
                    />
                    <Button
                        className="rounded-xs"
                        onClick={() => setIsOpen(true)}
                    >
                        Add Collection
                    </Button>
                </div>
            </header>

            {isLoading ? (
                <Skeleton className="w-full h-screen" />
            ) : error ? (
                <ErrorAlert
                    message={
                        error?.response?.data.detail ??
                        "Error occurred while fetching collections"
                    }
                />
            ) : (
                <DataTable
                    columns={cols}
                    data={collections?.data ?? []}
                    pagination={pagination}
                    pageCount={collections?.totalPages ?? 0}
                    onPaginationChange={setPagination}
                />
            )}

            <CollectionAddDialog isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
};

export default page;
