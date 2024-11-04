import { Router } from "express";
import { createCheckoutSessionHandler, createOrderHandler, getAllOrderHandler, getOrderByUserIdHandler, getOrderHandler, updateOrderStatusHandler } from "../contorollers/order.controllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const route = Router();

route.post("/", isAuthenticated, createOrderHandler);
route.post("/checkout/create-checkout-session", isAuthenticated, createCheckoutSessionHandler);
route.get("/user", isAuthenticated, getOrderByUserIdHandler);
route.get("/all", isAuthenticated, getAllOrderHandler);
route.put("/status/:orderId", isAuthenticated, updateOrderStatusHandler);

export default route;