import { Router } from 'express';
import { authController } from './auth.controller';

const router = Router();

// Define routes
router.get('/', authController.getAll);

export default router;
