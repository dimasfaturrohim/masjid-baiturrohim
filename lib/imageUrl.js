import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { put, del, list } from '@vercel/blob';

// Configure upload directory for local development
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
const isProduction = process.env.NODE_ENV === 'production';

// Ensure upload directory exists (only for local development)
export const ensureUploadDir = async () => {
  if (isProduction) return;

  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }
};

// Parse form data with image - In-memory processing
export const parseFormData = async (request) => {
  try {
    const formData = await request.formData();
    const fields = {};
    const files = {};

    // Process each entry in the formData
    for (const [key, value] of formData.entries()) {
      // If it's a file
      if (value instanceof File) {
        // Convert File to a buffer that Sharp can work with
        const buffer = await value.arrayBuffer();

        files[key] = {
          buffer: Buffer.from(buffer),
          originalFilename: value.name,
          mimetype: value.type,
          size: value.size,
        };
      } else {
        // Handle regular form fields
        if (fields[key]) {
          if (!Array.isArray(fields[key])) {
            fields[key] = [fields[key]];
          }
          fields[key].push(value);
        } else {
          fields[key] = value;
        }
      }
    }

    return { fields, files };
  } catch (error) {
    console.error('Error parsing form data:', error);
    throw error;
  }
};

// Process and save image using Vercel Blob in production
export const saveImage = async (file) => {
  // Generate unique filename
  const filename = `${uuidv4()}${path.extname(
    file.originalFilename || '.jpg'
  )}`;

  try {
    // Process the image with Sharp (resize and optimize)
    const processedImageBuffer = await sharp(file.buffer)
      .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
      .toBuffer();

    if (isProduction) {
      // In production, upload to Vercel Blob
      const { url } = await put(filename, processedImageBuffer, {
        access: 'public',
        contentType: file.mimetype || 'image/jpeg',
      });

      return url;
    } else {
      // In development, save to local filesystem
      await ensureUploadDir();
      const outputPath = path.join(uploadDir, filename);
      await fs.writeFile(outputPath, processedImageBuffer);
      return `/uploads/${filename}`;
    }
  } catch (error) {
    console.error('Error saving image:', error);
    throw new Error(`Failed to save image: ${error.message}`);
  }
};

// Delete image if exists
export const deleteImage = async (imageUrl) => {
  if (!imageUrl) return;

  try {
    if (isProduction) {
      // Handle Vercel Blob URL format (https://example.vercel-storage.com/...)
      // Extract the filename from the URL
      const urlObj = new URL(imageUrl);
      const pathname = urlObj.pathname;
      // The pathname includes a leading slash, so we get the last part
      const filename = pathname.split('/').pop();

      if (filename) {
        await del(filename);
      }
    } else {
      // In development, delete from local filesystem
      const filename = path.basename(imageUrl);
      const fullPath = path.join(uploadDir, filename);
      await fs.access(fullPath);
      await fs.unlink(fullPath);
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    // Don't throw, as the file might not exist
  }
};
