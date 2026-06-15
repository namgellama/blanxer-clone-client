import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useAppSelector } from "@/redux/hooks";
import { ApiError } from "@/types/api-error";
import { handleErrorResponse } from "@/utils/handleErrorResponse";
import collectionApi from "..";

export const useDeleteCollection = (
    collectionId: string,
    collectionName: string,
) => {
    const { store } = useAppSelector((state) => state.vendorStore);
    const queryClient = useQueryClient();

    const { mutateAsync: deleteCollectionMutation, isPending: isLoading } =
        useMutation<void, ApiError, void>({
            mutationFn: () => collectionApi.delete(store!.id, collectionId),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["collections", store!.id],
                });
                toast.success(`${collectionName} deleted successfully`);
            },
            onError: (error) => {
                handleErrorResponse(error, "Error deleting collection");
            },
        });

    return { deleteCollectionMutation, isLoading };
};
