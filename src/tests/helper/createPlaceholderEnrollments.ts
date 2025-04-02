import { AppDataSource } from "src/database/config";
import { Athlete } from "src/entities/athlete.entity";
import { Enrollment } from "src/entities/enrollment.entity";
import { Modality } from "src/entities/modality.entity";
import { enrollmentsPlaceholder } from "./data";

const enrollmentRepository = AppDataSource.getRepository(Enrollment);
const modalityRepository = AppDataSource.getRepository(Modality);
const athleteRepository = AppDataSource.getRepository(Athlete);

export const createPlaceholderEnrollments = async () => {
    let i = 0;
    for (var enrollment of enrollmentsPlaceholder) {
        const newEnrollment = enrollmentRepository.create(enrollment);

        const modalities = await modalityRepository.find();
        const athletes = await athleteRepository.find();

        newEnrollment.modality = modalities[i];
        newEnrollment.athlete = athletes[i];

        await enrollmentRepository.save(newEnrollment);
        i++;
    }
}