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

        console.log('\n\n');
        console.log(req.user);
        console.log('\n\n');

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

router.get("/:athleteId", async (req: Request, res: Response) => {
    try {
        const { athleteId } = req.params;
        const query = req.query;        

        const athlete = await athleteRepository.findBy({id: Number(athleteId)});

        const approved = query.approved === 'true';
        const active = query.active === 'true';

        const enrollments = await enrollmentRepository.find({ where: { athlete: athlete, approved, active } });

        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
