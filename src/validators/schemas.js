
import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Ism kiritilishi shart",
    "string.min": "Ism kamida 2 ta belgidan iborat bo'lishi kerak",
    "string.max": "Ism 50 ta belgidan oshmasligi kerak",
    "any.required": "Ism kiritilishi shart",
  }),

  email: Joi.string().trim().email().max(100).required().messages({
    "string.email": "Email formati noto'g'ri",
    "string.empty": "Email kiritilishi shart",
    "any.required": "Email kiritilishi shart",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
    "string.empty": "Parol kiritilishi shart",
    "any.required": "Parol kiritilishi shart",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    "string.email": "Email formati noto'g'ri",
    "string.empty": "Email kiritilishi shart",
    "any.required": "Email kiritilishi shart",
  }),

  password: Joi.string().required().messages({
    "string.empty": "Parol kiritilishi shart",
    "any.required": "Parol kiritilishi shart",
  }),
});

export const videoSchema = Joi.object({
  title: Joi.string().trim().min(1).max(100).required().messages({
    "string.empty": "Video nomi kiritilishi shart",
    "string.max": "Video nomi 100 ta belgidan oshmasligi kerak",
    "any.required": "Video nomi kiritilishi shart",
  }),

  description: Joi.string().allow("").optional(),

  videoUrl: Joi.string().trim().uri().required().messages({
    "string.uri": "Video URL formati noto'g'ri",
    "string.empty": "Video URL kiritilishi shart",
    "any.required": "Video URL kiritilishi shart",
  }),
});

export const commentSchema = Joi.object({
  text: Joi.string().trim().min(1).max(500).required().messages({
    "string.empty": "Izoh matni kiritilishi shart",
    "string.min": "Izoh bo'sh bo'lmasligi kerak",
    "string.max": "Izoh 500 ta belgidan oshmasligi kerak",
    "any.required": "Izoh matni kiritilishi shart",
  }),
});
