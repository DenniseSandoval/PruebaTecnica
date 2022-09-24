import { Router } from "express";
import { createClient } from "../controllers/client.controllers";

const router= Router();

router.post('/clientes', createClient)

export default router