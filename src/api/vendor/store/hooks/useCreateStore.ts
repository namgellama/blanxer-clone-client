import { useMutation, useQueryClient } from "@tanstack/react-query";

import storeApi from "@/api/vendor/store";
import { ApiError } from "@/types/api-error";
import { Store } from "@/types/vendor/store";
import { handleErrorResponse } from "@/utils/handleErrorResponse";
import { CreateStoreFormFields } from "@/validations/vendor/store.validation";

export const useCreateStore = () => {
    const queryClient = useQueryClient();

    const { mutateAsync: createStoreMutation, isPending: isLoading } =
        useMutation<Store, ApiError, CreateStoreFormFields>({
            mutationFn: storeApi.create,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["stores"] });
            },
            onError: (error) => {
                handleErrorResponse(error, "Error creating store");
            },
        });

    return { createStoreMutation, isLoading };
};
