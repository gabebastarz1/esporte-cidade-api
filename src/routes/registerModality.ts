import express from "express";
import { createModality, deleteModality, updateModality, viewModalities, viewModalityById } from "../controllers/modality.controller";

const router = express.Router();
router.get("/all", viewModalities)
router.get("/single/:id", viewModalityById)
router.post("/create", createModality) 
router.put("/update/:id", updateModality)
router.delete("/delete/:id", deleteModality)

export default router;