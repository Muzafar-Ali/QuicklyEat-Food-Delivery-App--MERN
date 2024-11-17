import { NextFunction, Request, Response } from "express"
import { TRestaurant, TUpdateRestaurant } from "../schema/restaurant.schema.js"
import { createRestaurant, uploadImages } from "../services/restaurant.services.js";
import { replaceImageOnCloudinary } from "../utils/cloudinary/replaceImageOnCloudinary.js";
import OrderModel from "../models/order.model.js";
import ErrorHandler from "../utils/errorClass.js";
import RestaurantModel from "../models/restaurant.model.js";
import uploadImageToCloudinary from "../utils/cloudinary/uploadImageToCloudinary.js";

export const createRestaurantHandler = async (req: Request<{}, {}, TRestaurant["body"]>, res: Response, next: NextFunction) => {
  try {
    const { restaurantName } = req.body  
    const image = req.file;
    const id = req.id;
    
    const restaurantExist = await RestaurantModel.findOne({user: req.id})
    
    if (restaurantExist) throw new ErrorHandler(409, "Restaurant already exist for this user"); // each user is allowed to create only one restaurant
 
    if(!image) throw new ErrorHandler(400, "Please upload a restaurant image");

    // upload images to cloudinary from local folder
    // const imageUrl = await uploadImages(restaurantName)

    // upload images to cloudinary directly
    const imageUrl = await uploadImageToCloudinary(image, restaurantName, "restaurant")
    console.log('imageUrl cloudinary', imageUrl);
    
    
    if(!imageUrl) throw new ErrorHandler(400, "Unable to upload images");
    
    // upload images to cloudinary from local folder
    // const restaurant = await createRestaurant(req.body, id, imageUrl[0])
    
    const restaurant = await createRestaurant(req.body, id, imageUrl)

    res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      restaurant
    })
    
  } catch (error) {
    console.error("createRestaurantHandler error = ", error);
    next(error)
  }
}

export const getRestaurantsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const restaurants = await RestaurantModel.find().populate({
      path:'menus',
      populate:{
        path:'menuItems',
      }
    });
    if(!restaurants) throw new ErrorHandler(404, "Restaurants not found");
    
    res.status(200).json({
      success: true,
      restaurants
    })

  } catch (error) {
    console.error("getRestaurantsHansler error = ", error);
    next(error)
  }
}

export const getRestaurantbyUserIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.id;
    const restaurant = await RestaurantModel.findOne({user: id}).populate({
      path:'menus',
      populate:{
        path:'menuItems',
      }
    })
    console.log('restaurant', restaurant);
    
    if(!restaurant) throw new ErrorHandler(404, "Restaurant not found");
    
    res.status(200).json({
      success: true,
      restaurant
    })
    
  } catch (error) {
    console.error("getRestaurantHandler error = ", error);
    next(error)
  }
}

export const getSingleRestaurantHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurantId = req.params.id;
    
    const restaurant = await RestaurantModel.findById(restaurantId).populate({
      path:'menus',
      populate:{
        path:'menuItems',
      }
    });

    if(!restaurant) throw new ErrorHandler(404, "Restaurant not found");
    
    res.status(200).json({
      success: true,
      restaurant
    })
    
  } catch (error) {
    console.error("getSingleRestaurantHandler error = ", error);
    next(error)
  }
}

export const updateRestaurantHandler = async (req: Request<{},{},TUpdateRestaurant["body"]>, res: Response, next: NextFunction) => {
  try {
    const userId = req.id;
    const image = req.file;
    const {city, country, cuisines, deliveryTime, menus, restaurantName} = req.body;   

    // Create an update object only with fields that are provided
    const updateData: any = {};
    if (city) updateData.city = city;
    if (country) updateData.country = country;
    if (cuisines) updateData.cuisines = cuisines;
    if (deliveryTime) updateData.deliveryTime = deliveryTime;
    if (menus) updateData.menus = menus;
    if (restaurantName) updateData.restaurantName = restaurantName;

    // update restaurant image    
    if (image) {
      if(!restaurantName) throw new ErrorHandler(400, "Restaurant name is required when uploading image ");
      const extractedPublicId = await RestaurantModel.findOne({user: userId}).select("imageUrl")
      const subFolder = "restaurant"
      
      const imageUrl = await replaceImageOnCloudinary(extractedPublicId, restaurantName, image, subFolder)
      updateData.imageUrl = imageUrl;
    }

    const restaurant = await RestaurantModel.findOneAndUpdate(
      {user: userId}, 
      updateData, 
      {new: true}
    )
    if(!restaurant) throw new ErrorHandler(404, "Restaurant not found");
    
    res.status(200).json({
      success: true,
      message: "Restaurant updated successfully",
      restaurant
    })
    
  } catch (error) {
    console.error("updateRestaurantHandler error = ", error);
    next(error)
  }
}

export const getRestaurantOrderHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.id;

    const restaurant = await RestaurantModel.findOne({ user: userId })
    if(!restaurant) throw new ErrorHandler(404, "Restaurant not found");

    const order = await OrderModel.find({restaurant: restaurant._id}).populate("restaurant").populate("user")
    if(!order || order.length === 0) throw new ErrorHandler(404, "No orders found");
    
    res.status(200).json({
      success: true,
      order
    })
    
  } catch (error) {
    console.error("getRestaurantOrderHandler error = ", error);
    next(error)
  }
}

export const searchRestaurantHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const searchQuery = req.query.searchQuery as string || "";  // Search term for restaurant name
    const selectedMenu = (req.query.cuisines as string || "").split(",").filter(cuisine => cuisine);  // Selected cuisines as array

    const query: any = {};  // Initialize query object

    if (searchQuery) {
      query.$or = [
        { restaurantName: { $regex: searchQuery, $options: 'i' } }, 
        { cuisines: { $regex: searchQuery, $options: 'i' } },          
        {
          "menus.title": { $regex: searchQuery, $options: 'i' },      
        },
        {
          "menus.description": { $regex: searchQuery, $options: 'i' }, 
        },
      ];
    }

    if (selectedMenu.length > 0) {
      // Adding conditions for selectedMenu
      query.$and = query.$and || [];  // Initialize $and if not already defined
      query.$and.push({
        $or: selectedMenu.map(menu => ({
          "menus.title": { $regex: menu, $options: 'i' },
          "menus.description": { $regex: menu, $options: 'i' }
        }))
      });
    }
    
    // If there is a search query or selected menu, fetch the results
    const restaurants = await RestaurantModel.aggregate([
      {
        $lookup: {
          from: "menus",  // Assuming "menus" is the related collection
          localField: "menus",
          foreignField: "_id",
          as: "menus"
        }
      },
      {
        $match: query  // Apply the combined query
      }
    ]);

    res.status(200).json({
      success: true,
      restaurants,
    });
  } catch (error) {
    console.error("searchRestaurantHandler error = ", error);
    next(error);
  }
};

// export const searchRestaurantHandler2 = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const searchQuery = req.query.searchQuery as string || "";  // Search term for restaurant name
//     const selectedMenu = (req.query.cuisines as string || "").split(",").filter(cuisine => cuisine);  // Selected cuisines as array

//     const query: any = {};  // Initialize query object
//     console.log('searchQuery',  searchQuery);

//     let restaurants;    
    
//     // Search by restaurantName or cuisines if a searchQuery is provided
//     if (searchQuery) {
//       console.log('search query block');
      
//       query.$or = [
//         { restaurantName: { $regex: searchQuery, $options: 'i' } },  // Case-insensitive match for restaurant name
//         { cuisines: { $regex: searchQuery, $options: 'i' } },          // Case-insensitive match for cuisines
//         {
//           "menus.title": { $regex: searchQuery, $options: 'i' },      // Case-insensitive match for menu titles
//         },
//         {
//           "menus.description": { $regex: searchQuery, $options: 'i' }, // Case-insensitive match for menu descriptions
//         },
//       ];
//       console.log('query', query);
      
//       restaurants = await RestaurantModel.find(query)
//     }

//     if(selectedMenu && selectedMenu.length !==0) {
//       console.log('selected menu block');

//       restaurants = await RestaurantModel.aggregate([
//         { 
//           $lookup : {
//             from: "menus",
//             localField: "menus",
//             foreignField: "_id",
//             as: "menus"
//           }
//         },
//         {
//           $match: {
//             $or: selectedMenu.map(menu => ({
//               "menus.title": { $regex: menu, $options: 'i' },
//               "menus.description": { $regex: menu, $options: 'i' }
//             }))
//           }
//         }
//       ])
//     }
        
//     res.status(200).json({
//       success: true,
//       restaurants,
//     });
//   } catch (error) {
//     console.error("searchRestaurantHandler error = ", error);
//     next(error);
//   }
// };