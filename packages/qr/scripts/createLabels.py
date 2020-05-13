import PIL
from PIL import Image
import os
import shutil

mywidth = 316

if (os.path.exists("./data/QrGoodSize") == False):
	os.mkdir("./data/QrGoodSize")

path = os.listdir("./data/QrTooLarge")

for i in path:
	pathToOpen = "./data/QrTooLarge/" + i
	img = Image.open(pathToOpen)
	wpercent = (mywidth/float(img.size[0]))
	hsize = int((float(img.size[1])*float(wpercent)))
	img = img.resize((mywidth,hsize), PIL.Image.ANTIALIAS)
	pathToSave = "./data/QrGoodsize/" + i
	img.save(pathToSave)

if (os.path.exists("./data/EnReplacedQr") == False):
	os.mkdir("./data/EnReplacedQr")

im1 = Image.open('./data/EN.png')
path = os.listdir("./data/QrGoodSize")
for i in path:
	pathToOpen = "./data/QrGoodSize/" + i
	im2 = Image.open(pathToOpen)
	back_im = im1.copy()
	back_im.paste(im2, (62,180))
	pathToSave = "./data/EnReplacedQr/LabelEn" + i
	back_im.save(pathToSave, quality=100)
im1.close()
back_im.close()

if (os.path.exists("./data/PlReplacedQr") == False):
	os.mkdir("./data/PlReplacedQr")

im1 = Image.open("./data/PL.png")
path = os.listdir("./data/QrGoodSize")
for i in path:
	pathToOpen = "./data/QrGoodSize/" + i
	im2 = Image.open(pathToOpen)
	back_im = im1.copy()
	back_im.paste(im2, (62,180))
	pathToSave = "./data/PlReplacedQr/LabelPl" + i
	back_im.save(pathToSave, quality=100)
im1.close()
back_im.close()

shutil.rmtree("./data/QrGoodSize",ignore_errors=False, onerror=None)
