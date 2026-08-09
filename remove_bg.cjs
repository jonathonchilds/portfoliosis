const Jimp = require('jimp');

async function processImage() {
  const image = await Jimp.read('src/assets/ufo.jpg');
  
  // Create a new transparent image of the same size
  const png = new Jimp(image.bitmap.width, image.bitmap.height, 0x00000000);

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    // The alpha should be the maximum color component to preserve the brightest parts
    // but maybe just using luminance or max(rgb) is fine.
    const maxColor = Math.max(r, g, b);
    
    let a = maxColor;
    
    // If we want a harder cutoff to avoid making the core of the UFO semi-transparent
    // we can just say: if it's very dark, make it transparent.
    // The user said "clip out the ufo perfectly", which means they might just want the hard edge.
    // The AI generated image has a solid outline (it's a cartoon). 
    // Let's just find the pure black (or very close to black) and make it transparent.
    
    if (r < 15 && g < 15 && b < 15) {
      a = 0;
    } else {
      a = 255;
    }

    png.bitmap.data[idx + 0] = r;
    png.bitmap.data[idx + 1] = g;
    png.bitmap.data[idx + 2] = b;
    png.bitmap.data[idx + 3] = a;
  });

  await png.writeAsync('src/assets/ufo.png');
  console.log('Saved ufo.png');
}

processImage().catch(console.error);
