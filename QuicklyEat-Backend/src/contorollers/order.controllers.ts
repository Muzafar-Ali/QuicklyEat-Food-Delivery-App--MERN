import { NextFunction, Request, Response } from "express";
import { createLineItems } from "../services/order.service.js";
import { TCheckoutSessionRequest } from "../types/order.type.js";
import ErrorHandler from "../utils/errorClass.js";
import RestaurantModel from "../models/restaurant.model.js";
import OrderModel from "../models/order.model.js";
import Stripe from "stripe";
import config from "../config/config.js";


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
    const userId = req.id;
    const { totalAmount } = req.body;
    const checkoutSession: TCheckoutSessionRequest = req.body;

    const restaurant = await RestaurantModel.findById(checkoutSession.restaurantId).populate({
      path: "menus",
      populate: {
        path: "menuItems",
      }
    })
    if(!restaurant) throw new ErrorHandler(404, "Restaurant not found");
    
    // line items
    const menus = restaurant.menus as unknown as [{
      _id: string,
      name: string,
      description: string,
      image: string,
      menuItems: [{ 
        _id: string,
         title: string,
         price: string,
         description: string,
         image: string,
      }],
    }];   
    
    const lineItems = createLineItems( checkoutSession, menus );

    const order = new OrderModel({
      user: userId,
      restaurant: checkoutSession.restaurantId,
      deliveryDetails: checkoutSession.deliveryDetails,
      cartItems: checkoutSession.cartItems,
      totalAmount,
      status: "pending"
    });

    // Get images only for the items in the cart
    const cartItemImages = checkoutSession.cartItems.map(cartItem => {
      // Find the menu item in the menus array by matching the menuItemId
      const menuItem = menus.flatMap(menu => menu.menuItems)
        .find(menuItem => menuItem._id.toString() === cartItem.menuItemId.toString());

      // If menuItem exists, return the image, otherwise return null
      return menuItem?.image || null;
    }).filter(Boolean); // Remove any null values in case an item doesn't have an image

     // Convert to JSON string
    let imageUrls = JSON.stringify(cartItemImages);
    
    // This section of the code will be removed once we transition to paid Stripe services
    // Ensure metadata stays within the character limit (500 characters max)
    if (imageUrls.length > 500) {
      imageUrls = imageUrls.substring(0, 500); // trim to 500 characters if needed
    }

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
        orderId: order._id!.toString(),
        images: imageUrls
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
    const orders = await OrderModel.find()
    .populate("user")
    .populate("restaurant")
    .populate("cartItems.menuItemId")
    
    if(!orders) throw new ErrorHandler(404, "Order not found");

    // Sort orders based on the natural order of status in the enum
    const sortedOrders = orders.sort((a: any, b: any) => {
      const statusOrder = ["pending", "confirmed", "preparing", "onTheWay", "delivered"]; // order display sequence
      const statusAIndex = statusOrder.indexOf(a.status);
      const statusBIndex = statusOrder.indexOf(b.status);

      return statusAIndex - statusBIndex;  // Ascending order based on the index
    });

    res.status(200).json({
      success: true,
      message: "Order found successfully",
      orders: sortedOrders
    });

  } catch (error) {
    console.error("getAllOrder error = ", error);
    next(error)
  }
}

export const getOrderByUserIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.id;
    
    const orders = await OrderModel.find({user: userId})
    .populate("user")
    .populate("restaurant")
    .populate("cartItems.menuItemId")
    
    if(!orders) throw new ErrorHandler(404, "Order not found");
    
    // Sort orders based on the natural order of status in the enum
    const sortedOrders = orders.sort((a: any, b: any) => {
      const statusOrder = ["pending", "confirmed", "preparing", "onTheWay", "delivered"]; // order display sequence
      const statusAIndex = statusOrder.indexOf(a.status);
      const statusBIndex = statusOrder.indexOf(b.status);

      return statusAIndex - statusBIndex;  // Ascending order based on the index
    });

    res.status(200).json({
      success: true,
      message: "Order found successfully",
      order: sortedOrders
    });

  } catch (error) {
    console.error("getOrderByUserId error = ", error);
    next(error)
  }
}

export const updateOrderStatusHandler = async (reg: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId } = reg.params;
    const { status } = reg.body;

    const order = await OrderModel.findById(orderId);
    if(!order) throw new ErrorHandler(404, "Order not found");
    
    order.status = status;
    await order.save();
    
    res.status(200).json({
      success: true,
      message: `Order status updated successfully to ${order.status}`,
    })
    
  } catch (error) {
    console.error("updateOrderStatusHandler error = ", error);
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