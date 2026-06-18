import { SHARED_API } from "@/constants/api";
import api from "@/lib/api";

const mediaApi = {
    // Upload image
    uploadImage: async (formdata: FormData) => {
        const response = await api.post(SHARED_API.media.uploadImage, formdata);
        return response.data;
    },
};

export default mediaApi;
