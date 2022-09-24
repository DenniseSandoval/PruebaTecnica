import { Router } from "express";
import { createAccountUser, deleteAccount, updateAccount } from "../controllers/account.controllers";
const router= Router();

router.post('/cuentas', createAccountUser)
router.put("/cuentas/:id", updateAccount);
router.delete("/cuentas/:id", deleteAccount);

export default router