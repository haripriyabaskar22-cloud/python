import fs from 'fs';

const files = [
  'public/audio/audio/slide_10.1.1.ogg',
  'public/audio/audio/slide_10.1.ogg',
  'public/audio/audio/slide_10.2.ogg',
  'public/audio/audio/slide_10.3.ogg',
  'public/audio/audio/slide_10.4.ogg',
  'public/audio/audio/slide_10.5.ogg'
];

files.forEach(f => {
  try {
    const fd = fs.openSync(f, 'r');
    const buffer = Buffer.alloc(4);
    fs.readSync(fd, buffer, 0, 4, 0);
    fs.closeSync(fd);
    console.log(`${f} magic bytes: ${buffer.toString('hex')} (ascii: ${buffer.toString('ascii')})`);
  } catch (e) {
    console.log(`Error reading ${f}: ${e.message}`);
  }
});
