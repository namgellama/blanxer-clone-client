import { useMutation } from "@tanstack/react-query";

import { ApiError } from "@/types/api-error";
import { handleErrorResponse } from "@/utils/handleErrorResponse";
import mediaApi from "..";

export const useUploadImage = () => {
    const { mutateAsync: uploadImageMutation, isPending: isLoading } =
        useMutation<string, ApiError, FormData>({
            mutationFn: (formData: FormData) => mediaApi.uploadImage(formData),
            onError: (error) => {
                handleErrorResponse(error, "Error uploading image");
            },
        });

    return { uploadImageMutation, isLoading };
};
