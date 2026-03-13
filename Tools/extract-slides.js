const fs = require('fs');
const path = require('path');

const slidesDir = '/c/Users/USER/Desktop/claude code test/seoul-101-extracted/raw/ppt/slides';
const files = fs.readdirSync(slidesDir)
  .filter(f => f.match(/^slide\d+\.xml$/))
  .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));

files.forEach(file => {
  const xml = fs.readFileSync(path.join(slidesDir, file), 'utf8');
  // Extract all text runs
  const texts = [];
  const regex = /<a:t(?:\s[^>]*)?>([^<]*)<\/a:t>/g;
  let m;
  while ((m = regex.exec(xml)) !== null) {
    if (m[1].trim()) texts.push(m[1].trim());
  }
  console.log(`\n=== ${file} ===`);
  console.log(texts.join(' | '));
});
