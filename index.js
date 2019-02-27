'use strict';

const fs = require('fs');
const Bitmap = require('./bitmap.js');

/**
 * Sample Transformer (greyscale)
 * Would be called by Bitmap.transform('greyscale')
 * Pro Tip: Use "pass by reference" to alter the bitmap's buffer in place so you don't have to pass it around ...
 * @param bmp
 */
const transformGreyscale = (bmp) => {
  if(bmp.type !== 'BM') throw 'Invalid .bmp format';
  console.log('Transforming bitmap into greyscale', bmp);
  let colorArray = bitmap.colorArray;
  for (let i = 0; i < colorArray.length; i++) {
    if (i > 0) {
      let grey = Math.floor((colorArray[i][0] + colorArray[i][1] + colorArray[i][2]) / 3);
      colorArray[i][0] = grey;
      colorArray[i][1] = grey;
      colorArray[i][2] = grey;
    }

  }
  rewrite(colorArray);
};

const transformBlue = (bitmap) => {
  let colorArray = bitmap.colorArray;
  for (let i = 0; i < colorArray.length; i++) {
    if(i > 0) colorArray[i][0] = 255;
  }
  console.log('I\'m Blue!');
  rewrite(colorArray);
};

const transformAcid = (bitmap) => {
  if(bitmap.type !== 'BM') throw 'Invalid .bmp format';
  console.log('Transforming bitmap into acid');
  let colorArray = bitmap.colorArray;
  for (let i = 0; i < colorArray.length; i++) {
    if (i > 0) {
      colorArray[i][0] = Math.floor(Math.random() * 256);
      colorArray[i][1] = Math.floor(Math.random() * 256);
      colorArray[i][2] = Math.floor(Math.random() * 256);
    }
  }
  rewrite(colorArray);
};

const doTheInversion = (bitmap) => {
  if(bitmap.type !== 'BM') throw 'Invalid .bmp format';
  console.log('Transforming bitmap into greyscale');
  let colorArray = bitmap.colorArray;
  for (let i = 0; i < colorArray.length; i++) {
    if (i > 0) {
      colorArray[i][0] = 255 - colorArray[i][0];
      colorArray[i][1] = 255 - colorArray[i][1];
      colorArray[i][2] = 255 - colorArray[i][2];
    }
  }
  rewrite(colorArray);
};

const rewrite = (colorArray) => {
  let rewriteOffset = 54;
  colorArray.forEach(arr => {
    for (let i = 0; i < arr.length; i++) {
      bitmap.buffer[rewriteOffset] = arr[i];
      rewriteOffset++;
    }
  });
};



/**
 * A dictionary of transformations
 * Each property represents a transformation that someone could enter on the command line and then a function that would be called on the bitmap to do this job
 */
const transforms = {
  greyscale: transformGreyscale,
  invert: doTheInversion,
  blue: transformBlue,
  acid: transformAcid
};

// ------------------ GET TO WORK ------------------- //

function transformWithCallbacks() {

  fs.readFile(file, (err, buffer) => {

    if (err) {
      throw err;
    }
    bitmap.parse(buffer);
    // bitmap.transform(operation);

    // Note that this has to be nested!
    // Also, it uses the bitmap's instance properties for the name and thew new buffer
    fs.writeFile(bitmap.newFile, bitmap.buffer, (err, out) => {
      if (err) {
        throw err;
      }
      console.log(`Bitmap Transformed: ${bitmap.newFile}`);
    });

  });
}

// TODO: Explain how this works (in your README)
const [file, operation] = process.argv.slice(2);

let bitmap = new Bitmap(file);

transformWithCallbacks();




