#!/bin/bash
IFS=$(echo -en "\n\b")
echo IFS

for file in $(find $1 -type f)
do
	base=${file%.*}
	cwebp -af -q $2 $file -o $base.webp
done
