import { Router } from "express";
import { createMenuHandler, deleteMenuHandler, getMenuHandler, updateMenuHandler } from "../contorollers/menu.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { idSchema } from "../schema/menu.schema.js";
import upload from "../middlewares/multer.middlewar2.js";
import validateRequestData from "../middlewares/validateRequestData.js";


const route = Router();

route.post("/", [isAuthenticated, upload.single("file")] , createMenuHandler)
route.get("/", isAuthenticated, getMenuHandler)
route.put("/:id", [isAuthenticated, upload.single("file"), validateRequestData(idSchema)],  updateMenuHandler)
route.delete("/:id", [isAuthenticated, validateRequestData(idSchema)],  deleteMenuHandler)

export default route;