import express from "express";
import * as dotenv from "dotenv";
import { existsSync, unlinkSync } from "fs";
import materialRoute from "./routes/material";
import userRoute from "./routes/userBase";
import managerRoute from "./routes/manager";
import teacherRoute from "./routes/teacher";
import cors from "cors";

dotenv.config();

//configuração apenas para o ambiente de desenvolvimento
const dbFile = "db.sqlite";
if (existsSync(dbFile)) unlinkSync(dbFile);

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/material/", materialRoute);
app.use("/api/userbase/", userRoute);
app.use("/api/manager/", managerRoute);
app.use("/api/teacher/", teacherRoute);

export default app;