import express from "express";
import { addSchoolController, listSchoolController } from "../controllers";

const router = express.Router();

router.get("/list-schools", listSchoolController);
router.post("/add-school", addSchoolController);

export default router;
