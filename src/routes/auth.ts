import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', (req, res) => AuthController.login(req, res));

router.post('/logout', (req, res) => AuthController.logout(req, res));

export default router;