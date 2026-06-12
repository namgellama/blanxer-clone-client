import { VENDOR_API } from "@/constants/api";
import api from "@/lib/api";

const collectionApi = {
    // Get all
    getAll: async (storeId: string) => {
        const response = await api.get(VENDOR_API.collection.getAll(storeId));
        return response.data;
    },
};

export default collectionApi;
