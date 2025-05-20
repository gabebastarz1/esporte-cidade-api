import express, { Router, Request, Response } from "express";
import { AppDataSource } from "../database/config";
import { Modality } from "../entities/modality.entity";

const modalityRepository = AppDataSource.getRepository(Modality);

export const modalityService = {
  async viewModality() {
    const modalities = await modalityRepository.find();
    return modalities;
  },

  async viewModalityById(id: number) {
    const modality = await modalityRepository.findOneBy({ id });
    if (!modality) {
      const error: any = new Error("Modalidade não encontrada");
      error.status = 404;
      throw error;
    }
    return modality;
  },

  async createModality(data: any) {
    const { name, description, days_of_week, start_time, end_time, class_locations } = data;

    const existModality = await modalityRepository.findOneBy({ name });
    if (existModality) {
      const error: any = new Error("Modalidade já existente");
      error.status = 400;
      throw error;
    }

    const newModality = modalityRepository.create({
      name,
      description,
      days_of_week,
      start_time,
      end_time,
      class_locations,
    });

    await modalityRepository.save(newModality);
    return { message: "Cadastro realizado com sucesso" };
  },

  async updateModality(id: number, data: any) {
    const modality = await modalityRepository.findOneBy({ id });
    if (!modality) {
      const error: any = new Error("Modalidade não encontrada");
      error.status = 404;
      throw error;
    }

    modalityRepository.merge(modality, data);
    await modalityRepository.save(modality);
    return { message: "Modalidade atualizada com sucesso" };
  },

  async deleteModality(id: number) {
    const modality = await modalityRepository.findOneBy({ id });
    if (!modality) {
      const error: any = new Error("Modalidade não encontrada");
      error.status = 404;
      throw error;
    }

    await modalityRepository.remove(modality);
    return { message: "Modalidade excluída com sucesso" };
  },
};

