import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import UserRepository from "../repositories/user.repository";
import AuthService from "../services/auth.service";
import AuthController from "../controllers/auth.controller";

const router = Router();

const prismaClient = new PrismaClient();
const userRepository = new UserRepository(prismaClient);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post("/signup", (req, res) => authController.signUp(req, res));
router.post("/signin", (req, res) => authController.signIn(req, res));
router.post("/authorize", (req, res) => authController.authorize(req, res));

export default router;
