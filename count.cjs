const fs = require('fs');
const code = fs.readFileSync('src/pages/JavaCourse.jsx', 'utf-8');
const slides = code.split('<Slide');
let i = 0;
// Note: slides[0] is the content before the first <Slide
for (let j = 1; j <= 35; j++) {
    const s = slides[j];
    if (!s) break;
    const badge = s.match(/ChapterBadge num=["']([^"']+)["']/);
    console.log('Idx ' + i + ': ' + (badge ? badge[1] : 'No Badge'));
    i++;
}
