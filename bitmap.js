'use strict';

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

    console.log(this)
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
 * Bitmap -- receives a file name, used in the transformer to note the new buffer
 * @param filePath
 * @constructor
 */
// function Bitmap(filePath) {
//   this.file = filePath;
// }

/**
 * Parser -- accepts a buffer and will parse through it, according to the specification, creating object properties for each segment of the file
 * @param buffer
 */
// Bitmap.prototype.parse = function(buffer) {
//   this.buffer = buffer;
//   this.type = buffer.toString('utf-8', 0, 2);
//   this.offset = buffer.readInt32LE(10);
//   this.colorData = buffer.slice(54, this.offset);
//   this.colorArray = colorTable(buffer, this.offset);
//   this.pixelArray = buffer.slice(1078);
//   if (!this.colorArray.length){
//     throw 'Invalid .bmp format';
//   }
// };

// const colorTable = (buffer, offset) => {
//   let colorData = JSON.stringify(buffer.slice(54, offset));
//   let colorDataParsed = JSON.parse(colorData).data;
//
//   let newColorArray = [];
//   for(let i = 0; i < (colorDataParsed.length / 4); i++) {
//     let start = i * 4;
//     newColorArray.push(colorDataParsed.slice(start, start + 4));
//   }
//   return newColorArray;
// };

/**
 * Transform a bitmap using some set of rules. The operation points to some function, which will operate on a bitmap instance
 * @param operation
 */
// Bitmap.prototype.transform = function(operation) {
//   // This is really assumptive and unsafe
//   transforms[operation](this);
//   this.newFile = this.file.replace(/\.bmp/, `.${operation}.bmp`);
// };

module.exports = Bitmap;