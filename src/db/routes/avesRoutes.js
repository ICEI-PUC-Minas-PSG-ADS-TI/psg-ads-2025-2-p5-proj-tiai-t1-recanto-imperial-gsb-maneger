import express from "express";
import { listarAves, cadastrarAve, deletarAve } from "../controllers/avesController.js";

const router = express.Router();

// Define as rotas principais da tabela Aves
router.get("/", listarAves);
router.post("/", cadastrarAve);
router.delete("/:id", deletarAve);

export default router;
