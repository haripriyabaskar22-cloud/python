const fs = require('fs');
const code = fs.readFileSync('src/pages/JavaCourse.jsx', 'utf-8');
const matches = [...code.matchAll(/<Slide(?:\s|>)[^]*?(?=<Slide(?:\s|>)|$)/g)];
matches.forEach((s, i) => {
    const badge = s[0].match(/ChapterBadge num=["']([^"']+)["']/);
    console.log('Idx ' + i + ': ' + (badge ? badge[1] : 'No Badge'));
});
