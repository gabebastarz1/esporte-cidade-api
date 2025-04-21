import { AppDataSource } from "../database/config";
import { Athlete } from "../entities/athlete.entity";
import { Modality } from "../entities/modality.entity";
import { Atendiment } from "../entities/atendiment.entity";
import { Roles } from "../enums/roles.enum";

async function seed() {
  await AppDataSource.initialize();

  // 1. Repositórios
const athleteRepo = AppDataSource.getRepository(Athlete);
const modalityRepo = AppDataSource.getRepository(Modality);
const atendimentRepo = AppDataSource.getRepository(Atendiment);

// 2. Buscar ou criar o atleta João
let athlete = await athleteRepo.findOneBy({ name: "João" });

if (!athlete) {
  athlete = athleteRepo.create({
    name: "João",
    password: "$2b$10$dxK9s52R400Rhgg/2GjbheTGK0BartuE743YTbJiF2VGfEWWe1TpS",
    cpf: "12345678900",
    birthday: "2005-01-01",
    phone: "11999999999",
    rg: "1234567",
    role: Roles.ATHLETES,
    father_name: "Pai do João",
    mother_name: "Mãe do João",
    responsible_person_name: "Responsável João",
  });
  await athleteRepo.save(athlete);
}

// 3. Criar modalidades se não existirem
const modalityNames = ["Futebol", "Basquete", "Capoeira"];
const modalities: Modality[] = [];

for (const name of modalityNames) {
  let modality = await modalityRepo.findOneBy({ name });

  if (!modality) {
    modality = modalityRepo.create({
      name,
      description: `${name} para iniciantes`,
      days_of_week: ["Segunda", "Quarta"],
      start_time: "08:00",
      end_time: "10:00",
      class_locations: ["Quadra 1"],
    });
    await modalityRepo.save(modality);
  }

  modalities.push(modality);
}

// 4. Criar atendimentos variados
const atendiments = atendimentRepo.create([
  { athlete, modality: modalities[0], present: false }, // Futebol
  { athlete, modality: modalities[0], present: true },  // Futebol
  { athlete, modality: modalities[1], present: false }, // Basquete
  { athlete, modality: modalities[2], present: true },  // Capoeira 
  { athlete, modality: modalities[1], present: true },  // Basquete
]);

await atendimentRepo.save(atendiments);

  console.log("Seed inserido com sucesso!");
}

async function main() {
  try {
    await seed();
  } catch (error) {
    console.error("Erro ao rodar seed:", error);
  } finally {
    await AppDataSource.destroy();
  }
}

main();
