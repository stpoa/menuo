import json

with open('./data/restaurant.json', 'r') as f:
    tables = json.load(f)

links = open('./scripts/create-qr-code-restaurant.ts', 'w')
links.write('import { createQrCode } from \'../src/qrcode-monkey-no-nfc\'\n;[\n')
for i in tables:
    links.write('  { data: \'https://menuo.app/menu/#/bistropodwawelem?table=' + i + '&qr=1\', path: \'' + i + '.png\' },\n')
links.write('].map(createQrCode())\n')
links.close()
