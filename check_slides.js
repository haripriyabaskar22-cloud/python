const fs = require('fs');
const content = fs.readFileSync('src/pages/JavaCourse.jsx', 'utf8');
const slides = content.split('<Slide');
console.log(`Total slides roughly: ${slides.length - 1}`);
slides.forEach((s, i) => {
  if (i === 0) return;
  const badgeMatch = s.match(/ChapterBadge num="?([\d.]+)"?/);
  const titleMatch = s.match(/<h2[^>]*>(.*?)<\/h2>/);
  if (badgeMatch) {
    console.log(`Idx ${i - 1} | Badge ${badgeMatch[1]} | Title ${titleMatch ? titleMatch[1] : ''}`);
  }
});
