import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

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

export default SortButton;
