import { athleteRouter, managerRouter, materialRouter, modalityRouter, teacherRouter, authRouter, enrollmentRouter, absencesRouter, registerRouter, authMiddlewareRouter } from "./routes";
import { existsSync, unlinkSync } from "fs";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

//configuração apenas para o ambiente de desenvolvimento
const dbFile = "db.sqlite";
if (existsSync(dbFile)) unlinkSync(dbFile);

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', //definindo a porta que o front esta rodando pq o cors estava nao permitindo por conta da proteção de rota
    credentials: true                
  }));
  
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/material/", materialRouter);
app.use("/api/userbase/", athleteRouter);
app.use("/api/manager/", managerRouter);
app.use("/api/teacher/", teacherRouter);
app.use("/api/modality/", modalityRouter);
app.use("/api/auth/", authRouter);
app.use("/api/enrollment/", enrollmentRouter);
app.use("/api/absences/", absencesRouter);
app.use("/api/register/", registerRouter);
app.use("/api/protect/", authMiddlewareRouter);

export default app;