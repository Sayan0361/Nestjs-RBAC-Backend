export interface PageinationMetaFormat {
    currentPage : number;
    itemsPerPage : number;
    totalItems : number;
    totalPages : number;
    hasPreviousPage : boolean;
    hasNextPage : boolean
}

export interface PaginatedResponse<T> {
    items : T[],
    meta : PageinationMetaFormat
}