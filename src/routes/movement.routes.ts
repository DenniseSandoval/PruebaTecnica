import { Router } from "express";
import { createMovement, deleteMovement, getAccountState, getMovements, updateMovement } from "../controllers/movements.controllers";
const router= Router();

router.post('/movimientos', createMovement);
router.get('/movimientos', getMovements);
router.get('/estadocuenta/:dateInitial/:dateEnd/:client', getAccountState);
router.put("/movimientos/:id", updateMovement);
router.delete("/movimientos/:id", deleteMovement);

export default router