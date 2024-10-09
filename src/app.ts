import express from "express";
import * as dotenv from "dotenv";
import { existsSync, unlinkSync } from "fs";
import materialRoute from "./routes/material";

dotenv.config();

//configuração apenas para o ambiente de desenvolvimento
const dbFile = "db.sqlite";
if (existsSync(dbFile)) unlinkSync(dbFile);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", materialRoute);

export default app;