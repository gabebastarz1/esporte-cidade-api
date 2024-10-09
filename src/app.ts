import express from "express";
import * as dotenv from "dotenv";
import { existsSync, unlinkSync } from "fs";
import materialRoute from "./routes/material";
// import { AppDataSource } from "./database/config";

dotenv.config();

//configuração apenas para o ambiente de desenvolvimento
const dbFile = "db.sqlite";
if (existsSync(dbFile)) unlinkSync(dbFile);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", materialRoute);

// AppDataSource.initialize()
//   .then(async () => {
//     console.log('Database connected');

//     AppDataSource.entityMetadatas.forEach(metadata => {
//       // console.log(`Load: Entity: ${metadata.name}, Table: ${metadata.tableName}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Database connection error:', error);
//   });

export default app;