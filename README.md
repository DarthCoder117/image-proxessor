# image-proxessor
Proxy images through express middleware to process them before display.

## Usage

Install through NPM or yarn

```
npm install --save image-proxessor
```

Attach to Express as middleware passing the original image's base URL, and the options for resize (only width and height supported currently)

```
const express = require('express');
const app = express();
const imageProxessor = require('image-proxessor');

app.use('/medium', resizer('http://where-my-original-images-are-hosted', {
  resize: {
    width: 200,
    height: 200
  }
}));

app.listen(4309);
```
