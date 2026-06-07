export type UserStoreRole = "OWNER" | "MANAGER" | "STAFF";

export interface Store {
    id: string;
    name: string;
    slug: string;
    email: string;
    contactNumber: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
    userRole: UserStoreRole;
}
