import { VENDOR_API } from "@/constants/api";
import api from "@/lib/api";
import { CreateCollectionFormFields } from "@/validations/vendor/collection.validation";

const collectionApi = {
    // Get all
    getAll: async (
        storeId: string,
        {
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
        },
    ) => {
        const response = await api.get(VENDOR_API.collection.getAll(storeId), {
            params: {
                page,
                pageSize,
                search,
                sortBy,
                order,
            },
        });

        return response.data;
    },

    // Create
    create: async (storeId: string, data: CreateCollectionFormFields) => {
        const response = await api.post(
            VENDOR_API.collection.create(storeId),
            data,
        );

        return response.data;
    },

    // Delete
    delete: async (storeId: string, collectionId: string) => {
        await api.delete(VENDOR_API.collection.delete(storeId, collectionId));
    },
};

export default collectionApi;
