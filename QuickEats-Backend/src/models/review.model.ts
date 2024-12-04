import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Reference to the User model
    required: true
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",  // Reference to the Restaurant model
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,  // Minimum rating of 1
    max: 5   // Maximum rating of 5
  },
  comment: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const ReviewModel = mongoose.model('Review', reviewSchema);

export default ReviewModel;
