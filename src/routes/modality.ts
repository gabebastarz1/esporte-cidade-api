import express, { Request, Response } from "express";
import { AppDataSource } from "../database/config";
import { Modality } from "../entities/modality.entity";

const router = express.Router();
const modalityRepository = AppDataSource.getRepository(Modality);

router.get("/", async (req: Request, res: Response) => {
    try {
        const modalities = await modalityRepository.find({
            relations: ["teachers"],
        });
        res.status(200).json(modalities);
    } catch (error) {
        console.error("Erro ao buscar modalidades:", error.message);
        res.status(500).json({ message: "Erro ao buscar modalidades.", error: error.message });
    }
});

export default router;
