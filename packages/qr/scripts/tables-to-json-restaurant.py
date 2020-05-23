import json

with open('./data/restaurant.json', 'r') as f:
    tables = json.load(f)

links = open('./scripts/create-qr-code-restaurant.ts', 'w')
links.write('import { createQrCode } from \'../src/qrcode-monkey\'\n;[\n')
for i in tables:
    links.write('  { data: \'https://menuo.app/menu/#/demo?table=' + i + '\', path: \'' + i + '.png\' },\n')
links.write('].map(createQrCode())\n')
links.close()
