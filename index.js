'use strict';

const fs = require('fs');
const transformer = require('./transforms.js');

class Bitmap{
  constructor(filePath){
    this.file = filePath;
  }
  parse(buffer){
    this.buffer = buffer;
    this.type = buffer.toString('utf-8', 0, 2);
    this.offset = buffer.readInt32LE(10);
    this.colorData = buffer.slice(54, this.offset);
    this.colorArray = this.colorTable(buffer, this.offset);
    this.pixelArray = buffer.slice(1078);
    if (!this.colorArray.length){
      throw 'Invalid .bmp format';
    }
  }
  colorTable(buffer, offset){
    let colorData = JSON.stringify(buffer.slice(54, offset));
    let colorDataParsed = JSON.parse(colorData).data;

    let newColorArray = [];
    for(let i = 0; i < (colorDataParsed.length / 4); i++) {
      let start = i * 4;
      newColorArray.push(colorDataParsed.slice(start, start + 4));
    }
    return newColorArray;
  }

  transform(operation){
    // This is really assumptive and unsafe
    transforms[operation](this);
    this.newFile = this.file.replace(/\.bmp/, `.${operation}.bmp`);
  }
}

/**
 * A dictionary of transformations
 * Each property represents a transformation that someone could enter on the command line and then a function that would be called on the bitmap to do this job
 */
const transforms = {
  grey: transformer.transformGrey,
  invert: transformer.transformInvert,
  blue: transformer.transformBlue,
  acid: transformer.transformAcid
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



