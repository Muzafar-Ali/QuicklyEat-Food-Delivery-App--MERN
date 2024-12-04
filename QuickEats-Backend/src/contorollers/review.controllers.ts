import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorClass.js";
import ReviewModel from "../models/review.model.js";
import RestaurantModel from "../models/restaurant.model.js";

export const createReviewHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {rating, comment} = req.body;
    const restaurantId = req.params.id;
    const userId = req.id;
        
    if(!rating || !comment) throw new ErrorHandler(400, "Rating and comment are required");
    
    const existingReview = await ReviewModel.findOne({userId, restaurantId});
    if(existingReview) throw new ErrorHandler(400, "You have already reviewed this restaurant");

    const review = new ReviewModel({
      userId,
      restaurantId,
      rating,
      comment
    })
    
    await review.save(); 

    // Get all reviews for the restaurant
    const reviews = await ReviewModel.find({ restaurantId });

    // Calculate the new average rating
    const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = reviews.length > 0 ? totalRatings / reviews.length : 0; // Handle empty review array
    
    const restaurant = await RestaurantModel.findByIdAndUpdate(
      restaurantId,
      {
        $push: {reviews: review},
        $set: {averageRating: averageRating}
      },
      {new: true}
    )

    if(!restaurant) throw new ErrorHandler(404, "Restaurant not found");

    res.status(201).json({
      success: true,
      message: "Review added successfully",
    })
    
  } catch (error) {
    console.error("createReviewHandler error = ", error);
    next(error)
  }
  
}