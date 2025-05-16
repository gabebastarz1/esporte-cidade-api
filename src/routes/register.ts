import express, { Router, Request, Response } from "express";
import { AppDataSource } from "../database/config";
import { Athlete } from "../entities/athlete.entity";
import { Roles } from "../enums/roles.enum";
import bcrypt from "bcrypt"; 
import { fieldValidators } from "../utils/field-validator.util";
import { Address } from "../entities/address.entity";

const router = express.Router();
const athleteRepository = AppDataSource.getRepository(Athlete);
const adressRepository = AppDataSource.getRepository(Address);
router.post("/", async (req: Request, res: Response) => {
    try 
    {
        const 
        {
            name, cpf, rg, birthday, phone, athletePhotoUrl, email, password, fatherName, fatherPhoneNumber, fatherCpf, fatherEmail, motherName, motherPhoneNumber, motherCpf, motherEmail, responsibleName, responsibleEmail, responsibleCpf, bloodType, frontIdPhotoUrl, backIdPhotoUrl, foodAllergies, estado, cidade, bairro, rua, numeroDaCasa, complemento, referencia,
        } = req.body;
        

        //validação de campos
        const requiredFields = 
        {
            name, cpf, rg
        };

        for( const [field, value] of Object.entries(requiredFields))
        {
            if (!value) 
            {
                
                return res.status(400).json({message: `Campo ${field} é obrigatório`}) 
            }
        }

        for (const [field, message] of Object.entries(requiredFields)) 
        {
            if (!req.body[field]) 
            {
                return res.status(400).json({ message });
            }
        }
        
        if (!fieldValidators.isEmailValid(email)) 
        {
            return res.status(400).json({ message: "Formato de email inválido" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAddress = adressRepository.create(
        {
            state: estado,
            city: cidade,
            neighborhood: bairro,
            street: rua,
            number: parseInt(numeroDaCasa, 10),
            complement: complemento,
            references: referencia
        });

        await adressRepository.save(newAddress);

        const newAthlete = athleteRepository.create(
        {
            name,
            password: hashedPassword,
            cpf,
            rg,
            birthday,
            phone,
            photo_url: athletePhotoUrl,
            email,
            father_name: fatherName,
            father_phone: fatherPhoneNumber,
            father_cpf: fatherCpf,
            father_email: fatherEmail,
            mother_name: motherName,
            mother_phone: motherPhoneNumber,
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
            address: newAddress
        });

        await athleteRepository.save(newAthlete);

        res.status(201).json(
        { 
            message: "Atleta cadastrado com sucesso!", 
            athlete: newAthlete 
        });
        
    } catch (error) 
      {
        console.error(error); 
        res.status(500).json({ message: "Erro interno do servidor." });
      }
});

export default router;
