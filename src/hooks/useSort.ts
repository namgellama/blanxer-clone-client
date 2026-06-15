import { useQueryState } from "nuqs";

export const useSort = (
    defaultOrderValue = "desc",
    defaultSortValue = "createdAt",
) => {
    const [sortBy, setSortBy] = useQueryState("sortBy", {
        defaultValue: defaultSortValue,
    });
    const [order, setOrder] = useQueryState("order", {
        defaultValue: defaultOrderValue,
    });

    const handleSort = (field: string) => {
        if (sortBy === field) {
            setOrder(order === "desc" ? "asc" : "desc");
        } else {
            setSortBy(field);
            setOrder("desc");
        }
    };

    return { sortBy, order, handleSort };
};
