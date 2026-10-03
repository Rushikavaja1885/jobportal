import express from "express";
import { postJob, getAlljobs, getAdminjobs, getJobById } from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAlljobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminjobs);
router.route("/get/:id").put(isAuthenticated, getJobById);

export default router;