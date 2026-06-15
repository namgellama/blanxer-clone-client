"use client";

import { parseAsInteger, useQueryState } from "nuqs";

import { useGetAllCollections } from "@/api/vendor/collection/hooks/useGetAllCollections";
import { SearchInput } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";

const page = () => {
    const [pageNumber, setPageNumber] = useQueryState(
        "page",
        parseAsInteger.withDefault(1),
    );
    const [pageSize, setPageSize] = useQueryState(
        "pageSize",
        parseAsInteger.withDefault(10),
    );
    const [search, setSearch] = useQueryState("search", { defaultValue: "" });
    const debouncedSearch = useDebounce<string>(search, 500);
    const [sortBy, setSortBy] = useQueryState("sortBy", {
        defaultValue: "created_at",
    });
    const [order, setOrder] = useQueryState("order", { defaultValue: "desc" });

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
        search: debouncedSearch,
        sortBy,
        order,
    });

    const handleSearch = (value: string) => {
        setSearch(value);
        setPageNumber(1);
    };

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
                        onChange={handleSearch}
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
