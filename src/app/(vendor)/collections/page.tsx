"use client";

import { useQueryState } from "nuqs";

import { useGetAllCollections } from "@/api/vendor/collection/hooks/useGetAllCollections";
import { SearchInput } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { usePagination } from "@/hooks/usePagination";
import { useSearch } from "@/hooks/useSearch";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";

const page = () => {
    const { pageNumber, setPageNumber, pageSize, pagination, setPagination } =
        usePagination();
    const { search, debouncedSearch, handleSearch } = useSearch();

    const [sortBy, setSortBy] = useQueryState("sortBy", {
        defaultValue: "createdAt",
    });
    const [order, setOrder] = useQueryState("order", { defaultValue: "desc" });

    const { collections, isLoading, error } = useGetAllCollections({
        page: pageNumber,
        pageSize,
        search: debouncedSearch,
        sortBy,
        order,
    });

    const handleSort = (field: string) => {
        if (sortBy === field) {
            setOrder(order === "desc" ? "asc" : "desc");
        } else {
            setSortBy(field);
            setOrder("desc");
        }
    };

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
                    <Button className="rounded-xs">Add Collection</Button>
                </div>
            </header>

            <DataTable
                columns={cols}
                data={collections?.data ?? []}
                pagination={pagination}
                pageCount={collections?.totalPages ?? 0}
                onPaginationChange={setPagination}
            />
        </div>
    );
};

export default page;
