import { Router } from "express";
import { createCheckoutSessionHandler, createOrderHandler, getAllOrderHandler, getOrderByUserIdHandler, getOrderHandler } from "../contorollers/order.controllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const route = Router();

route.post("/", isAuthenticated, createOrderHandler);
route.get("/checkout/create-checkout-session", isAuthenticated, createCheckoutSessionHandler);
route.get("/user", isAuthenticated, getOrderByUserIdHandler);
route.get("/all", isAuthenticated, getAllOrderHandler);

export default route;