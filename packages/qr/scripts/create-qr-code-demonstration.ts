import { createQrCode } from '../src/qrcode-monkey'
;[
  { data: 'https://menuo.app/menu/#/demo?table=1&qr=181', path: '181.png' },
  { data: 'https://menuo.app/menu/#/demo?table=1&qr=182', path: '182.png' },
  { data: 'https://menuo.app/menu/#/demo?table=1&qr=183', path: '183.png' },
  { data: 'https://menuo.app/menu/#/demo?table=1&qr=184', path: '184.png' },
  { data: 'https://menuo.app/menu/#/demo?table=1&qr=185', path: '185.png' },
  { data: 'https://menuo.app/menu/#/demo?table=1&qr=186', path: '186.png' },
  { data: 'https://menuo.app/menu/#/demo?table=1&qr=187', path: '187.png' },
  { data: 'https://menuo.app/menu/#/demo?table=1&qr=188', path: '188.png' },
  { data: 'https://menuo.app/menu/#/demo?table=1&qr=189', path: '189.png' },
  { data: 'https://menuo.app/menu/#/demo?table=1&qr=190', path: '190.png' },
].map(createQrCode())
