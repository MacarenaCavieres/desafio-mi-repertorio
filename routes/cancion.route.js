import { songMethod } from "../controllers/cancion.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", songMethod.getAllSongs);
router.post("/", songMethod.postOneSong);
router.delete("/:id", songMethod.deleteOneSong);
router.put("/:id", songMethod.updateOneSong);
router.get("/:id", songMethod.getOneSong);

export default router;
