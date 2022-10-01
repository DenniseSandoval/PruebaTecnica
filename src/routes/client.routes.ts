import { Router } from "express";
import { createClient, updateClient, deleteClient } from "../controllers/client.controllers";

const router= Router();

router.post('/clientes', createClient);
router.put("/clientes/:id", updateClient);
router.delete("/clientes/:id", deleteClient);

export default router