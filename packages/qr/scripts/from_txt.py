# to run use script "python from_txt.py restaurant_name" and put at the same folder file restaurant_name.txt with each table number on subsequent lines
# works only when table ID is just number without letters

import qrcode
from qrcode.image.pure import PymagingImage
import os
import shutil
import argparse

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
fileTables = resturant_name + '.txt'

tables = []
f = open(fileTables, "r")
for x in f:
	y = int(x)
	tables.append(y)
f.close()

#resturant_name = 'wrega'
path = resturant_name + '_QR'
if os.path.isdir(path):
	shutil.rmtree(path)
os.mkdir(path)

for table in tables:
	linkToQr = 'https://menuo.app/menu/#/' + resturant_name + '?table=' + str(table)
	fileName = path + '/' + str(table )+ '.png'
	img = qrcode.make(linkToQr, image_factory=PymagingImage)
	with open(fileName, 'wb') as f:
		img.save(f)
