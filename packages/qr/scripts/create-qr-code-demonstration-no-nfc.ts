import { createQrCode } from '../src/qrcode-monkey-no-nfc'
;[
  { data: 'https://menuo.app/menu/#/demo?table=1&qr=181', path: '181.png' },
  { data: 'https://menuo.app/menu/#/demo?table=1&qr=182', path: '182.png' },
  { data: 'https://menuo.app/menu/#/demo?table=1&qr=183', path: '183.png' },
].map(createQrCode())
