import fs from 'fs';
const files = fs.readdirSync('public/audio/audio');
const target = files.filter(f => f.startsWith('slide_10'));
console.log("EXACT file names with quotes to spot spaces:");
target.forEach(f => console.log('"' + f + '"'));
