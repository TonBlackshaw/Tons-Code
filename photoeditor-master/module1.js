class ImageUtils {

    static getCanvas(w, h) {
        var c = document.querySelector("canvas");
        c.width = w;
        c.height = h;
        return c;
    }

    static getPixels(img) {
        var c = ImageUtils.getCanvas(img.width, img.height);
        var ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return ctx.getImageData(0,0,c.width,c.height);
    }

    static putPixels(imageData, w, h) {
        var c = ImageUtils.getCanvas(w, h);
        var ctx = c.getContext('2d');
        ctx.putImageData(imageData, 0, 0);
    }

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


$(document).ready(function() {
    var img = new Image();
    img.src = "img/graveyard.png";
    makeInvert(img);





});
function makeMoreBlue(img, adjustment) {
      var pixels = ImageUtils.getPixels(img);
      var length = pixels.data.length;
      var data = pixels.data;
      for (var i = 0; i < length; i += 4) {
      data[i+2] = data[i+2] + adjustment;
    }
      ImageUtils.putPixels(pixels, img.width, img.height);
}


function makeInvert(img) {
      var pixels = ImageUtils.getPixels(img);
      var length = pixels.data.length;
      var data = pixels.data;
      for (var i = 0; i < length; i += 4) {
      data[i] = 255- data[i];
    }
ImageUtils.putPixels(pixels, img.width, img.height);
}




function makeFunky(img) {
      var pixels = ImageUtils.getPixels(img);
      var length = pixels.data.length;
      var data = pixels.data;
      for (var i = 0; i < length/2; i += 2) {
      var temp = data[i];
      data[i] = data[length - i];
      data[length - i] = temp;
    }
ImageUtils.putPixels(pixels, img.width, img.height);
}


function colourise(img, colour, level) {
     var pixels = ImageUtils.getPixels(img);
     var all = pixels.data.length;
     var data = pixels.data;
     for (var i = 0; i < all; i += 4) {
     data[i] = 1;
 }
 ImageUtils.putPixels(pixels, img.width, img.height);
}
