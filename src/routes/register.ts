import express, { Router, Request, Response } from "express";
import { AppDataSource } from "../database/config";
import { Athlete } from "../entities/athlete.entity";
import { Roles } from "../enums/roles.enum";
import bcrypt from "bcrypt"; 

const router = express.Router();
const athleteRepository = AppDataSource.getRepository(Athlete);

router.post("/", async (req: Request, res: Response) => {
    try {
        const {
            name, cpf, rg, birthday, phone, photo_url, email, password, fatherName, fatherPhone, fatherCpf, fatherEmail,
            motherName, motherPhone, motherCpf, motherEmail,
            responsibleName, responsibleEmail, responsibleCpf,
            bloodType, frontIdPhotoUrl, backIdPhotoUrl, foodAllergies
        } = req.body;

        // Verifica se já existe um atleta com o mesmo CPF
        const isThereAnyAthlete = await athleteRepository.findOneBy({ cpf });
        if (isThereAnyAthlete) {
            res.status(400).json({ message: "Este CPF já está cadastrado" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10); // 👈 força de hash 10

        const newAthlete = athleteRepository.create({
            name,
            password: hashedPassword, 
            cpf,
            rg,
            birthday,
            phone,
            photo_url,
            email,
            father_name: fatherName,
            father_phone: fatherPhone,
            father_cpf: fatherCpf,
            father_email: fatherEmail,
            mother_name: motherName,
            mother_phone: motherPhone,
            mother_cpf: motherCpf,
            mother_email: motherEmail,
            responsible_person_name: responsibleName,
            responsible_person_email: responsibleEmail,
            responsible_person_cpf: responsibleCpf,
            blood_type: bloodType,
            photo_url_cpf_front: frontIdPhotoUrl,
            photo_url_cpf_back: backIdPhotoUrl,
            allergy: foodAllergies,
            role: Roles.ATHLETES,
        });

        await athleteRepository.save(newAthlete);

        res.status(201).json({ message: "Atleta cadastrado com sucesso!", athlete: newAthlete });
    } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor." });
    }
});

export default router;
