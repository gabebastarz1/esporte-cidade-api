import express, { Request, Response } from "express";
import { AppDataSource } from "../database/config";
import { Athlete } from "../entities/athlete.entity";
import { Modality } from "../entities/modality.entity";
import { Enrollment } from "../entities/enrollment.entity";
import { authentication } from "../middleware/auth.middleware";
import { JwtPayload } from 'jsonwebtoken';

const router = express.Router();
const enrollmentRepository = AppDataSource.getRepository(Enrollment);
const athleteRepository = AppDataSource.getRepository(Athlete);

interface AuthRequest extends Request {
    user?: string | JwtPayload;
}

router.post("/", authentication, async (req: AuthRequest, res: Response) => {
    try {
        console.log('ENROLLMENT POST - REQ.USER:', req.user);
        console.log('ENROLLMENT POST - BODY:', req.body);
        const { modalityId } = req.body;

        const athlete = await AppDataSource.getRepository(Athlete).findOneBy({ id: req.user.id });
        const modality = await AppDataSource.getRepository(Modality).findOneBy({ id: modalityId });

        console.log('ENROLLMENT POST - ATHLETE:', athlete);
        console.log('ENROLLMENT POST - MODALITY:', modality);

        if (!athlete || !modality) {
            console.log('ENROLLMENT POST - athlete ou modality não encontrada');
            return res.status(400).json({ message: "Athlete ou modalidade não encontrada." });
        }

        const enrollment = enrollmentRepository.create({
            athlete,
            modality,
            active: true,
            approved: false,
        });
        await enrollmentRepository.save(enrollment);

        console.log('ENROLLMENT POST - ENROLLMENT SALVO:', enrollment);
        res.status(201).json(enrollment);
    } catch (error) {
        console.error("error message", error);
        res.status(500).json({ message: "error message", error: error.message });
    }
});

router.get("/:athleteId", authentication, async (req: Request, res: Response) => {
    try {
        const { athleteId } = req.params;
        const query = req.query;

        const athlete = await athleteRepository.findOne({ where: { id: Number(athleteId) } });
        if (!athlete) {
            return res.status(404).json({ error: "Athlete not found" });
        }

        const where: any = { athlete: { id: Number(athleteId) } };

        // Só filtra se vier na query
        if (query.approved !== undefined) {
            where.approved = query.approved === 'true';
        }
        if (query.active !== undefined) {
            where.active = query.active === 'true';
        }

        console.log('Consulta WHERE para enrollment:', JSON.stringify(where, null, 2));
        try {
          const enrollments = await enrollmentRepository.find({ where, relations: ["modality"] });
          console.log('Resultado ENROLLMENTS:', JSON.stringify(enrollments, null, 2));
          res.status(200).json(enrollments);
        } catch (findErr) {
          console.error('Erro ao buscar enrollments:', findErr);
          res.status(500).json({ error: findErr.message, stack: findErr.stack });
          return;
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/", authentication, async (req: Request, res: Response) => {
    try {
        const query = req.query;

        const approved = query.approved === 'true';
        const active = query.active === 'true';

        const where: any = {};

        if (query.approved !== null && query.approved !== undefined) {
            where.approved = approved;
        }

        if (query.active !== null && query.active !== undefined) {
            where.active = active;
        }

        const enrollments = await enrollmentRepository.find({ where });

        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", authentication, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await enrollmentRepository.delete(id);

        res.status(200).json({message: "The enrollment was successfully deleted"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", authentication, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const enrollment = await enrollmentRepository.findOne({ where: { id: Number(id) } });

        const toEnrollment = await enrollmentRepository.save({ id, ...enrollment, ...req.body });

        res.status(200).json(toEnrollment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router;
