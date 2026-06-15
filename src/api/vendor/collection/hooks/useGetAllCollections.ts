import { ApiError } from "@/types/api-error";
import { PaginatedResponse } from "@/types/response";
import { Collection } from "@/types/vendor/collection";
import { useQuery } from "@tanstack/react-query";
import collectionApi from "..";
import { useAppSelector } from "@/redux/hooks";

export const useGetAllCollections = ({
    page,
    pageSize,
}: {
    page: number;
    pageSize: number;
}) => {
    const { store } = useAppSelector((state) => state.vendorStore);

    const {
        data: collections,
        error,
        isLoading,
    } = useQuery<PaginatedResponse<Collection>, ApiError>({
        queryFn: () => collectionApi.getAll(store!.id, { page, pageSize }),
        queryKey: ["collections", store!.id, page, pageSize],
        enabled: !!store,
    });

    return { collections, isLoading, error };
};
