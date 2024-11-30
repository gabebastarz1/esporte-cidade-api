import 'reflect-metadata';
import { DataSource } from 'typeorm';
import env from "../environment/env";
// import { Modality } from "../entities/modality.entity";
// import { DaysOfWeek } from "../enums/daysOfWeek.enum";

export const AppDataSource = new DataSource({
  type: 'sqlite',
  // host: 'localhost',
  // port: 3306,
  // username: 'root',
  // password: 'senha',
  database: env.NODE_ENV ? 'db.test.sqlite' : 'db.sqlite',
  // url:"",
  synchronize: true, //sincroniza as alterações com o banco
  logging: false, // loga as queries do banco
  entities: ["src/entities/*{.ts,.js}"],
});


// * Essa função é para criar modalidades como placeholder no banco no dia da apresentação
// const createModalities = async () => {

// const modalityRepository = AppDataSource.getRepository(Modality);

//   const modalities = [
//     {
//       name: "Yoga",
//       description: "Exercício relaxante e fortalecedor.",
//       days_of_week: [DaysOfWeek.SEGUNDA, DaysOfWeek.QUARTA, DaysOfWeek.SABADO],
//       start_time: "08:00",
//       end_time: "10:00",
//       class_locations: ["Sala 1", "Sala 2"],
//     },
//     {
//       name: "Natação",
//       description: "Melhore suas habilidades de natação com treino profissional.",
//       days_of_week: [DaysOfWeek.TERCA, DaysOfWeek.QUINTA],
//       start_time: "14:00",
//       end_time: "16:00",
//       class_locations: ["Piscina 1"],
//     },
//   ];

//   const savedModalities = [];
//   for (const modality of modalities) {
//     const savedModality = await modalityRepository.save(modality);
//     savedModalities.push(savedModality);
//   }
// }

AppDataSource.initialize()
  .then(async () => {

    // createModalities();

    AppDataSource.entityMetadatas.forEach(metadata => {
      // console.log(`Load: Entity: ${metadata.name}, Table: ${metadata.tableName}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
