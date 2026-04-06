const fs = require('fs');
const code = fs.readFileSync('src/pages/JavaCourse.jsx', 'utf-8');
// Find all <Slide ...> strings using regex without getting SlideItem
const matches = [...code.matchAll(/<Slide(?:\s|>)[^]*?(?=<Slide(?:\s|>)|$)/g)];
console.log("Total real slides:", matches.length);

let i = 0;
matches.forEach((s) => {
    const badge = s[0].match(/ChapterBadge num=["']([^"']+)["']/);
    if (badge && badge[1].startsWith('10')) console.log('Slide index ' + i + ' is ' + badge[1]);
    i++;
});
