import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const assetsDir = path.join(process.cwd(), 'src/assets');

async function optimizeImage(filePath) {
  try {
    const tempPath = filePath + '.tmp';
    let img = sharp(filePath);
    const metadata = await img.metadata();
    
    // Resize if too large
    if (metadata.width > 1280) {
      img = img.resize({ width: 1280, withoutEnlargement: true });
    }
    
    // Compress based on format
    if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
      img = img.jpeg({ quality: 75, progressive: true });
    } else if (metadata.format === 'png') {
      img = img.png({ quality: 75, compressionLevel: 8 });
    } else if (metadata.format === 'webp') {
      img = img.webp({ quality: 75 });
    }
    
    await img.toFile(tempPath);
    await fs.rename(tempPath, filePath);
    console.log(`Optimized: ${filePath}`);
  } catch (err) {
    console.error(`Error optimizing ${filePath}:`, err);
  }
}

async function walk(dir) {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      await walk(filePath);
    } else if (/\.(jpe?g|png|webp)$/i.test(filePath)) {
      await optimizeImage(filePath);
    }
  }
}

walk(assetsDir).then(() => console.log('Done optimizing images.'));
