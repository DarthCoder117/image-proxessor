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
    const resizeTransform = sharp()
      .resize(options.resize.width, options.resize.height);

    const outputStream = result.data.pipe(resizeTransform);
    outputStream.on('end', () => res.end());
    outputStream.pipe(res);
  };
}