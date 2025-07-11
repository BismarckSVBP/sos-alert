import cloudinary from '../utils/cloudinary.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Allowed formats
const ALLOWED_FORMATS = ['jpg', 'jpeg', 'png'];

// Setup Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ALLOWED_FORMATS,
    transformation: [{ width: 800, height: 800, crop: 'limit' }], // Optional: limit max resolution
  },
});

// Multer middleware with file filter
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    if (ALLOWED_FORMATS.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only .jpg, .jpeg, and .png files are allowed'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max size
});

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    // Cloudinary returns `path`, `filename`, `secure_url`, etc.
    return res.status(200).json({
      message: 'Image uploaded successfully',
      imageUrl: req.file.path, // or use req.file.filename or req.file.originalname if needed
    });
  } catch (err) {
    console.error('[UPLOAD ERROR]', err);
    return res.status(500).json({ message: 'Image upload failed', error: err.message });
  }
};

export { upload, uploadImage };
