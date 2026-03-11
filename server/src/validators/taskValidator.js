import Joi from "joi";

export const createTaskSchema = Joi.object({
  title: Joi.string().required().trim().min(1).max(100),
  completed: Joi.boolean(),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().trim().min(1).max(100),
  completed: Joi.boolean(),
});
