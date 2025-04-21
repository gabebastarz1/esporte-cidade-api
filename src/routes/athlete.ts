import express, { Router, Request, Response } from "express";
import { AppDataSource } from "../database/config";
import { Athlete } from "../entities/athlete.entity";

const router: Router = express.Router();
const athleteRepository = AppDataSource.getRepository(Athlete);

// GET /api/athletes/:id - Busca atleta por ID
router.get("/:id", async (req, res) => {
  try {
    const athlete = await athleteRepository.findOneBy({ id: Number(req.params.id) });
    if (!athlete) {
      return res.status(404).json({ error: "Atleta não encontrado" });
    }
    res.json(athlete);
  } catch (error) {
    console.error("Erro ao buscar atleta por ID:", error);
    res.status(500).json({ error: "Erro ao buscar atleta por ID" });
  }
});

// GET /api/athletes/ - Lista todos os atletas
router.get("/", async (req, res) => {
  try {
    const athletes = await athleteRepository.find();
    res.json(athletes);
  } catch (error) {
    console.error("Erro ao buscar atletas:", error);
    res.status(500).json({ error: "Erro ao buscar atletas" });
  }
});

export const athleteRouter = router;