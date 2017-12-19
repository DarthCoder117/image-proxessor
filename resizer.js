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

    const outputStream = result.data.pipe(imageTransform);
    outputStream.on('end', () => res.end());
    outputStream.pipe(res);
  };
}