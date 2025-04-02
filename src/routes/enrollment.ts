import express, { Request, Response } from "express";
import { AppDataSource } from "../database/config";
import { Athlete } from "../entities/athlete.entity";

const router = express.Router();
const userRepository = AppDataSource.getRepository(Athlete);

router.post("/", async (req: Request, res: Response) => {
    try {
        const { userId, modalityId } = req.body;

        res.status(500).json({message: "not implemented."});
    } catch (error) {
        console.error("error message", error.message);
        
        res.status(500).json({ message: "error message", error: error.message });
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
        res.status(500).json({message: "not implemented."});
    } catch (error) {
        res.status(500).json({ message: "error message", error: error.message });
    }
});

export default router;
