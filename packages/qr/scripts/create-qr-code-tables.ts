import { createQrCode } from '../src/qrcode-monkey'
;[
  { data: 'https://menuo.app/menu/#/demo?table=1', path: '1.png' },
  { data: 'https://menuo.app/menu/#/demo?table=2', path: '2.png' },
  { data: 'https://menuo.app/menu/#/demo?table=3', path: '3.png' },
  { data: 'https://menuo.app/menu/#/demo?table=4', path: '4.png' },
  { data: 'https://menuo.app/menu/#/demo?table=5', path: '5.png' },
].map(createQrCode())
