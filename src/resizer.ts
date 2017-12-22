/**
 * Author: Tanner Mickelson
 * License: MIT
 */

import axios from 'axios';
import * as sharp from 'sharp';

/**
 * Options for image processing.
 */
export interface ProcessingOptions {
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
};

/**
 * @return Middleware function that will process the incoming image URL request.
 */
export default function (options:ProcessingOptions):(req:any, res:any) => void {
  // Middleware function to act as an image resizer proxy
  return async (req:any, res:any) => {
    const originalUrl = options.baseUrl + req.url;

    // Get stream to image to pipe through resize transformer
    const result = await axios({
      method:'get',
      url: originalUrl,
      responseType:'stream'
    });

    // Resize transformer pipes directly to response stream
    let imageTransform = sharp();
    // Always resize
    options.resize = options.resize || { width: undefined, height: undefined };
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
          imageTransform.jpeg({ quality: options.output.quality || 80, progressive: options.output.progressive });
          break;
        case 'png':
          imageTransform.png({ progressive: options.output.progressive, force: true });
          break;
      }
    }

    const outputStream = result.data.pipe(imageTransform);
    outputStream.on('end', () => res.end());
    outputStream.pipe(res);
  };
}