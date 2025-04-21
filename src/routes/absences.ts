import express, { Request, Response } from "express";
import { AppDataSource } from "../database/config";
import { Atendiment } from "../entities/atendiment.entity";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  let connection;
  try {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: "Token não fornecido" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = verify(token, process.env.JWT_SECRET!) as {
      id: string;
      name: string;
      cpf: string;
      role: number;
    };

    connection = await AppDataSource.initialize();
    if (!connection.isInitialized) {
      throw new Error("Não foi possível conectar ao banco de dados");
    }

    const athleteName = decoded.name;
    const athleteId = decoded.id;
    const modalityFilter = req.query.modality
      ? parseInt(req.query.modality as string)
      : null;

    const query = connection
      .getRepository(Atendiment)
      .createQueryBuilder("atendiment")
      .leftJoinAndSelect("atendiment.athlete", "athlete")
      .leftJoinAndSelect("atendiment.modality", "modality")
      .where("athlete.id = :athleteId", { athleteId });

    if (modalityFilter && !isNaN(modalityFilter)) {
      query.andWhere("modality.id = :modalityId", {
        modalityId: modalityFilter,
      });
    }

    const [athleteModalities, atendimentos] = await Promise.all([
      connection
        .getRepository(Atendiment)
        .createQueryBuilder("atendiment")
        .leftJoinAndSelect("atendiment.modality", "modality")
        .leftJoin("atendiment.athlete", "athlete")
        .where("athlete.id = :athleteId", { athleteId })
        .select("DISTINCT modality.id, modality.name")
        .getRawMany(),
      query.getMany(),
    ]);

    const formattedData = atendimentos.map((atendimento) => ({
      data: atendimento.created_at,
      modalidade: atendimento.modality?.name || "N/A",
      local: atendimento.modality?.class_locations?.[0] || "N/A",
      present: atendimento.present,
    }));

    const faltas = formattedData.filter((item) => !item.present);
    res.status(200).json({
      absences: faltas,
      modalities: athleteModalities,
      totalAbsences: faltas.length,
      athleteName,
    });
    return;
  } catch (error) {
    console.error("Erro ao buscar faltas:", error);

    if (error.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Token inválido" });
      return;
    }

    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token expirado" });
      return;
    }
    res.status(500).json({
      message: "Erro ao buscar faltas dos atletas",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
    return;

  } finally {
    if (connection && connection.isInitialized) {
      await connection.destroy();
    }
  }
});

export default router;
