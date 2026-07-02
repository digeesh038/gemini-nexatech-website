const fs = require('fs');
const path = require('path');

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const p = path.join(dir, file);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      walk(p);
    } else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
      let content = fs.readFileSync(p, 'utf8');
      if (content.includes('.jpg') || content.includes('.jpeg') || content.includes('.png')) {
        let modified = false;
        content = content.replace(/(\/assets\/.*?)\.(jpg|jpeg|png)(["'`])/gi, (match, p1, p2, p3) => {
          if (p1.includes('GN') || p1.includes('cloud_devops')) return match; // exclude if needed
          modified = true;
          return p1 + '.webp' + p3;
        });
        if (modified) {
          fs.writeFileSync(p, content);
          console.log('Fixed', p);
        }
      }
    }
  }
}

walk('./src');
