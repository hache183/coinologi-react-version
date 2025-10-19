import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = process.env.UPLOAD_DIR || 'uploads';
const absoluteUploadDir = path.isAbsolute(uploadDir)
  ? uploadDir
  : path.join(__dirname, '..', uploadDir);

if (!fs.existsSync(absoluteUploadDir)) {
  fs.mkdirSync(absoluteUploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, absoluteUploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  }
});

const fileFilter = (_req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    cb(new Error('Sono consentiti solo file immagine'));
  } else {
    cb(null, true);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2 MB
  }
});

export const getPublicFileUrl = (req, filename) => {
  const baseUrl = process.env.FILE_BASE_URL || `${req.protocol}://${req.get('host')}`;
  const relativePath = path.relative(path.join(__dirname, '..'), absoluteUploadDir);
  return `${baseUrl}/${relativePath.replace(/\\/g, '/')}/${filename}`;
};

export const getUploadsDirectory = () => absoluteUploadDir;
