import test, { describe, beforeEach, after, it, before } from "node:test";
import { AppDataSource } from "src/database/config";
import { Athlete } from "src/entities/athlete.entity";
import { Modality } from "src/entities/modality.entity";
import { Enrollment } from "src/entities/enrollment.entity";
import { createPlaceholderAthletes } from "./helper/createPlaceholderAthletes";
import { createPlaceholderModalities } from "./helper/createPlaceholderModalities";
import { createPlaceholderEnrollments } from "./helper/createPlaceholderEnrollments";
import assert from "node:assert"
import request from "supertest";
import app from "src/app";

const BASE_URL = "/api/enrollment";

const athleteRepository = AppDataSource.getRepository(Athlete);
const modalityRepository = AppDataSource.getRepository(Modality);
const enrollmentRepository = AppDataSource.getRepository(Enrollment);

beforeEach(async () => {
    if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
    }

    await AppDataSource.initialize();

    await enrollmentRepository.clear();
    await modalityRepository.clear();
    await athleteRepository.clear();

    await createPlaceholderAthletes();
    await createPlaceholderModalities();
    await createPlaceholderEnrollments();
});

describe("testing enrollment", () => {
    it("should create a new enrollment", async () => {
        const athletes = await athleteRepository.find();
        const modalities = await modalityRepository.find();

        const athleteId = athletes[0].id;
        const modalityId = modalities[0].id;

        const [_, countBefore] = await enrollmentRepository.findAndCount();

        const response = await request(app)
            .post(BASE_URL)
            .send(
                {
                    athleteId,
                    modalityId
                }
            )
            .expect(201)
            .expect('Content-Type', /json/);

        const newEnrollment = response.body;

        assert.strictEqual(newEnrollment.modality.id, modalityId);
        assert.strictEqual(newEnrollment.athlete.id, athleteId);

        const [__, countAfter] = await enrollmentRepository.findAndCount();

        assert.notStrictEqual(countBefore, countAfter);
    });
    it("should return all approved enrollments from an Athlete", { only: true }, async () => {


        const athletes = await athleteRepository.find();
        const athlete = athletes[0];

        const enrollments = await enrollmentRepository.find({ where: { athlete: athlete, approved: true, active: true } });

        const response = await request(app)
            .get(`${BASE_URL}/${athlete.id}?approved=true&active=true`)
            .expect(200)
            .expect('Content-Type', /json/);

        const receivedEnrollments = response.body;

        assert.equal(receivedEnrollments[0].id, enrollments[0].id);
        assert.equal(receivedEnrollments.length, enrollments.length);
    })
    it("should return all reproved enrollments from an Athlete", { only: true }, async () => {


        const athletes = await athleteRepository.find();
        const athlete = athletes[0];

        const enrollments = await enrollmentRepository.find({ where: { athlete: athlete, approved: false, active: true } });

        const response = await request(app)
            .get(`${BASE_URL}/${athlete.id}?approved=false&active=true`)
            .expect(200)
            .expect('Content-Type', /json/);

        const receivedEnrollments = response.body;

        assert.equal(receivedEnrollments.length, enrollments.length);
        assert.equal(receivedEnrollments[0].id, enrollments[0].id);
    })
    it("should return all approved enrolments", async () => {
        const dbEnrollements = await enrollmentRepository.findBy({ approved: true });

        const response = await request(app)
            .get(`${BASE_URL}?approved=true`)
            .expect(200)
            .expect('Content-Type', /json/);

        const receivedEnrollments = response.body;

        assert.equal(receivedEnrollments.length, dbEnrollements.length);
    });
})