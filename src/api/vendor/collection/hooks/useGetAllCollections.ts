import { ApiError } from "@/types/api-error";
import { PaginatedResponse } from "@/types/response";
import { Collection } from "@/types/vendor/collection";
import { useQuery } from "@tanstack/react-query";
import collectionApi from "..";
import { useAppSelector } from "@/redux/hooks";

export const useGetAllCollections = () => {
    const { store } = useAppSelector((state) => state.vendorStore);

    const {
        data: collections,
        error,
        isLoading,
    } = useQuery<PaginatedResponse<Collection>, ApiError>({
        queryFn: () => collectionApi.getAll(store!.id),
        queryKey: ["collections", store!.id],
        enabled: !!store,
    });

    return { collections, isLoading, error };
};
