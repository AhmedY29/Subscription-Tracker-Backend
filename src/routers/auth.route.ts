import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';

const router = Router();



router.post("/sign-up", AuthController.signUp )

router.post("/sign-in", AuthController.signIn)

router.post("/sign-out", (req, res) => {
    res.send("sign-out")
})


export default router;