import { createQrCodes } from '../src/qrcode-monkey'

createQrCodes()([{ data: 'https://example.com', path: 'example.png' }])
