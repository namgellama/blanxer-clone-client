"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
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
        cell: ({ row }) => (
            <Button size="icon" variant="ghost" className="bg-transparent">
                <Trash2 className="text-destructive" />
            </Button>
        ),
    },
];
