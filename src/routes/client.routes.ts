import { Router } from "express";
import { createClient, updateClient } from "../controllers/client.controllers";

const router= Router();

router.post('/clientes', createClient)
router.put("/clientes/:id", updateClient);

export default router