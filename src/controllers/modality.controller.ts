import { Request, Response } from "express";
import { modalityService } from "../services/register-modality.service";

export const createModality = async (req: Request, res: Response) => {
    try {
        const result = await modalityService.createModality(req.body);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(error.status || 500).json({ message: error.message || "Erro interno do servidor." });
    }
};