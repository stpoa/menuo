import PIL
from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw
import os
import shutil

mywidth = 316

parentDir = os.path.dirname(os.getcwd())

if (os.path.exists(parentDir + "/qr/data/Stickers") == False):
	os.mkdir(parentDir + "/qr/data/Stickers")

im1 = Image.open(parentDir + "/qr/data/Sticker.png")
path = os.listdir(parentDir + "/qr/data/QrTooLarge")
for i in path:
	pathToOpen = parentDir + "/qr/data/QrTooLarge/" + i
	im2 = Image.open(pathToOpen)
	back_im = im1.copy()
	back_im.paste(im2, (8,100))
	pathToSave = parentDir + "/qr/data/Stickers/Sticker" + i
	ImageDraw.Draw(
    back_im
	).text(
	    (320,410),
	    i[:-4],
	    (0,0,0)
	)
	back_im.save(pathToSave, quality=100)
im1.close()
back_im.close()

if (os.path.exists(parentDir + "/qr/data/QrGoodSize") == False):
	os.mkdir(parentDir + "/qr/data/QrGoodSize")

for i in path:
	pathToOpen = parentDir + "/qr/data/QrTooLarge/" + i
	img = Image.open(pathToOpen)
	wpercent = (mywidth/float(img.size[0]))
	hsize = int((float(img.size[1])*float(wpercent)))
	img2 = img.copy()
	img2 = img.resize((mywidth,hsize), PIL.Image.ANTIALIAS)
	pathToSave = parentDir + "/qr/data/QrGoodSize/" + i
	img2.save(pathToSave)

if (os.path.exists(parentDir + "/qr/data/EnReplacedQr") == False):
	os.mkdir(parentDir + "/qr/data/EnReplacedQr")

im1 = Image.open(parentDir + "/qr/data/EN.png")
path = os.listdir(parentDir + "/qr/data/QrGoodSize")
for i in path:
	pathToOpen = parentDir + "/qr/data/QrGoodSize/" + i
	im2 = Image.open(pathToOpen)
	back_im = im1.copy()
	back_im.paste(im2, (62,180))
	pathToSave = parentDir + "/qr/data/EnReplacedQr/LabelEn" + i
	ImageDraw.Draw(
    back_im
	).text(
	    (400,580),
	    i[:-4],
	    (0,0,0)
	)
	back_im.save(pathToSave, quality=100)
im1.close()
back_im.close()

if (os.path.exists(parentDir + "/qr/data/PlReplacedQr") == False):
	os.mkdir(parentDir + "/qr/data/PlReplacedQr")

im1 = Image.open(parentDir + "/qr/data/PL.png")
path = os.listdir(parentDir + "/qr/data/QrGoodSize")
for i in path:
	pathToOpen = parentDir + "/qr/data/QrGoodSize/" + i
	im2 = Image.open(pathToOpen)
	back_im = im1.copy()
	back_im.paste(im2, (62,180))
	pathToSave = parentDir + "/qr/data/PlReplacedQr/LabelPl" + i
	ImageDraw.Draw(
    back_im
	).text(
	    (400,580),
	    i[:-4],
	    (0,0,0)
	)
	back_im.save(pathToSave, quality=100)
im1.close()
back_im.close()

shutil.rmtree(parentDir + "/qr/data/QrGoodSize", ignore_errors=False, onerror=None)
shutil.rmtree(parentDir + "/qr/data/QrTooLarge", ignore_errors=False, onerror=None)
