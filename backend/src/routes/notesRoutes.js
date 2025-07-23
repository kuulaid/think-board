import express from "express";
import { deleteNote, getNoteByID, createNote, getAllNotes, updateNote} from "../controllers/notesControllers.js";

const router = express.Router();


router.get("/", getAllNotes);
router.get("/:id", getNoteByID);
router.post("/", createNote);
router.put ("/:id", updateNote);
router.delete ("/:id", deleteNote);


export default router;