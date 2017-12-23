[![npm](https://img.shields.io/npm/v/image-proxessor.svg)](https://www.npmjs.com/package/image-proxessor)
[![Node version](https://img.shields.io/node/v/image-proxessor.svg?style=flat)](http://nodejs.org/download/)
[![npm](https://img.shields.io/npm/l/image-proxessor.svg)](https://github.com/DarthCoder117/image-proxessor/blob/master/LICENSE)

# image-proxessor
Express middleware to resize images on-demand as they're retrieved. Currently uses Lovell Fuller's excellent sharp library for processing. No more generating a ton of different thumbnails at upload time. Just send your image through image-proxessor and receive the processed image on the other end.

## Usage

Install through NPM or yarn

[![NPM](https://nodei.co/npm/image-proxessor.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/image-proxessor/)

```
npm install --save image-proxessor
```

Attach to Express as middleware passing the original image's base URL, and the options for processing.

```
const express = require('express');
const app = express();
const imageProxessor = require('image-proxessor');

app.use('/medium', resizer({
  baseUrl: 'http://where-my-original-images-are-hosted',
  resize: {
    width: 200,
    height: 200
  }
}));

app.listen(4309);
```
## Options

The following options are available to configure image-proxessor:

```
/**
 * The base URL where the original images are hosted.
 */
baseUrl:string;
resize?: {
  width?: number;
  height?: number;
},
transform?: {
  rotate?: number;
  flipX?: boolean;
  flipY?: boolean;
},
effects?: {
  blur?: boolean|number;
  grayscale?: boolean;
},
output?: {
  /**
   * Either 'jpeg'/'jpg' or 'png'
   */
  format: string;
  quality?: number;
  progressive?: boolean;
}
```

## License

MIT License

Copyright (c) 2017 Tanner Mickelson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

