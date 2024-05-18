import { songMethod } from "../controllers/cancion.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", songMethod.getAllSongs);
router.post("/", songMethod.postOneSong);

export default router;
