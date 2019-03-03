'use strict';

// const program = require('../index.js');

const fs = require('fs');

describe('bitmap transformations', () => {
    it('should process a valid bitmap file', () => {
        let file = __dirname + '/../assets/baldy.bmp';
        console.log('Path: '+ file);

        function runTest(){
            let buffer = fs.readFileSync(file);
            let output = buffer.toString('utf-8', 0, 2);

            console.log(output);
            return output;
        }

        expect(runTest()).toEqual('BM');
    });
});