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
    axiosOptions: any;
}

export interface User {
    idUsuario: number;
    idEmpresa: number;
    nmUsuario: string;
    dsLogin: string;
    flSituacao: string;
    dsSenha: string;
    dsSituacao: string;
    dtValidade: string;
    idRole: number;
    dsEmail: string;
}

export interface ProductAttributeType {
    idTipo: number;
    nmTipo: string;
    flTipo: string;
}

export interface Product {
    idProduto: number;
}

export interface Stock {
    idControle: number;
    qtEstoque: string;
}

export interface City {
    
}
