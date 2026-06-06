export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const VENDOR_URL = `${BASE_URL}/vendor`;

export const VENDOR_API = {
    // Auth
    auth: {
        login: `${VENDOR_URL}/auth/login`,
        refreshToken: `${VENDOR_URL}/auth/refresh-token`,
    },

    // User
    user: {
        getMe: `${VENDOR_URL}/users/me`,
    },

    // Store
    store: {
        create: `${VENDOR_URL}/stores`,
    },
};
