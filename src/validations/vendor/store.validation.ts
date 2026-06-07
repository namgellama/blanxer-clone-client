import { z } from "zod";

const createStore = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(255, "Name  must be at most 255 characters."),
    email: z.email().trim(),
    contactNumber: z
        .string()
        .trim()
        .min(10, "Contact number must be 10 digits")
        .max(10, "Contact number must be 10 digits"),
    address: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(255, "Name  must be at most 255 characters."),
});

const storeValidation = {
    createStore,
};

export default storeValidation;

export type CreateStoreFormFields = z.infer<typeof createStore>;
