import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});


const fileFilter = (req, file, cb) => {
  const validTypes = /jpeg|jpg|png/;
  const extname = validTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = validTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error('Only .png, .jpg, and .jpeg format allowed!'), false);
};

const upload = multer({ storage, fileFilter });

export { upload };
