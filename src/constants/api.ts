export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const VENDOR_URL = `${BASE_URL}/vendor`;

export const SHARED_API = {
    // Auth
    auth: {
        logout: `${BASE_URL}/auth/logout`,
        refreshToken: `${BASE_URL}/auth/refresh-token`,
    },

    // User
    user: {
        getMe: `${BASE_URL}/users/me`,
    },

    // Media
    media: {
        uploadImage: `${BASE_URL}/media/images`,
    },
};

export const VENDOR_API = {
    // Auth
    auth: {
        login: `${VENDOR_URL}/auth/login`,
    },

    // Store
    store: {
        getAll: `${VENDOR_URL}/stores`,
        create: `${VENDOR_URL}/stores`,
    },

    // Collection
    collection: {
        getAll: (storeId: string) =>
            `${VENDOR_URL}/stores/${storeId}/collections`,
        create: (storeId: string) =>
            `${VENDOR_URL}/stores/${storeId}/collections`,
        delete: (storeId: string, collectionId: string) =>
            `${VENDOR_URL}/stores/${storeId}/collections/${collectionId}`,
    },
};
