/**
 * Author: Tanner Mickelson
 * License: MIT
 */
declare module 'image-proxessor' {
  interface ProcessingOptions {
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
      format: string;
      quality?: number;
      progressive?: boolean;
    }
  };

  function imageProxessor(
    originalBaseUrl: string,
    options:ProcessingOptions
  ):function;

  export = imageProxessor;
}