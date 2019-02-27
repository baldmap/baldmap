'use strict';

const fs = require('fs');

/**
 * Bitmap -- receives a file name, used in the transformer to note the new buffer
 * @param filePath
 * @constructor
 */
function Bitmap(filePath) {
  this.file = filePath;
}

/**
 * Parser -- accepts a buffer and will parse through it, according to the specification, creating object properties for each segment of the file
 * @param buffer
 */
Bitmap.prototype.parse = function(buffer) {
  this.buffer = buffer;
  this.type = buffer.toString('utf-8', 0, 2);
  this.offset = buffer.readInt32LE(10);
  this.colorData = buffer.slice(54, this.offset);
  this.colorArray = colorTable(buffer, this.offset);
  this.pixelArray = buffer.slice(1078);
  if (!this.colorArray.length){
    throw 'Invalid .bmp format';
  }
};

const colorTable = (buffer, offset) => {
  let colorData = JSON.stringify(buffer.slice(54, offset));
  let colorDataParsed = JSON.parse(colorData).data;

  let newColorArray = [];
  for(let i = 0; i < (colorDataParsed.length / 4); i++) {
    let start = i * 4;
    newColorArray.push(colorDataParsed.slice(start, start + 4));
  }
  return newColorArray;
};

/**
 * Transform a bitmap using some set of rules. The operation points to some function, which will operate on a bitmap instance
 * @param operation
 */
Bitmap.prototype.transform = function(operation) {
  // This is really assumptive and unsafe
  transforms[operation](this);
  this.newFile = this.file.replace(/\.bmp/, `.${operation}.bmp`);
};

/**
 * Sample Transformer (greyscale)
 * Would be called by Bitmap.transform('greyscale')
 * Pro Tip: Use "pass by reference" to alter the bitmap's buffer in place so you don't have to pass it around ...
 * @param bmp
 */
const transformGreyscale = (bmp) => {
  if(bmp.type !== 'BM') throw 'Invalid .bmp format';
  console.log('Transforming bitmap into greyscale', bmp);

  

};

const transformBlue = (bitmap) => {
  let colorArray = bitmap.colorArray;
  for (let i = 0; i < colorArray.length; i++) {
    colorArray[i][0] = 255;
  }
  console.log('I\'m Blue!');

  let rewriteOffset = 54;
  colorArray.forEach(arr => {
    for (let i = 0; i < arr.length; i++) {
      bitmap.buffer[rewriteOffset] = arr[i];
      rewriteOffset++;
    }
  });
};

const doTheInversion = (bmp) => {
  bmp = {};
}

/**
 * A dictionary of transformations
 * Each property represents a transformation that someone could enter on the command line and then a function that would be called on the bitmap to do this job
 */
const transforms = {
  greyscale: transformGreyscale,
  invert: doTheInversion,
  blue: transformBlue
};

// ------------------ GET TO WORK ------------------- //

function transformWithCallbacks() {

  fs.readFile(file, (err, buffer) => {

    if (err) {
      throw err;
    }
    bitmap.parse(buffer);
    bitmap.transform(operation);

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



