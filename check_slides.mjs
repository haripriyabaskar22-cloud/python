import fs from 'fs';

// Get SLIDE_TEXTS
const contentJS = fs.readFileSync('src/data/slideContent.js', 'utf8');
const textMatches = Array.from(contentJS.matchAll(/"([^"]+)"/g)).map(m => m[1]);
// Note: SLIDE_TEXTS has double quotes around the strings in slideContent.js

// Get Slide badges
const contentJSX = fs.readFileSync('src/pages/JavaCourse.jsx', 'utf8');
const slideRegex = /<Slide(?:>|\s[^>]*>)([\s\S]*?)<\/Slide>/g;
let match;
let i = 0;
let output = [];
let slideTitles = [];
while ((match = slideRegex.exec(contentJSX)) !== null) {
  const badgeMatch = match[1].match(/ChapterBadge num="?([\d.]+)"?/);
  slideTitles.push(badgeMatch ? badgeMatch[1] : 'No Badge');
  i++;
}

output.push(`JSX Slides count: ${slideTitles.length}`);
output.push(`JS Texts count: ${textMatches.length}`);
for(let k=0; k<slideTitles.length; k++) {
  const prefix = textMatches[k] ? textMatches[k].substring(0, 30) : 'undefined';
  output.push(`Idx ${k}: JSX=${slideTitles[k]} | TEXT=${prefix}`);
}

fs.writeFileSync('compare_slides.txt', output.join('\n'));
