import express, { Request, Response } from "express";
import { AppDataSource } from "../database/config";
import { Atendiment } from "../entities/atendiment.entity";

const router = express.Router();
router.get("/", async (req: Request, res: Response) => {
  try {
    //tem que trocar para resgatar do front o token de sessao
    const athleteName = "João"; 
    
    //para o filtro de modalidades
    const modalityFilter = req.query.modality 
      ? parseInt(req.query.modality as string) 
      : null;
    const query = AppDataSource.getRepository(Atendiment)
      .createQueryBuilder("atendiment")
      .leftJoinAndSelect("atendiment.athlete", "athlete")
      .leftJoinAndSelect("atendiment.modality", "modality")
      .where("athlete.name = :name", { name: athleteName });

    if (modalityFilter && !isNaN(modalityFilter)) {
      query.andWhere("modality.id = :modalityId", { 
        modalityId: modalityFilter 
      });
    }

    // seleciona todas as modalidades
    const athleteModalities = await AppDataSource.getRepository(Atendiment)
      .createQueryBuilder("atendiment")
      .leftJoinAndSelect("atendiment.modality", "modality")
      .leftJoin("atendiment.athlete", "athlete")
      .where("athlete.name = :name", { name: athleteName })
      .select("DISTINCT modality.id, modality.name")
      .getRawMany();

    const atendimentos = await query.getMany();

    //formatar a data
    const formattedData = atendimentos.map(atendimento => {
    
      return {
        data: atendimento.created_at,
        modalidade: atendimento.modality?.name || "N/A",
        local: atendimento.modality?.class_locations?.[0] || "N/A",
        present: atendimento.present
      };
    });


    const faltas = formattedData.filter(item => !item.present);

    res.status(200).json({
      absences: faltas,
      modalities: athleteModalities, 
      totalAbsences: faltas.length
    });
    
  } catch (error) {
    console.error("Erro ao buscar faltas:", error);
    res.status(500).json({
      message: "Erro ao buscar faltas dos atletas.",
      error: error.message
    });
  }
});

export default router;

