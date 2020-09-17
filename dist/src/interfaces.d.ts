export interface ApiResponse<T> {
    message: string;
    data: T;
}
export interface APIOptions {
    baseURL: string;
    accessToken: string;
    httpsAgent: string;
    httpAgent: string;
    debug: boolean;
}
export interface User {
    created_at?: Date;
    updated_at?: Date;
}
export interface City {
}
