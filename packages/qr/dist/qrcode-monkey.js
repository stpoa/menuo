"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const decomposeUrlParams = (url) => Object.fromEntries([...new URL(url).searchParams.entries()]);
exports.createQrCode = (config) => ({ path, data }) => {
    const defaultParams = decomposeUrlParams('https://qr-generator.qrcode.studio/qr/custom?download=true&file=png&data=https%3A%2F%2Fwww.qrcode-monkey.com&size=1000&config=%7B%22body%22%3A%22mosaic%22%2C%22eye%22%3A%22frame0%22%2C%22eyeBall%22%3A%22ball19%22%2C%22erf1%22%3A%5B%5D%2C%22erf2%22%3A%5B%5D%2C%22erf3%22%3A%5B%5D%2C%22brf1%22%3A%5B%5D%2C%22brf2%22%3A%5B%22fh%22%5D%2C%22brf3%22%3A%5B%22fv%22%5D%2C%22bodyColor%22%3A%22%23000000%22%2C%22bgColor%22%3A%22%23FFFFFF%22%2C%22eye1Color%22%3A%22%23000000%22%2C%22eye2Color%22%3A%22%23000000%22%2C%22eye3Color%22%3A%22%23000000%22%2C%22eyeBall1Color%22%3A%22%23000000%22%2C%22eyeBall2Color%22%3A%22%23000000%22%2C%22eyeBall3Color%22%3A%22%23000000%22%2C%22gradientColor1%22%3A%22%22%2C%22gradientColor2%22%3A%22%22%2C%22gradientType%22%3A%22linear%22%2C%22gradientOnEyes%22%3A%22true%22%2C%22logo%22%3A%22%22%2C%22logoMode%22%3A%22default%22%7D');
    const params = {
        ...defaultParams,
        file: path.split('.').reverse()[0],
        data,
        config: JSON.stringify({ ...JSON.parse(defaultParams.config), ...config }),
    };
    const url = 'https://qr-generator.qrcode.studio/qr/custom?' +
        new URLSearchParams(params).toString();
    https_1.default.get(url, res => res.pipe(fs_1.default.createWriteStream(path)));
};
exports.createQrCodes = (config) => (entries) => entries.map(exports.createQrCode(config));
//# sourceMappingURL=qrcode-monkey.js.map