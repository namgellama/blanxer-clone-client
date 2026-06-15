import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { Button } from "../ui/button";

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
        <Button
            variant="ghost"
            className="flex items-center gap-2 hover:bg-transparent"
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
        </Button>
    );
};

export default SortButton;
