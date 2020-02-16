import { createQrCode } from '../src/qrcode-monkey'

[{ data: 'https://example.com', path: 'example.png' }].map(createQrCode())
