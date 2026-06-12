"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Collection } from "@/types/vendor/collection";
import { DeleteDialog } from "@/components/shared";
import { useDeleteCollection } from "@/api/vendor/collection/hooks/useDeleteCollection";

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
        cell: ({ row }) => {
            const [isOpen, setIsOpen] = useState(false);

            const collectionId = row.original.id;
            const collectionName = row.original.name;
            const { deleteCollectionMutation, isLoading } = useDeleteCollection(
                collectionId,
                collectionName,
            );

            const handleDelete = async () => {
                deleteCollectionMutation();
                setIsOpen(false);
            };

            return (
                <>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="bg-transparent"
                        onClick={() => setIsOpen(true)}
                    >
                        <Trash2 className="text-destructive" />
                    </Button>
                    <DeleteDialog
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        handleDelete={handleDelete}
                        isLoading={isLoading}
                    />
                </>
            );
        },
    },
];
