import { useQuery } from "@tanstack/react-query";

import { ApiError } from "@/types/api-error";
import { PaginatedResponse } from "@/types/response";
import { Collection } from "@/types/vendor/collection";
import collectionApi from "..";
import { useAppSelector } from "@/redux/hooks";

export const useGetAllCollections = ({
    page,
    pageSize,
    search,
    sortBy,
    order,
}: {
    page: number;
    pageSize: number;
    search: string;
    sortBy: string;
    order: string;
}) => {
    const { store } = useAppSelector((state) => state.vendorStore);

    const {
        data: collections,
        error,
        isLoading,
    } = useQuery<PaginatedResponse<Collection>, ApiError>({
        queryFn: () =>
            collectionApi.getAll(store!.id, {
                page,
                pageSize,
                search,
                sortBy,
                order,
            }),
        queryKey: [
            "collections",
            store!.id,
            page,
            pageSize,
            search,
            sortBy,
            order,
        ],
        enabled: !!store,
    });

    return { collections, isLoading, error };
};
