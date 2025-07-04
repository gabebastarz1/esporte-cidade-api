import express, { Router, Request, Response } from "express";
import { AppDataSource } from "../database/config";
import { Modality } from "../entities/modality.entity";
import { Teacher } from "../entities/teacher.entity";
import { Log } from "../utils/personalizedLogs.util";

const modalityRepository = AppDataSource.getRepository(Modality);
const teacherRepository = AppDataSource.getRepository(Teacher);

export const modalityService = {
  async viewModality() {
    const modalities = await modalityRepository.find({
      where: { active: true },
      relations: ["teachers"],
    });

    return modalities;
  },

  async viewModalityById(id: number) {
    const modality = await modalityRepository.findOne({
      where: { id, active: true }, 
      relations: ["teachers"],
    });

    if (!modality) {
      const error: any = new Error("Modalidade não encontrada");
      error.status = 404;
      throw error;
    }

    return { modality };
  },
  async createModality(data: any) {
    const {
      name,
      description,
      days_of_week,
      start_time,
      end_time,
      class_locations,
      teacherId,
    } = data;

    const existModality = await modalityRepository.findOneBy({ name });
    if (existModality) {
      const error: any = new Error("Modalidade já existente");
      error.status = 400;
      throw error;
    }

    const newModality = modalityRepository.create({
      name,
      description,
      days_of_week: Array.isArray(days_of_week)
        ? days_of_week.join(", ")
        : days_of_week,
      start_time,
      end_time,
      class_locations: Array.isArray(class_locations)
        ? class_locations.join(", ")
        : class_locations,
    });

    await modalityRepository.save(newModality);

    if (teacherId) {
      const teacher = await teacherRepository.findOneBy({ id: teacherId });

      if (!teacher) {
        const error: any = new Error("Professor não encontrado");
        error.status = 404;
        throw error;
      }

      teacher.modality = newModality;
      await teacherRepository.save(teacher);
    }

    return { message: "Cadastro realizado com sucesso" };
  },

  async updateModality(id: number, data: any) {
    const modality = await modalityRepository.findOneBy({ id });
    if (!modality) {
      const error: any = new Error("Modalidade não encontrada");
      error.status = 404;
      throw error;
    }

    const updatedData = {
      ...data,
      days_of_week: Array.isArray(data.days_of_week)
        ? data.days_of_week.join(", ")
        : data.days_of_week,
      class_locations: Array.isArray(data.class_locations)
        ? data.class_locations.join(", ")
        : data.class_locations,
    };

    modalityRepository.merge(modality, updatedData);
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

    modality.active = false;
    await modalityRepository.save(modality);

    return { message: "Modalidade desativada com sucesso" };
  },
  async assignTeacherToModality(modalityId: number, teacherId: number) {
    const modality = await modalityRepository.findOneBy({ id: modalityId });
    if (!modality) {
      const error: any = new Error("Modalidade não encontrada");
      error.status = 404;
      Log.error(`nao encontrado modalidade ${modalityId}`);
      throw error;
    }

    const teacher = await teacherRepository.findOneBy({ id: teacherId });
    if (!teacher) {
      const error: any = new Error("Professor não encontrado");
      error.status = 404;
      Log.error(`nao encontrado professor ${teacherId}`);
      throw error;
    }

    teacher.modality = modality;
    await teacherRepository.save(teacher);
    Log.success(
      `professor: ${JSON.stringify(
        teacher
      )} atribuido a modalidade: ${JSON.stringify(modality)}`
    );
    return { message: "Professor atribuído à modalidade com sucesso" };
  },
};
