import { useMutation } from "@tanstack/react-query";

import { ApiError } from "@/types/api-error";
import { handleErrorResponse } from "@/utils/handleErrorResponse";
import mediaApi from "..";

export const useDeleteMedia = () => {
    const { mutateAsync: deleteMediaMutation, isPending: isLoading } =
        useMutation<{ result: string }, ApiError, string>({
            mutationFn: (mediaUrl: string) => mediaApi.delete(mediaUrl),
            onError: (error) => {
                handleErrorResponse(error, "Error deleting media");
            },
        });

    return { deleteMediaMutation, isLoading };
};
