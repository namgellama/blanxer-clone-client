import { VENDOR_API } from "@/constants/api";
import api from "@/lib/api";

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
                page_size: pageSize,
                search,
                sort_by: sortBy,
                order,
            },
        });
        return response.data;
    },

    // Delete
    delete: async (storeId: string, collectionId: string) => {
        await api.delete(VENDOR_API.collection.delete(storeId, collectionId));
    },
};

export default collectionApi;
