import express from "express";
import {
  getHome,
  getAbout,
  getHello,
  getHealthCheck,
} from "../controllers/statusController.js";

const router = express.Router();

router.get("/", getHome);
router.get("/about", getAbout);
router.get("/hello", getHello);
router.get("/health", getHealthCheck);

export default router;
