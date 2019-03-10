'use strict';

const fs = require('fs');
const BMP = require('../index');
const transformer = require('../transforms');

describe('bitmap transformations', () => {
  it('should process a valid bitmap file', () => {
      let file = __dirname + '/../assets/baldy.bmp';

      function runTest(){
          let buffer = fs.readFileSync(file);
          return buffer.toString('utf-8', 0, 2);
      }

      expect(runTest()).toEqual('BM');
  });

  test('greyscale transformation test - each color in an array should be the average of the RGB value', () => {
    let test = true;
    let testBmp = new BMP.Bitmap();
    testBmp.colorArray = [[150, 100, 200, 100]];

    transformer.transformGrey(testBmp, test);

    expect(testBmp.colorArray[0][0]).toEqual(150);
    expect(testBmp.colorArray[0][1]).toEqual(150);
    expect(testBmp.colorArray[0][2]).toEqual(150);
  });

  test('blue transformation test - each blue value (position 0) in an array should be 255', () => {
    let test = true;
    let testBmp = new BMP.Bitmap();
    testBmp.colorArray = [[150, 100, 200, 100]];

    transformer.transformBlue(testBmp, test);

    expect(testBmp.colorArray[0][0]).toEqual(255);
    expect(testBmp.colorArray[0][1]).toEqual(100);
    expect(testBmp.colorArray[0][2]).toEqual(200);
  });

  test('acid transformation test - since this is random, we are mainly testing to see if the array items have changed and are <= 255', () => {
    let test = true;
    let testBmp = new BMP.Bitmap();
    let original = [150, 100, 200];
    testBmp.colorArray = [[...original]];

    transformer.transformAcid(testBmp, test);

    original.forEach((value, index) => {
      expect(testBmp.colorArray[0][index]).not.toBe(value);
      expect(testBmp.colorArray[0][index]).toBeLessThanOrEqual(255);
    });
  });

  test('inverted transformation test - RGB values in array should be subtracted from 255', () => {
    let test = true;
    let testBmp = new BMP.Bitmap();
    let original = [0, 0, 0];
    testBmp.colorArray = [[...original]];

    transformer.transformInvert(testBmp, test);

    original.forEach((value, index) => {
      expect(testBmp.colorArray[0][index]).not.toBe(value);
      expect(testBmp.colorArray[0][index]).toBe(255);
    });
  });
});