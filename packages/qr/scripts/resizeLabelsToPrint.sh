FILES="EnReplacedQr/*"
for f in $FILES
do
	convert $f -resize 62% $f
done

FILES="PlReplacedQr/*"
for f in $FILES
do
	convert $f -resize 62% $f
done

rm -r QrGoodSize
