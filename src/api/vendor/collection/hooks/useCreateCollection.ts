import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAppSelector } from "@/redux/hooks";
import { ApiError } from "@/types/api-error";
import { Collection } from "@/types/vendor/collection";
import { handleErrorResponse } from "@/utils/handleErrorResponse";
import { CreateCollectionFormFields } from "@/validations/vendor/collection.validation";
import collectionApi from "..";
import toast from "react-hot-toast";

export const useCreateCollection = () => {
    const { store } = useAppSelector((state) => state.vendorStore);
    const queryClient = useQueryClient();

    const { mutateAsync: createCollectionMutation, isPending: isLoading } =
        useMutation<Collection, ApiError, CreateCollectionFormFields>({
            mutationFn: (data: CreateCollectionFormFields) =>
                collectionApi.create(store!.id, data),
            onSuccess: () => {
                toast.success("Collection created successfully");
                queryClient.invalidateQueries({
                    queryKey: ["collections", store!.id],
                });
            },
            onError: (error) => {
                handleErrorResponse(error, "Error creating collection");
            },
        });

    return { createCollectionMutation, isLoading };
};
