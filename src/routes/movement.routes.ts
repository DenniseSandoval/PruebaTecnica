import { Router } from "express";
import { createMovement, getMovements } from "../controllers/movements.controllers";
const router= Router();

router.post('/movimientos', createMovement)
router.get('/movimientos', getMovements)

export default router