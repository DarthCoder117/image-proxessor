/**
 * Author: Tanner Mickelson
 * License: MIT
 */
const express = require('express');
const app = express();
const resizer = require('./resizer');
const opn = require('opn');

app.use('/original', express.static('test-images'));

app.use('/small', resizer('http://localhost:4309/original', {
  resize: {
    width: 100,
    height: 100
  }
}));

app.use('/rotate', resizer('http://localhost:4309/original', {
  resize: {
    width: 100,
    height: 100
  },
  transform: {
    rotate: 90
  }
}));

app.use('/flip-x', resizer('http://localhost:4309/original', {
  resize: {
    width: 100,
    height: 100
  },
  transform: {
    flipX: true
  }
}));

app.use('/flip-y', resizer('http://localhost:4309/original', {
  resize: {
    width: 100,
    height: 100
  },
  transform: {
    flipY: true
  }
}));

app.use('/blur', resizer('http://localhost:4309/original', {
  resize: {
    width: 100,
    height: 100
  },
  effects: {
    blur: true
  }
}));

app.use('/blur-more', resizer('http://localhost:4309/original', {
  resize: {
    width: 100,
    height: 100
  },
  effects: {
    blur: 10
  }
}));

app.use('/gray', resizer('http://localhost:4309/original', {
  resize: {
    width: 100,
    height: 100
  },
  effects: {
    grayscale: true
  }
}));

app.use('/medium', resizer('http://localhost:4309/original', {
  resize: {
    width: 200,
    height: 200
  }
}));

app.use('/large', resizer('http://localhost:4309/original', {
  resize: {
    width: 500,
    height: 500
  }
}));

app.get('/', (req, res) => {
  let pageHtml =
    '<!DOCTYPE html>' +
    '<html>' +
    '  <body>' +
    '    <h1>Resizer Proxy Example</h1>' +
    '    <h2>100x100</h2>' +
    '    <img src="/small/large-image.jpg" />' +
    '    <h2>Blurred</h2>' +
    '    <img src="/blur/large-image.jpg" />' +
    '    <h2>Blurred (more)</h2>' +
    '    <img src="/blur-more/large-image.jpg" />' +
    '    <h2>Grayscale</h2>' +
    '    <img src="/gray/large-image.jpg" />' +
    '    <h2>Rotate</h2>' +
    '    <img src="/rotate/large-image.jpg" />' +
    '    <h2>Flip X</h2>' +
    '    <img src="/flip-x/large-image.jpg" />' +
    '    <h2>Flip Y</h2>' +
    '    <img src="/flip-y/large-image.jpg" />' +
    '    <h2>200x200</h2>' +
    '    <img src="/medium/large-image.jpg" />' +
    '    <h2>500x500</h2>' +
    '    <img src="/large/large-image.jpg" />' +
    '    <h2>Original</h2>' +
    '    <img style="max-width: 100%" src="/original/large-image.jpg" />' +
    '  </body>' +
    '</html>';

  res.send(pageHtml);
});

app.listen(4309, () => {
  console.log('Listening on http://localhost:4309');
  opn('http://localhost:4309');
});