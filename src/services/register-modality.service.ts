import express, { Router, Request, Response } from "express";
import { AppDataSource } from "../database/config";
import { Modality } from "../entities/modality.entity";

const modalityRepository = AppDataSource.getRepository(Modality);

export const modalityService = {
  async createModality(data: any, req?, res?) {
  
      const {
        name,
        description,
        days_of_week,
        start_time,
        end_time,
        class_locations,
      } = req.body;
      const existModality = await modalityRepository.findOneBy({ name });
      if (existModality) {
        res.status(400).json({ message: "modalidade ja existente" });
        return;
      }
      const register = modalityRepository.create({
        name,
        description,
        days_of_week,
        start_time,
        end_time,
        class_locations,
      });
      await modalityRepository.save(register);
      return { message: "cadastrado realizado com sucesso"};
  }
};
