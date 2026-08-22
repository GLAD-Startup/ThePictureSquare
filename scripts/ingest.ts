#!/usr/bin/env tsx
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

interface GalleryImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL?: string;
}

/**
 * Generate low-quality image placeholder (LQIP) base64 blur data URL
 */
async function generateBlurDataURL(filePath: string): Promise<string> {
  const buffer = await sharp(filePath)
    .resize(16, 16, { fit: 'inside' })
    .webp({ quality: 20 })
    .toBuffer();
  return `data:image/webp;base64,${buffer.toString('base64')}`;
}

/**
 * Upload to Cloudinary if environment variables are provided
 */
async function uploadToCloudinary(
  filePath: string,
  folderName: string
): Promise<string | null> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return null;
  }

  // Use Cloudinary REST API with FormData / fetch
  const fileBuffer = fs.readFileSync(filePath);
  const base64File = `data:image/jpeg;base64,${fileBuffer.toString('base64')}`;

  const timestamp = Math.round(new Date().getTime() / 1000);
  const crypto = await import('crypto');
  const signatureStr = `folder=${folderName}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash('sha1').update(signatureStr).digest('hex');

  const formData = new URLSearchParams();
  formData.append('file', base64File);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp.toString());
  formData.append('signature', signature);
  formData.append('folder', folderName);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    if (!res.ok) {
      console.warn(`[Cloudinary] Upload failed for ${filePath}: ${res.statusText}`);
      return null;
    }
    const data = await res.json();
    return data.secure_url;
  } catch (err) {
    console.warn(`[Cloudinary] Upload error:`, err);
    return null;
  }
}

/**
 * Ingest image directory
 */
async function ingestDirectory(dirPath: string, altPrefix = 'The Picture Square') {
  if (!fs.existsSync(dirPath)) {
    console.error(`❌ Error: Directory "${dirPath}" does not exist.`);
    process.exit(1);
  }

  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const files = fs
    .readdirSync(dirPath)
    .filter((f) => validExtensions.includes(path.extname(f).toLowerCase()));

  if (files.length === 0) {
    console.warn(`⚠️ No valid images found in "${dirPath}".`);
    return [];
  }

  console.log(`📸 Found ${files.length} images in ${dirPath}. Processing...`);

  const results: GalleryImage[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fullPath = path.join(dirPath, file);

    const metadata = await sharp(fullPath).metadata();
    const width = metadata.width || 1200;
    const height = metadata.height || 800;

    const blurDataURL = await generateBlurDataURL(fullPath);

    // Attempt Cloudinary upload or default to relative path
    const folderName = path.basename(dirPath);
    const cloudinaryUrl = await uploadToCloudinary(fullPath, `thepicturesquare/${folderName}`);

    const src = cloudinaryUrl || `/images/${file}`;
    const alt = `${altPrefix} — ${path.parse(file).name.replace(/[-_]/g, ' ')}`;

    results.push({
      src,
      width,
      height,
      alt,
      blurDataURL,
    });

    process.stdout.write(`\r  [${i + 1}/${files.length}] Processed: ${file}`);
  }

  console.log('\n\n✅ Ingestion Complete! GalleryImage[] JSON:\n');
  const jsonOutput = JSON.stringify(results, null, 2);
  console.log(jsonOutput);

  // Write output to manifest.json in the ingested folder
  const outputPath = path.join(dirPath, 'manifest.json');
  fs.writeFileSync(outputPath, jsonOutput);
  console.log(`\n📁 Saved manifest to: ${outputPath}`);

  return results;
}

// CLI Execution Entry
const targetFolder = process.argv[2] || './public/images';
const altPrefixArg = process.argv[3] || 'The Picture Square';

ingestDirectory(path.resolve(process.cwd(), targetFolder), altPrefixArg).catch((err) => {
  console.error('❌ Ingest error:', err);
  process.exit(1);
});
