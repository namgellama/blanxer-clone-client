"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    OnChangeFn,
    PaginationState,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { Pagination } from "@/components/shared";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Collection } from "@/types/vendor/collection";
import { CollectionAddDialog } from "../_components";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pagination: PaginationState;
    pageCount: number;
    onPaginationChange: OnChangeFn<PaginationState>;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    pagination,
    pageCount,
    onPaginationChange,
}: DataTableProps<TData, TValue>) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Collection | null>(null);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount,
        onPaginationChange,
        getSortedRowModel: getSortedRowModel(),
        state: { pagination },
    });

    return (
        <div className="overflow-hidden rounded-md border bg-white">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                onClick={() => {
                                    setIsOpen(true);
                                    setSelectedItem(row.original as Collection);
                                }}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination table={table} />

            <CollectionAddDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
            />
        </div>
    );
}
