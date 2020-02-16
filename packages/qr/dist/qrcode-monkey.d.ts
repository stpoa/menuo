interface QRPathData {
    path: string;
    data: string;
}
export declare const createQrCode: (config?: any) => ({ path, data }: QRPathData) => void;
export declare const createQrCodes: (config?: any) => (entries: QRPathData[]) => void[];
export {};
