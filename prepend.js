const fs = require('fs');
const path = require('path');
function prepend(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      prepend(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (!content.startsWith("'use client'") && !content.startsWith('"use client"')) {
        fs.writeFileSync(fullPath, '"use client";\n' + content);
      }
    }
  });
}
prepend('./src/components');
prepend('./src/contexts');
prepend('./src/lib');
