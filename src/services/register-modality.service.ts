import express, { Router, Request, Response } from "express";
import { AppDataSource } from "../database/config";
import { Modality } from "../entities/modality.entity";
import { Atendiment } from "../entities/atendiment.entity";
import { Teacher } from "../entities/teacher.entity";

const modalityRepository = AppDataSource.getRepository(Modality);
const atendimentsRepository = AppDataSource.getRepository(Atendiment);
const teacherRepository = AppDataSource.getRepository(Teacher)
// register-modality.service.ts
export const modalityService = {
  async viewModality() {
    const modalities = await modalityRepository.find({
      relations: ["teachers", "enrollments", "enrollments.athlete"]
    });
    return modalities;
  },

  async viewModalityById(id: number) {
    const modality = await modalityRepository.findOne({
      where: { id },
      relations: ["teachers", "enrollments", "enrollments.athlete"]
    });
    if (!modality) {
      const error: any = new Error("Modalidade não encontrada");
      error.status = 404;
      throw error;
    }
    return modality;
  },

  async createModality(data: any) {
    const { name, description, days_of_week, start_time, end_time, class_locations, teacherIds } = data;

    const existModality = await modalityRepository.findOneBy({ name });
    if (existModality) {
      const error: any = new Error("Modalidade já existente");
      error.status = 400;
      throw error;
    }

    const teachers = teacherIds ? await teacherRepository.findByIds(teacherIds) : [];

    const newModality = modalityRepository.create({
      name,
      description,
      days_of_week: Array.isArray(days_of_week) ? days_of_week : days_of_week.split(',').map(s => s.trim()),
      start_time,
      end_time,
      class_locations: Array.isArray(class_locations) ? class_locations : class_locations.split(',').map(s => s.trim()),
      teachers
    });

    await modalityRepository.save(newModality);
    return { 
      message: "Cadastro realizado com sucesso",
      modality: newModality 
    };
  },

  async updateModality(id: number, data: any) {
    const modality = await modalityRepository.findOne({
      where: { id },
      relations: ["teachers"]
    });
    if (!modality) {
      const error: any = new Error("Modalidade não encontrada");
      error.status = 404;
      throw error;
    }

    // Handle teachers update if provided
    if (data.teacherIds) {
      const teachers = await teacherRepository.findByIds(data.teacherIds);
      modality.teachers = teachers;
      delete data.teacherIds;
    }

    modalityRepository.merge(modality, {
      ...data,
      days_of_week: data.days_of_week ? 
        (Array.isArray(data.days_of_week) ? data.days_of_week : data.days_of_week.split(',').map(s => s.trim())) 
        : modality.days_of_week,
      class_locations: data.class_locations ? 
        (Array.isArray(data.class_locations) ? data.class_locations : data.class_locations.split(',').map(s => s.trim())) 
        : modality.class_locations
    });

    await modalityRepository.save(modality);
    return { 
      message: "Modalidade atualizada com sucesso",
      modality 
    };
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

  async getAvailableAthletes(id: number) {
    const modality = await modalityRepository.findOne({
      where: {
        id,
        enrollments: {
          active: true,
          approved: true
        }
      },
      relations: ["enrollments", "enrollments.athlete"],
      order: {
        enrollments: {
          athlete: {
            name: "ASC"
          }
        }
      }
    });

    if (!modality) {
      const error: any = new Error("Modalidade não encontrada");
      error.status = 404;
      throw error;
    }

    return {
      modality: {
        id: modality.id,
        name: modality.name
      },
      athletes: modality.enrollments.map(enrollment => ({
        id: enrollment.athlete.id,
        name: enrollment.athlete.name,
        cpf: enrollment.athlete.cpf
      }))
    };
  },

  async registerAttendances(data: any[]) {
    if (!Array.isArray(data)) {
      const error: any = new Error("Dados de atendimento inválidos");
      error.status = 400;
      throw error;
    }

    await atendimentsRepository.insert(data);
    return { message: "Atendimentos registrados com sucesso" };
  }
};