# to run use script "python QrCodeGenarator.py restaurant_name" and put at the same folder file tables.json

import qrcode
from qrcode.image.pure import PymagingImage
import os
import argparse
import json

qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)
qr.add_data('Some data')
qr.make(fit=True)
img = qr.make_image(fill_color="black", back_color="white")

parser = argparse.ArgumentParser()
parser.add_argument('resturant_name')
args = parser.parse_args()
resturant_name = str(args.resturant_name)

with open('tables.json') as f:
	data = json.load(f)

path = resturant_name + '_QR'
os.mkdir(path)

for table in range (len(data)):
	linkToQr = 'https://menuo.app/menu/#/' + resturant_name + '?table=' + str(data[table])
	fileName = path + '/' + str(data[table])+ '.png'
	img = qrcode.make(linkToQr, image_factory=PymagingImage)
	with open(fileName, 'wb') as f:
		img.save(f)