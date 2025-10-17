import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { body } from 'express-validator';
import { authenticate } from '../middleware/auth.js';
import { login, logout, verify } from '../controllers/authController.js';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: 'Troppi tentativi di accesso, riprova tra qualche minuto'
});

const loginValidation = [
  body('email').isEmail().withMessage('Inserisci un email valida'),
  body('password').isLength({ min: 6 }).withMessage('Password troppo corta')
];

router.post('/login', loginLimiter, loginValidation, login);
router.post('/logout', authenticate, logout);
router.get('/verify', authenticate, verify);

export default router;
