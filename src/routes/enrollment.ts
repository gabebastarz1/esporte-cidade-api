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
        const { modalityId } = req.body;

        const athlete = await AppDataSource.getRepository(Athlete).findOneBy({ id: req.user.id });
        const modality = await AppDataSource.getRepository(Modality).findOneBy({ id: modalityId });

        const enrollment = enrollmentRepository.create(
            {
                athlete,
                modality
            }
        );
        await enrollmentRepository.save(enrollment);

        res.status(201).json(enrollment);
    } catch (error) {
        console.error("error message", error.message);

        res.status(500).json({ message: "error message", error: error.message });
    }
});

router.get("/:athleteId", authentication, async (req: Request, res: Response) => {
    try {
        const { athleteId } = req.params;
        const query = req.query;

        const athlete = await athleteRepository.findOne({ where: { id: Number(athleteId) } });

        const approved = query.approved === 'true';
        const active = query.active === 'true';

        const enrollments = await enrollmentRepository.find({ where: { athlete: athlete, approved, active } });

        res.status(200).json(enrollments);
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
