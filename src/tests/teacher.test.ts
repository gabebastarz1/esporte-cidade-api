import { describe, it, beforeEach, afterEach } from "node:test";
import { strict as assert } from "node:assert";
import { Teacher } from "../entities/teacher.entity";
import { AppDataSource } from "../database/config";
import app from "../app";
import request from "supertest";
import { Roles } from "../enums/roles.enum";
import { Modality } from "src/entities/modality.entity";
import { DaysOfWeek } from "src/enums/daysOfWeek.enum";

const BASE_URL = "/api/teacher/";

beforeEach(async () => {
    if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
    }

    await AppDataSource.initialize();

    const modalityRepository = AppDataSource.getRepository(Modality);
    const teacherRepository = AppDataSource.getRepository(Teacher);

    await modalityRepository.clear();
    await teacherRepository.clear();

    // Criar modalidades de exemplo
    const modalities = [
        {
            name: "Yoga",
            description: "Exercício relaxante e fortalecedor.",
            days_of_week: [DaysOfWeek.SEGUNDA, DaysOfWeek.QUARTA, DaysOfWeek.SABADO],
            start_time: "08:00",
            end_time: "10:00",
            class_locations: ["Sala 1", "Sala 2"],
        },
        {
            name: "Natação",
            description: "Melhore suas habilidades de natação com treino profissional.",
            days_of_week: [DaysOfWeek.TERCA, DaysOfWeek.QUINTA],
            start_time: "14:00",
            end_time: "16:00",
            class_locations: ["Piscina 1"],
        },
    ];

    const savedModalities = [];
    for (const modality of modalities) {
        const savedModality = await modalityRepository.save(modality);
        savedModalities.push(savedModality);
    }

    const teachers = [
        {
            name: "Professor Alice",
            password: "password123",
            cpf: "12345678901",
            rg: "12345678",
            birthday: "1980-03-10",
            phone: "+5511987654321",
            photo_url: "https://example.com/photos/teacheralice.jpg",
            email: `teacheralice-${Date.now()}@example.com`,
            about: "Instrutora experiente de yoga.",
            modality: savedModalities[0],
            role: Roles.TEACHER,
        },
        {
            name: "Professor Bob",
            password: "securepassword789",
            cpf: "98765432100",
            rg: "87654321",
            birthday: "1975-06-20",
            phone: "+5511976543210",
            photo_url: "https://example.com/photos/teacherbob.jpg",
            email: `teacherbob-${Date.now()}@example.com`,
            about: "Treinador de natação com mais de 10 anos de experiência.",
            modality: savedModalities[1],
            role: Roles.TEACHER,
        },
    ];

    for (const teacher of teachers) {
        await teacherRepository.save(teacher);
    }
});


afterEach(async () => {
    if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
    }
});

describe("Testing the Teacher router", () => {
    describe("GET request", () => {
        it("should get all teachers", async () => {
            const res = await request(app)
                .get(BASE_URL)
                .expect("Content-Type", /json/)
                .expect(200);

            assert.ok(Array.isArray(res.body), "Response should be an array of teachers");
        });

        it("should return error for invalid ID", async () => {
            const res = await request(app)
                .get(`${BASE_URL}-1`)
                .expect("Content-Type", /json/)
                .expect(404);

            assert.strictEqual(res.status, 404, "Response should return 404 for invalid ID");
        });
    });

    describe("POST request", () => {
        it("should create a new teacher with correct data", async () => {
            const newTeacher = {
                name: "Teacher Charlie",
                password: "newsecurepassword123",
                cpf: "22233344455",
                rg: "55667788",
                birthday: "1990-01-01",
                phone: "+5511999999999",
                photo_url: "https://example.com/photos/teachercharlie.jpg",
                email: "teachercharlie@example.com",
            };

            const res = await request(app)
                .post(BASE_URL)
                .send(newTeacher)
                .expect("Content-Type", /json/)
                .expect(201);

            assert.ok(res.body.id, "Response should contain the ID of the new teacher");
            assert.strictEqual(res.body.name, newTeacher.name, "Teacher name does not match");
        });
    });

    describe("DELETE request", () => {
        it("should delete a teacher", async () => {
            const tempTeacher = {
                name: "Teacher Delete",
                password: "tempsecurepassword123",
                cpf: "55566677788",
                rg: "11223344",
                birthday: "1985-08-25",
                phone: "+5511988888888",
                photo_url: "https://example.com/photos/tempteacher.jpg",
                email: "tempteacher@example.com",
            };

            const createRes = await request(app)
                .post(BASE_URL)
                .send(tempTeacher)
                .expect(201);

            const teacherId = createRes.body.id;

            const deleteRes = await request(app)
                .delete(`${BASE_URL}${teacherId}`)
                .expect(200);

            assert.strictEqual(deleteRes.status, 200, "Delete status should be 200");

            const getRes = await request(app)
                .get(`${BASE_URL}${teacherId}`)
                .expect(404);

            assert.strictEqual(getRes.status, 404, "Deleted teacher should return 404");
        });
    });

    describe("PUT request", () => {
        it("should update the teacher details", async () => {
            const tempTeacher = {
                name: "Teacher Update",
                password: "oldpassword123",
                cpf: "11122334455",
                rg: "11223344",
                birthday: "1985-07-01",
                phone: "+5511998887777",
                photo_url: "https://example.com/photos/oldteacher.jpg",
                email: "oldteacher@example.com",
            };

            const createRes = await request(app)
                .post(BASE_URL)
                .send(tempTeacher)
                .expect(201);

            const teacherId = createRes.body.id;

            const updatedTeacher = {
                name: "Updated Teacher",
                password: "newpassword123",
                phone: "+5511999999999",
            };

            const updateRes = await request(app)
                .put(`${BASE_URL}${teacherId}`)
                .send(updatedTeacher)
                .expect(200);

            assert.strictEqual(updateRes.body.name, updatedTeacher.name, "Name was not updated correctly");
            assert.strictEqual(updateRes.body.phone, updatedTeacher.phone, "Phone was not updated correctly");
        });
    });
});
