import express from "express";
import { createModality } from "../controllers/modality.controller";

const router = express.Router();
router.post("/", createModality ) 

export const athleteRouter = router;