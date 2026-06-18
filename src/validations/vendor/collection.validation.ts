import { z } from "zod";

const createCollection = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(255, "Name must be at most 255 characters"),
    image: z.url().nonempty("Image is required"),
});

const collectionValidation = {
    createCollection,
};

export default collectionValidation;

export type CreateCollectionFormFields = z.infer<typeof createCollection>;
