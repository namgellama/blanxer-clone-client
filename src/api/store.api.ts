import { VENDOR_API } from "@/constants/api";
import api from "@/lib/api";
import { CreateStoreFormFields } from "@/validations/store.validation";
import { useQuery } from "@tanstack/react-query";

const storeApi = {
    // Get all
    getAll: async () => {
        const response = await api.get(VENDOR_API.store.getAll);
        return response.data;
    },

    // Create
    create: async (data: CreateStoreFormFields) => {
        const response = await api.post(VENDOR_API.store.create, data);
        return response.data;
    },
};

export default storeApi;
