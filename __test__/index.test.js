'use strict';

// const program = require('../index.js');

const fs = require('fs');

describe('bitmap transformations', function () {
    it('should process a valid bitmap file', function () {
        let output = '';
        let file = '/baldy.bmp';
        const runTest = function (){
            let buffer = fs.readFile(file, (error, buffer) => {
                console.log(file)
               if(error) console.error(error);
            });
            output =  buffer.toString('utf-8', 0, 2);
            // return output;
        }
        runTest();
        expect(output).toEqual('BM');
    });
});