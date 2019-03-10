![CF](http://i.imgur.com/7v5ASc8.png) LAB 05
=================================================

##  baldMap [![Build Status](https://www.travis-ci.com/baldmap/baldmap.svg?branch=master)](https://www.travis-ci.com/baldmap/baldmap)

### Author: GB, SB, JE, HN

### Links and Resources
* [repo](https://github.com/baldmap)
* [travis](https://www.travis-ci.com/baldmap/baldmap)

### Modules
#### `transform.js`
##### Exported Values and Methods

###### `transformGreyscale(bitmap)`
Takes in a bitmap object and uses it's color array to make alterations to the bitmap's buffer. For each color in the color array we apply a grey-scaling formula of (R + G + B)/3. It then calls a rewrite function to write over the original buffer with the new color array. 

###### `transformBlue(bitmap)`
Takes in a bitmap object and uses it's color array to make alterations to the bitmap's buffer. For each color in the color array we max out the blue value by setting it to 255. It then calls a rewrite function to write over the original buffer with the new color array.

###### `transformInvert(bitmap)`
Takes in a bitmap object and uses it's color array to make alterations to the bitmap's buffer. For each color in the color array we take each RGB value and reassign it to (255 - RGB value). It then calls a rewrite function to write over the original buffer with the new color array.

###### `transformAcid(bitmap)`
Takes in a bitmap object and uses it's color array to make alterations to the bitmap's buffer. For each color in the color array we assign each RGB value  a random number between 0 and 255. It then calls a rewrite function to write over the original buffer with the new color array.  

### Setup
#### Running the app
* `node index.js ./assets/baldy.bmp {transform}`
* Transform: `grey`
  * Creates a new .bmp file that is grey-scaled.
* Transform: `blue`
  * Creates a new .bmp file that is blue-scaled.
* Transform: `invert`
  * Creates a new .bmp file that is color-inverted.
* Transform: `acid`
  * Creates a new .bmp file that has completely random color values.
  
#### Tests
* `jest index.test.js`
* We made sure that our code only processes a valid bitmap file by checking the file type ('BM') in the header of the file.