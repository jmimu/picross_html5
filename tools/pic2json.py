#!/usr/bin/python2
import Image
im = Image.open("../pics/test002.png")

if (im.size[0]!=im.size[1]):
  print "Error: image must be square!"
  exit(-1)

size=im.size[0]

pixels=[]
#im.load()
n=0
for d in im.getdata():
  if (n%size==0):
    pixels.append([])
  if (d==(0,0,0)):
    pixels[-1].append(1)
  else:
    pixels[-1].append(0)
  n+=1

print(pixels)

