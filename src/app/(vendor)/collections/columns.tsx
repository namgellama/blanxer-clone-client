"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, Trash2 } from "lucide-react";
import { useState } from "react";

import { useDeleteCollection } from "@/api/vendor/collection/hooks/useDeleteCollection";
import { IconButton } from "@/components/custom";
import { DeleteDialog } from "@/components/shared";
import { Collection } from "@/types/vendor/collection";

const SortButton = ({
    field,
    label,
    sortBy,
    order,
    onSort,
}: {
    field: string;
    label: string;
    sortBy: string;
    order: string;
    onSort: (field: string) => void;
}) => {
    const isActive = sortBy === field;
    return (
        <button
            className="flex items-center gap-1"
            onClick={() => onSort(field)}
        >
            {label}
            {isActive ? (
                order === "asc" ? (
                    <ArrowUp size={14} />
                ) : (
                    <ArrowDown size={14} />
                )
            ) : (
                <ArrowUpDown size={14} className="text-muted-foreground" />
            )}
        </button>
    );
};

export const getColumns = (
    sortBy: string,
    order: string,
    onSort: (field: string) => void,
): ColumnDef<Collection>[] => [
    {
        accessorKey: "image",
        header: () => (
            <SortButton
                field="name"
                label="Name"
                sortBy={sortBy}
                order={order}
                onSort={onSort}
            />
        ),
        cell: ({ row }) => {
            const collection = row.original;

            return (
                <div className="flex items-center gap-4">
                    <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-10 h-12 object-cover rounded-md"
                    />
                    <p className="font-medium">{collection.name}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "slug",
        header: () => (
            <SortButton
                field="slug"
                label="Slug"
                sortBy={sortBy}
                order={order}
                onSort={onSort}
            />
        ),
        cell: ({ row }) => {
            const slug = row.getValue<string>("slug");

            return <p className="text-blue-500 font-medium">{slug}</p>;
        },
    },
    {
        accessorKey: "createdAt",
        header: () => (
            <SortButton
                field="createdAt"
                label="Created Date"
                sortBy={sortBy}
                order={order}
                onSort={onSort}
            />
        ),
        cell: ({ row }) => {
            const rawDate = row.getValue<Date>("createdAt");
            const createdDate = new Date(rawDate).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });

            return <p>{createdDate}</p>;
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <ActionCell collection={row.original} />,
    },
];

const ActionCell = ({ collection }: { collection: Collection }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { deleteCollectionMutation, isLoading } = useDeleteCollection(
        collection.id,
        collection.name,
    );

    const handleDelete = () => {
        deleteCollectionMutation();
        setIsOpen(false);
    };

    return (
        <>
            <IconButton
                icon={<Trash2 className="text-destructive" />}
                onClick={() => setIsOpen(true)}
            />
            <DeleteDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                handleDelete={handleDelete}
                isLoading={isLoading}
            />
        </>
    );
};

export default ActionCell;
