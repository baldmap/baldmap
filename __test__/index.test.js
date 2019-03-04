'use strict';

const fs = require('fs');

describe('bitmap transformations', () => {
    it('should process a valid bitmap file', () => {
        let file = __dirname + '/../assets/baldy.bmp';

        function runTest(){
            let buffer = fs.readFileSync(file);
            return buffer.toString('utf-8', 0, 2);
        }


        expect(runTest()).toEqual('BM');
    });
});