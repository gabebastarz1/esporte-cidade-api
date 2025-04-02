import test, { describe, beforeEach, after } from "node:test";
import { AppDataSource } from "../database/config";
import { Athlete } from "src/entities/athlete.entity";
import { Modality } from "src/entities/modality.entity";
import { Enrollment } from "src/entities/enrollment.entity";
import { enrollmentsPlaceholder } from "./helper/data";
import { createPlaceholderAthletes } from "./helper/createPlaceholderAthletes";
import { createPlaceholderModalities } from "./helper/createPlaceholderModalities";
import { createPlaceholderEnrollments } from "./helper/createPlaceholderEnrollments";
import assert from "node:assert"
import request from "supertest";
import app from "src/app";

const BASE_URL = "/api/enrollment/";

const athleteRepository = AppDataSource.getRepository(Athlete);
const modalityRepository = AppDataSource.getRepository(Modality);
const enrollmentRepository = AppDataSource.getRepository(Enrollment);

beforeEach(async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    await enrollmentRepository.clear();
    await modalityRepository.clear();
    await athleteRepository.clear();

    await createPlaceholderAthletes();
    await createPlaceholderModalities();
    await createPlaceholderEnrollments();
});

after(async () => {
    if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
    }
});

describe("testing enrollment", () => {
    test("enrollment can successfully be made", async () => {
        const athletes = await athleteRepository.find();
        const modalities = await modalityRepository.find();

        const athleteId = athletes[0].id;
        const modalityId = modalities[0].id;

        const [_, countBefore] = await enrollmentRepository.findAndCount();

        await request(app)
            .post(BASE_URL)
            .send(
                {
                    athleteId,
                    modalityId
                }
            )
            .expect('Content-Type', /json/)
            .expect(201)

        const [__, countAfter] = await enrollmentRepository.findAndCount();

        assert.notStrictEqual(countBefore, countAfter);
    });
    test("all enrollments can be fetched", async () => {        
        const receivedEnrollments = await request(app)
            .get(BASE_URL)
            .expect('Content-Type', /json/)
            .expect(200)

        assert.equal(receivedEnrollments.length, enrollmentsPlaceholder.length);
    });
})