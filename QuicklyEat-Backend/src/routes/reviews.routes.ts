import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { createReviewHandler } from "../contorollers/review.controllers.js";

const route = Router();

route.post("/:id", isAuthenticated, createReviewHandler);

export default route;

