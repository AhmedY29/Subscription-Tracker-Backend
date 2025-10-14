import { Router } from "express";
import * as UsersController from "../controllers/users.controller";

const router = Router();

// Get All Users
router.get("/", UsersController.getUsers)

// Get One User
router.get("/:id", UsersController.getUser)

export default router