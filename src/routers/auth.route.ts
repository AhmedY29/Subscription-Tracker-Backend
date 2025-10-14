import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';

const router = Router();



router.post("/sign-up", AuthController.signUp )

router.post("/sign-in", AuthController.signIn)

router.post("/sign-out", AuthController.signOut)

router.post("/refresh-token", AuthController.refreshToken)


export default router;