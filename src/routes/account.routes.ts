import { Router } from "express";
import { createAccountUser } from "../controllers/account.controllers";
const router= Router();

router.post('/cuentas', createAccountUser)

export default router