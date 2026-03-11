import express from "express";
import {
  getHome,
  getAbout,
  getHello,
} from "../controllers/statusController.js";

const router = express.Router();

router.get("/", getHome);
router.get("/about", getAbout);
router.get("/hello", getHello);

export default router;
