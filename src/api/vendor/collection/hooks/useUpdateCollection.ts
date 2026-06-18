import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAppSelector } from "@/redux/hooks";
import { ApiError } from "@/types/api-error";
import { Collection } from "@/types/vendor/collection";
import { handleErrorResponse } from "@/utils/handleErrorResponse";
import { CreateCollectionFormFields } from "@/validations/vendor/collection.validation";
import collectionApi from "..";

export const useUpdateCollection = () => {
    const { store } = useAppSelector((state) => state.vendorStore);
    const queryClient = useQueryClient();

    const { mutateAsync: updateCollectionMutation, isPending: isLoading } =
        useMutation<
            Collection,
            ApiError,
            { collectionId: string; data: CreateCollectionFormFields }
        >({
            mutationFn: ({
                collectionId,
                data,
            }: {
                collectionId: string;
                data: CreateCollectionFormFields;
            }) => collectionApi.update(store!.id, collectionId, data),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["collections", store!.id],
                });
            },
            onError: (error) => {
                handleErrorResponse(error, "Error updating collection");
            },
        });

    return { updateCollectionMutation, isLoading };
};
