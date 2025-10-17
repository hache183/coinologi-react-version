import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';
import {
  getAdminPostById,
  createPost,
  deletePost,
  getAdminPosts,
  updatePost,
  uploadFeaturedImage
} from '../controllers/postController.js';
import { upload } from '../middleware/upload.js';

const router = Router();

const postValidation = [
  body('title').notEmpty().withMessage('Il titolo è obbligatorio'),
  body('content').notEmpty().withMessage('Il contenuto è obbligatorio'),
  body('status').optional().isIn(['draft', 'published']).withMessage('Stato non valido')
];

router.use(authenticate, authorizeAdmin);

router.get('/', getAdminPosts);
router.post('/upload', (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    return uploadFeaturedImage(req, res, next);
  });
});
router.get('/:id', getAdminPostById);
router.post('/', postValidation, createPost);
router.put('/:id', postValidation, updatePost);
router.delete('/:id', deletePost);

export default router;
