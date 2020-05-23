import json

with open('../data/demonstration.json', 'r') as f:
    tables = json.load(f)

links = open('create-qr-code-demonstration.ts', 'w')
links.write('import { createQrCode } from \'../src/qrcode-monkey\'\n;[\n')
for i in tables:
    links.write('  { data: \'https://menuo.app/menu/#/demo?table=1&qr=1' + i + '\', path: \'1' + i + '.png\' },\n')
links.write('].map(createQrCode())\n')
links.close()
