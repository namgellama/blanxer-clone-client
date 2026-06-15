"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { useState } from "react";

import { useDeleteCollection } from "@/api/vendor/collection/hooks/useDeleteCollection";
import { IconButton } from "@/components/custom";
import { DeleteDialog } from "@/components/shared";
import { Collection } from "@/types/vendor/collection";

export const columns: ColumnDef<Collection>[] = [
    {
        accessorKey: "image",
        header: "Collection Name",
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
        header: "Slug",
        cell: ({ row }) => {
            const slug = row.getValue<string>("slug");

            return <p className="text-blue-500 font-medium">{slug}</p>;
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
