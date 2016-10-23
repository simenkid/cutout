// sudo apt-get install libcairo2-dev libjpeg-dev libgif-dev

// var fs = require('fs'),
//     gm = require('gm'),
//     getPixels = require('get-pixels'),
//     savePixels = require('save-pixels');

var Caman = require('caman').Caman;

Caman.Filter.register('posterize', function (adjust) {
  var numOfAreas = 256 / adjust;
  var numOfValues = 255 / (adjust - 1);

  this.process("posterize", function (rgba) {
    rgba.r = Math.floor(Math.floor(rgba.r / numOfAreas) * numOfValues);
    rgba.g = Math.floor(Math.floor(rgba.g / numOfAreas) * numOfValues);
    rgba.b = Math.floor(Math.floor(rgba.b / numOfAreas) * numOfValues);

    return rgba;
  });
});

Caman.Filter.register("example", function (adjust) {
  this.process("example", function (rgba) {
    rgba.locationXY(); // e.g. {x: 0, y: 0}

    // Gets the RGBA object for the pixel that is 2 rows down
    // and 3 columns to the right.
    rgba.getPixelRelative(-2, 3);

    // Sets the color for the pixel that is 2 rows down and
    // 3 columns to the right.
    rgba.putPixelRelative(-2, 3, {
      r: 100,
      g: 120,
      b: 140,
      a: 255
    });

    // Gets the RGBA object for the pixel at the given absolute
    // coordinates. This is relative to the top left corner.
    this.getPixel(20, 50);

    // Sets the color for the pixel at the given absolute coordinates.
    // Also relative to the top left corner.
    this.putPixel(20, 50, {
      r: 100,
      g: 120,
      b: 140,
      a: 255
    });
  });
});

Caman("./origin.jpg", function () {
  // this.brightness(10);
  // this.gamma(1.2);
  // this.greyscale();
  // this.posterize(4);
    this.example();

  this.render(function () {
    this.save("./output.png");
  });
});

// get-pixels:
//    require("get-pixels")(url[, type], cb(err, pixels))
//    Returns An ndarray of pixels in raster order having shape equal to [width, height, channels].

// save-pixels:
//    require("save-pixels")(array, type[, options])
//    array is an ndarray of pixels. Assumes that shape is [width, height, channels]
//    type: 'jpeg', 'jpg', 'gif', 'png', 'canvas'
//    Returns A stream that you can pipe to serialize the result, or a canvas element if the type is "canvas".
