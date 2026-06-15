export interface PaginatedResponse<T> {
    page: number;
    pageSize: number;
    totalPages: number;
    total: number;
    hasNext: boolean;
    data: T[];
}
