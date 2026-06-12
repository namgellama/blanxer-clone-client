import { VENDOR_API } from "@/constants/api";
import api from "@/lib/api";

const collectionApi = {
    // Get all
    getAll: async (storeId: string) => {
        const response = await api.get(VENDOR_API.collection.getAll(storeId));
        return response.data;
    },

    // Delete
    delete: async (storeId: string, collectionId: string) => {
        await api.delete(VENDOR_API.collection.delete(storeId, collectionId));
    },
};

export default collectionApi;
