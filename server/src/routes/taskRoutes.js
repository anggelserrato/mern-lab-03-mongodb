import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../validators/taskValidator.js";
import { validateObjectId } from "../middlewares/validateObjectId.js";

const router = express.Router();

router
  .route("/")
  .get(getAllTasks)
  .post(validateSchema(createTaskSchema), createTask);
router
  .route("/:id")
  .get(validateObjectId, getTaskById)
  .put(validateObjectId, validateSchema(updateTaskSchema), updateTask)
  .delete(validateObjectId, deleteTask);

export default router;
