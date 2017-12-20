/**
 * Author: Tanner Mickelson
 * License: MIT
 */
const sharp = require('sharp');
const axios = require('axios');

module.exports = function (originalBaseUrl, options) {
  // Middleware function to act as an image resizer proxy
  return async (req, res) => {
    const originalUrl = originalBaseUrl + req.url;

    // Get stream to image to pipe through resize transformer
    const result = await axios({
      method:'get',
      url: originalUrl,
      responseType:'stream'
    });

    // Resize transformer pipes directly to response stream
    let imageTransform = sharp();
    // Always resize
    options.resize = options.resize || { width: null, height: null };
    imageTransform.resize(options.resize.width, options.resize.height);
    // Apply other transforms besides resize
    if (options.transform) {
      if (options.transform.rotate) {
        imageTransform.rotate(options.transform.rotate);
      }
      if (options.transform.flipX) {
        imageTransform.flop();
      }
      if (options.transform.flipY) {
        imageTransform.flip();
      }
    }
    // Apply other effects conditionally
    if (options.effects) {
      if (options.effects.blur) {
        // Blur amount can be specified for more extreme blurs, so test if we got a number
        imageTransform.blur((typeof options.effects.blur === 'number') ? options.effects.blur : undefined);
      }
      if (options.effects.grayscale) {
        imageTransform.grayscale();
      }
    }
    // Setup output formats
    if (options.output) {
      switch (options.output.format) {
        case 'jpeg':
        case 'jpg':
          console.log('PROGRSSIVE JPEG:',options.output.progressive);
          imageTransform.jpeg({ quality: options.output.quality || 80, progressive: options.output.progressive });
          break;
        case 'png':
          console.log('PROGRSSIVE PNG:',options.output.progressive);
          imageTransform.png({ progressive: options.output.progressive, force: true });
          break;
      }
    }

    const outputStream = result.data.pipe(imageTransform);
    outputStream.on('end', () => res.end());
    outputStream.pipe(res);
  };
}