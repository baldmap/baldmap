'use strict';

/**
 * Sample Transformer (greyscale)
 * Would be called by Bitmap.transform('greyscale')
 * Pro Tip: Use "pass by reference" to alter the bitmap's buffer in place so you don't have to pass it around ...
 * @param bmp
 */
const transformGrey = (bitmap, test) => {
  if(bitmap.type !== 'BM' && !test) throw 'Invalid .bmp format';
  console.log('Transforming bitmap into greyscale');
  let colorArray = bitmap.colorArray;
  console.log(colorArray.length)
  for (let i = 0; i < colorArray.length; i++) {
    if (i > 0 || test) {
      let grey = Math.floor((colorArray[i][0] + colorArray[i][1] + colorArray[i][2]) / 3);
      colorArray[i][0] = grey;
      colorArray[i][1] = grey;
      colorArray[i][2] = grey;
    }
  }
  if (!test) rewrite(colorArray, bitmap);
};

const transformBlue = (bitmap, test) => {
  let colorArray = bitmap.colorArray;
  for (let i = 0; i < colorArray.length; i++) {
    if(i > 0 || test) colorArray[i][0] = 255;
  }
  console.log('I\'m Blue!');
  if (!test) rewrite(colorArray, bitmap);
};

const transformAcid = (bitmap, test) => {
  if(bitmap.type !== 'BM' && !test) throw 'Invalid .bmp format';
  console.log('Transforming bitmap into acid');
  let colorArray = bitmap.colorArray;
  for (let i = 0; i < colorArray.length; i++) {
    if (i > 0 || test) {
      colorArray[i][0] = Math.floor(Math.random() * 256);
      colorArray[i][1] = Math.floor(Math.random() * 256);
      colorArray[i][2] = Math.floor(Math.random() * 256);
    }
  }
  if(!test) rewrite(colorArray, bitmap);
};

const transformInvert = (bitmap, test) => {
  if(bitmap.type !== 'BM' && !test) throw 'Invalid .bmp format';
  console.log('Inverting bitmap');
  let colorArray = bitmap.colorArray;
  for (let i = 0; i < colorArray.length; i++) {
    if (i > 0 || test) {
      colorArray[i][0] = 255 - colorArray[i][0];
      colorArray[i][1] = 255 - colorArray[i][1];
      colorArray[i][2] = 255 - colorArray[i][2];
    }
  }
  if(!test) rewrite(colorArray, bitmap);
};

const rewrite = (colorArray, bitmap) => {
  let rewriteOffset = 54;
  colorArray.forEach(arr => {
    for (let i = 0; i < arr.length; i++) {
      bitmap.buffer[rewriteOffset] = arr[i];
      rewriteOffset++;
    }
  });
};

module.exports = {transformGrey, transformBlue, transformAcid, transformInvert};