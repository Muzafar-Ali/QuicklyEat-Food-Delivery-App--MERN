import { NextFunction, Request, Response } from "express";
import { OrderModel } from "../models/order.model.js";
import ErrorHandler from "../utils/errorClass.js";
import RestaurantModel from "../models/restaurant.model.js";
import { createLineItems } from "../services/order.service.js";
import Stripe from "stripe";
import config from "../config/config.js";
import { TCheckoutSessionRequest } from "../types/order.type.js";


const stripe = new Stripe(config.stripeSecretKey!);

export const createOrderHandler = async ( req: Request, res: Response, next: NextFunction) => {
  try {
    const {restaurant, deliveryDetails, cartItems, totalAmount, status} = req.body;
    
    const order = await OrderModel.create({
      user: req.id, 
      restaurant, 
      deliveryDetails,
      cartItems,
      totalAmount,
      status
    });
    if(!order) throw new ErrorHandler(404, "Order not created");
    
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order
    });
    
  } catch (error) {
    console.error("createOrder error = ", error);
    next(error)
  }
}

export const getOrderHandler = async ( req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.id;

    const order = await OrderModel.find({user: userId}).populate("user").populate("restaurant");
    if(!order) throw new ErrorHandler(404, "Order not found");

    res.status(200).json({
      success: true,
      message: "Order found successfully",
      order
    });
    
  } catch (error) {
    console.error("getOrder error = ", error);
    next(error)
  }
}

export const createCheckoutSessionHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {totalAmount} = req.body;
    const CheckoutSession: TCheckoutSessionRequest = req.body;

    const restaurant = await RestaurantModel.findById(CheckoutSession.restaurantId).populate("menus")
    if(!restaurant) throw new ErrorHandler(404, "Restaurant not found");

    // line items
    const menuItems = restaurant.menus;
    const lineItems = createLineItems( CheckoutSession, menuItems );
    
    const order = new OrderModel({
      user: req.id,
      restaurant: CheckoutSession.restaurantId,
      deliveryDetails: CheckoutSession.deliveryDetails,
      cartItems: CheckoutSession.cartItems,
      totalAmount,
      status: "pending"
    });
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "AE"]
      },
      success_url: `${config.clientUrl}/success`,
      cancel_url: `${config.clientUrl}/failed`,
      metadata: {
        orderId: order._id.toString(),
        images: JSON.stringify(menuItems.map((item: any) => item.image))
      }
    });
    
    if(!session.url) throw new ErrorHandler(400, "Checkout session not created");
    await order.save();    

    res.status(200).json({
      success: true,
      message: "Checkout session created successfully",
      session
    });

  } catch (error) {
    console.error("createCheckoutSession error = ", error);
    next(error)
  }
}

export const getAllOrderHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await OrderModel.find().populate("user").populate("restaurant");
    if(!orders) throw new ErrorHandler(404, "Order not found");

    res.status(200).json({
      success: true,
      message: "Order found successfully",
      orders
    });

  } catch (error) {
    console.error("getAllOrder error = ", error);
    next(error)
  }
}

export const getOrderByUserIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.id;

    const order = await OrderModel.find({user: userId}).populate("user").populate("restaurant");
    if(!order) throw new ErrorHandler(404, "Order not found");

    res.status(200).json({
      success: true,
      message: "Order found successfully",
      order
    });

  } catch (error) {
    console.error("getOrderByUserId error = ", error);
    next(error)
  }
}

// export const updateOrderHandler = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const {id} = req.params;
//     const {status} = req.body;

//     const order = await OrderModel.findByIdAndUpdate(id, {status}, {new: true});
//     if(!order) throw new ErrorHandler(404, "Order not found");

//     res.status(200).json({
//       success: true,
//       message: "Order updated successfully",
//       order
//     });

//   } catch (error) {
//     console.error("updateOrder error = ", error);
//     next(error)
//   }
// }
// export const deleteOrderHandler = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const {id} = req.params;

//     const order = await OrderModel.findByIdAndDelete(id);
//     if(!order) throw new ErrorHandler(404, "Order not found");

//     res.status(200).json({
//       success: true,
//       message: "Order deleted successfully",
//       order
//     });

//   } catch (error) {
//     console.error("deleteOrder error = ", error);
//     next(error)
//   }
// }
// export const getOrderByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const {id} = req.params;

//     const order = await OrderModel.findById(id).populate("user").populate("restaurant");
//     if(!order) throw new ErrorHandler(404, "Order not found");

//     res.status(200).json({
//       success: true,
//       message: "Order found successfully",
//       order
//     });

//   } catch (error) {
//     console.error("getOrderById error = ", error);
//     next(error)
//   }
// }

// export const getOrderByRestaurantIdHandler = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const {id} = req.params;

//     const order = await OrderModel.find({restaurant: id}).populate("user").populate("restaurant");
//     if(!order) throw new ErrorHandler(404, "Order not found");

//     res.status(200).json({
//       success: true,
//       message: "Order found successfully",
//       order
//     });

//   } catch (error) {
//     console.error("getOrderByRestaurantId error = ", error);
//     next(error)
//   }
// }
// export const getOrderByStatusHandler = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const {status} = req.body;

//     const order = await OrderModel.find({status}).populate("user").populate("restaurant");
//     if(!order) throw new ErrorHandler(404, "Order not found");

//     res.status(200).json({
//       success: true,
//       message: "Order found successfully",
//       order
//     });

//   } catch (error) {
//     console.error("getOrderByStatus error = ", error);
//     next(error)
//   }
// }
// export const getOrderByDeliveryDetailsHandler = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const {deliveryDetails} = req.body;

//     const order = await OrderModel.find({deliveryDetails}).populate("user").populate("restaurant");
//     if(!order) throw new ErrorHandler(404, "Order not found");

//     res.status(200).json({
//       success: true,
//       message: "Order found successfully",
//       order
//     });

//   } catch (error) {
//     console.error("getOrderByDeliveryDetails error = ", error);
//     next(error)
//   }
// }