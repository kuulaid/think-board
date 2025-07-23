import express from "express";
import { deleteNote, createNote, getAllNotes, updateNote } from "../controllers/notesControllers.js";

const router = express.Router();


router.get("/", getAllNotes);
router.post("/", createNote);
router.put ("/:id", updateNote);
router.delete ("/:id", deleteNote);


export default router;