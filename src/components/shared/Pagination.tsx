import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    Pagination as ShadcnPagination,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const Pagination = <TData,>({ table }: { table: Table<TData> }) => {
    const currentPage = table.getState().pagination.pageIndex + 1;
    const totalPages = table.getPageCount();

    const getPages = () => {
        const pages: (number | "ellipsis")[] = [];

        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        pages.push(1);

        if (currentPage > 3) pages.push("ellipsis");

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        for (let i = start; i <= end; i++) pages.push(i);

        if (currentPage < totalPages - 2) pages.push("ellipsis");

        pages.push(totalPages);

        return pages;
    };

    return (
        <div className="flex items-center justify-between gap-4">
            <PageSize
                pageSize={table.getState().pagination.pageSize}
                setPageSize={(value: number) => table.setPageSize(value)}
            />

            <ShadcnPagination className="mx-0 w-auto">
                <PaginationContent>
                    <PaginationItem>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                    </PaginationItem>

                    {getPages().map((p, i) =>
                        p === "ellipsis" ? (
                            <PaginationItem key={`ellipsis-${i}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        ) : (
                            <PaginationItem key={p}>
                                <PaginationLink
                                    isActive={p === currentPage}
                                    onClick={() => table.setPageIndex(p - 1)}
                                    className="cursor-pointer"
                                >
                                    {p}
                                </PaginationLink>
                            </PaginationItem>
                        ),
                    )}

                    <PaginationItem>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </ShadcnPagination>
        </div>
    );
};

export default Pagination;

const PageSize = ({
    pageSize,
    setPageSize,
}: {
    pageSize: number;
    setPageSize: (value: number) => void;
}) => {
    return (
        <Field orientation="horizontal" className="w-fit">
            <FieldLabel htmlFor="select-rows-per-page">
                Rows per page
            </FieldLabel>
            <Select
                value={String(pageSize)}
                onValueChange={(value) => setPageSize(Number(value))}
            >
                <SelectTrigger className="w-20" id="select-rows-per-page">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent align="start">
                    <SelectGroup>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </Field>
    );
};
