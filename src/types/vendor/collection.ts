export interface Collection {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    storeId: string;
}
