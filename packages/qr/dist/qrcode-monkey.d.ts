export interface QRPathData {
    path: string;
    data: string;
}
export declare const getFolderPath: (path: string) => string;
export declare const createQrCode: (parameters?: {}) => ({ path, data, }: QRPathData) => Promise<void>;
