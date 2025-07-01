import express, { Request, Response } from "express";
import { AppDataSource } from "../database/config";
import { Modality } from "../entities/modality.entity";

const router = express.Router();
const modalityRepository = AppDataSource.getRepository(Modality);

