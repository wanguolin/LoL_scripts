#!/bin/bash
IFS=$(echo -en "\n\b")
echo IFS

for file in $(find $1 -type d -name "*【52BT论坛】【DGC系列】*")
do
	echo $file
	base=${file/【52BT论坛】【DGC系列】/}
	mv $file $base
done
