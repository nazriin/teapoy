// import express from 'express';
// import { register, login, logout } from '../controllers/authController.js';
// import validate from '../middleware/validateRequest.js';
// import { registerSchema, loginSchema } from '../validators/authValidators.js';
//
// const router = express.Router();
//
// router.post('/register', validate(registerSchema), register);
// router.post('/login', validate(loginSchema), login);
// router.post('/logout', logout);
//
// export default router;

import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {getCurrentUser, login, logout, register} from '../controllers/authController.js';

const router = express.Router();

router.get('/me', protect, getCurrentUser);
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getCurrentUser);
router.post('/logout', logout);


export default router;
