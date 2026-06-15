import { parseAsInteger, useQueryState } from "nuqs";

export const usePagination = (pageSizeValue: number = 10) => {
    const [pageNumber, setPageNumber] = useQueryState(
        "page",
        parseAsInteger.withDefault(1),
    );
    const [pageSize, setPageSize] = useQueryState(
        "pageSize",
        parseAsInteger.withDefault(pageSizeValue),
    );

    const pagination = { pageIndex: pageNumber - 1, pageSize };

    const setPagination = (updater: any) => {
        const next =
            typeof updater === "function" ? updater(pagination) : updater;
        setPageNumber(next.pageIndex + 1);
        setPageSize(next.pageSize);
    };

    return {
        pageNumber,
        setPageNumber,
        pageSize,
        setPageSize,
        pagination,
        setPagination,
    };
};
