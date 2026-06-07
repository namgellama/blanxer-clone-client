import { useMutation } from "@tanstack/react-query";

import storeApi from "@/api/store.api";
import { UserStoreRole } from "@/redux/slices/vendor-store.slice";
import { ApiError } from "@/types/api-error";
import { handleErrorResponse } from "@/utils/handleErrorResponse";
import { CreateStoreFormFields } from "@/validations/store.validation";

export interface Store {
    id: string;
    name: string;
    slug: string;
    email: string;
    contactNumber: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
    userRole: UserStoreRole;
}

export const useCreateStore = () => {
    const { mutateAsync: createStoreMutation, isPending: isLoading } =
        useMutation<Store, ApiError, CreateStoreFormFields>({
            mutationFn: storeApi.create,
            onError: (error) => {
                handleErrorResponse(error, "Error creating store");
            },
        });

    return { createStoreMutation, isLoading };
};
