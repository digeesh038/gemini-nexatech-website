import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const assetsDir = path.join(process.cwd(), 'src/assets');
const srcDir = path.join(process.cwd(), 'src');

async function convertImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const basename = path.basename(filePath, ext);
    const dir = path.dirname(filePath);
    
    // Always convert to webp
    const newPath = path.join(dir, `${basename}.webp`);
    
    let img = sharp(filePath);
    const metadata = await img.metadata();
    
    // Resize down to 800px width max for these specific performance issues
    if (metadata.width > 800) {
      img = img.resize({ width: 800, withoutEnlargement: true });
    }
    
    await img.webp({ quality: 75 }).toFile(newPath);
    console.log(`Converted: ${filePath} -> ${newPath}`);
    
    // Don't delete the original yet just in case, or actually DO delete it so we don't have duplicates.
    if (ext !== '.webp') {
      await fs.unlink(filePath);
    } else if (newPath !== filePath) {
      await fs.unlink(filePath);
    }
    
    return { old: path.basename(filePath), new: `${basename}.webp` };
  } catch (err) {
    console.error(`Error converting ${filePath}:`, err);
    return null;
  }
}

async function walkDir(dir, regex, callback) {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      await walkDir(filePath, regex, callback);
    } else if (regex.test(filePath)) {
      await callback(filePath);
    }
  }
}

async function main() {
  const replacements = [];
  
  // 1. Convert all images to webp and resize
  await walkDir(assetsDir, /\.(jpe?g|png|webp)$/i, async (filePath) => {
    // If it's already a webp, we still resize and compress it, and rewrite it.
    // Sharp can't overwrite the file it's reading, so we create a tmp file.
    if (filePath.endsWith('.webp')) {
      const tempPath = filePath + '.tmp';
      try {
        let img = sharp(filePath);
        const metadata = await img.metadata();
        if (metadata.width > 800) {
          img = img.resize({ width: 800, withoutEnlargement: true });
        }
        await img.webp({ quality: 75 }).toFile(tempPath);
        await fs.rename(tempPath, filePath);
        console.log(`Optimized existing webp: ${filePath}`);
      } catch (e) {
        console.error('Error optimizing webp:', filePath, e);
      }
    } else {
      const res = await convertImage(filePath);
      if (res) replacements.push(res);
    }
  });
  
  // 2. Replace references in source code
  if (replacements.length > 0) {
    await walkDir(srcDir, /\.(tsx?|css|html)$/i, async (filePath) => {
      try {
        let content = await fs.readFile(filePath, 'utf8');
        let modified = false;
        
        for (const { old: oldName, new: newName } of replacements) {
          // Replace exactly the basename+ext in strings
          // Use a regex that replaces it if it's part of a path
          const regex = new RegExp(oldName.replace(/\./g, '\\.'), 'g');
          if (regex.test(content)) {
            content = content.replace(regex, newName);
            modified = true;
          }
        }
        
        if (modified) {
          await fs.writeFile(filePath, content, 'utf8');
          console.log(`Updated references in: ${filePath}`);
        }
      } catch (e) {
        console.error('Error updating references:', filePath, e);
      }
    });
  }
  
  console.log('Done converting and updating references.');
}

main();
