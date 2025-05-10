import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { NextRequest } from 'next/server';

// Configure upload directory
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// Ensure upload directory exists
export const ensureUploadDir = async () => {
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }
};

// Parse form data with image - Adapted for Next.js App Router
export const parseForm = async (request) => {
  // Convert the readable stream to a Node.js readable stream
  const chunks = [];
  const reader = request.body.getReader();

  // Read the stream
  let done = false;
  while (!done) {
    const { done: isDone, value } = await reader.read();
    done = isDone;
    if (value) {
      chunks.push(value);
    }
  }

  // Combine all chunks into a single buffer
  const buffer = Buffer.concat(chunks);

  return new Promise((resolve, reject) => {
    // Create a temporary file to store the request body
    const tempPath = path.join(process.cwd(), `temp-${Date.now()}`);

    fs.writeFile(tempPath, buffer)
      .then(() => {
        const form = new IncomingForm({
          multiples: false,
          keepExtensions: true,
          uploadDir: path.dirname(tempPath),
        });

        // Parse the file instead of the request
        form.parse(tempPath, (err, fields, files) => {
          // Clean up the temp file
          fs.unlink(tempPath).catch(console.error);

          if (err) return reject(err);

          // Process file paths here
          // In this simplified approach, the files object may have different structure
          // than what you're expecting, so we need to adapt it
          const adaptedFiles = {};

          // If there's an image file, adapt it to the structure we need
          if (files.image) {
            adaptedFiles.image = {
              filepath: files.image.filepath,
              originalFilename: files.image.originalFilename,
              mimetype: files.image.mimetype,
              size: files.image.size,
            };
          }

          resolve({ fields, files: adaptedFiles });
        });
      })
      .catch(reject);
  });
};

// Alternative implementation using raw formData parsing
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

        // Create temporary file path for processing
        const tempPath = path.join(
          process.cwd(),
          `temp-${Date.now()}-${value.name}`
        );
        await fs.writeFile(tempPath, Buffer.from(buffer));

        files[key] = {
          filepath: tempPath,
          originalFilename: value.name,
          mimetype: value.type,
          size: value.size,
        };
      } else {
        // Handle regular form fields
        if (fields[key]) {
          // If the field already exists, convert it to an array
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

// Process and save image
export const saveImage = async (file) => {
  await ensureUploadDir();

  // Generate unique filename
  const filename = `${uuidv4()}${path.extname(
    file.originalFilename || 'image.jpg'
  )}`;
  const outputPath = path.join(uploadDir, filename);

  // Process image with sharp (resize and optimize)
  await sharp(file.filepath)
    .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
    .toFile(outputPath);

  // Delete temporary file
  await fs.unlink(file.filepath);

  // Return relative path to the image
  return `/uploads/${filename}`;
};

// Delete image if exists
export const deleteImage = async (imagePath) => {
  if (!imagePath) return;

  try {
    // Extract filename from path
    const filename = path.basename(imagePath);
    const fullPath = path.join(uploadDir, filename);

    await fs.access(fullPath);
    await fs.unlink(fullPath);
  } catch (error) {
    console.error('Error deleting image:', error);
    // Don't throw, as the file might not exist
  }
};
